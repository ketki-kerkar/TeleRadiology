package com.example.security.auth;

import com.example.security.DTOs.CaseDetailsDTO;
import com.example.security.DTOs.Requests.CaseIdRequest;
import com.example.security.DTOs.Requests.EmailRequest;
import com.example.security.DTOs.Requests.SelectingInvitationRequest;
import com.example.security.DTOs.Requests.UserIssueRequest;
import com.example.security.DTOs.UserDTO;
import com.example.security.Model.Actors.Doctor;
import com.example.security.Model.Actors.Patient;
import com.example.security.Model.Actors.User;
import com.example.security.Model.Case;
import com.example.security.Repositories.PatientRepo;
import com.example.security.services.admin.FindUser;
import com.example.security.Repositories.UserRepo;
import com.example.security.services.doctor.DiagnosisPdfService;
import com.example.security.services.doctor.PrescriptionService;
import com.example.security.services.hospitalHandle.CaseService;
import com.example.security.services.login.JwtService;
import com.example.security.services.patient.SelectingRadiologist;
import com.example.security.services.patient.UserRequestService;
import com.example.security.services.patient.ViewConsentRequestService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/patient")
@RequiredArgsConstructor
public class PatientController {

    private static final Logger logger = LoggerFactory.getLogger(PatientController.class);

    @Autowired
    private ViewConsentRequestService viewConsentRequestService;

    @Autowired
    private SelectingRadiologist selectingRadiologist;
    @Autowired
    private DiagnosisPdfService diagnosisPdfService;
    @Autowired
    private PrescriptionService prescriptionService;
    @Autowired
    private UserRequestService userRequestService;

    private final CaseService caseService;

    private final JwtService jwtService;
    private final UserRepo userRepo;
    private final PatientRepo patientRepo;
    private final FindUser findUser;

    @GetMapping("/patient-details")
    public ResponseEntity<UserDTO> getPatientDetailsByEmail(@RequestHeader(name = "Authorization") String token) {
        String userEmail = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix
        User user = userRepo.findByEmail(userEmail).orElse(null);
        if (user == null || !"patient".equals(user.getRole().getRoleName())) {
            return ResponseEntity.badRequest().body(null);
        }
        try {
            Optional<Patient> patientDetails = patientRepo.findByUserEmail(userEmail);

            if (patientDetails.isEmpty()) {
                return ResponseEntity.notFound().build(); // Return 404 if no patient details found
            } else {
                ResponseEntity<UserDTO> patient = findUser.findUserEntitiesByEmail(userEmail);
                return patient;
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Return 500 for internal server error
        }
    }

    @PostMapping("/consent-details")
    public ResponseEntity<List<CaseDetailsDTO>> getCaseDetailsByEmail(
            @RequestHeader(name = "Authorization") String token,
            @RequestBody EmailRequest emailRequest) {
        String userEmail = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix
        if (userEmail == null) {
            return ResponseEntity.badRequest().body(null);
        }
        User user = userRepo.findByEmail(userEmail).orElse(null);
        if (user == null || !"patient".equals(user.getRole().getRoleName())) {
            return ResponseEntity.badRequest().body(null);
        }
        try {
            String email = emailRequest.getEmail();

            // Fetch case details for the given email
            List<CaseDetailsDTO> caseDetails = viewConsentRequestService.getCaseDetailsByEmail(email);

            // Check if case details are empty
            if (caseDetails.isEmpty()) {
                return ResponseEntity.notFound().build(); // Return 404 if no case details found
            } else {
                return ResponseEntity.ok(caseDetails); // Return case details if found
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Return 500 for internal server error
        }
    }

    @GetMapping("/get-diagnosis")
    public ResponseEntity<InputStreamResource> getDiagnosis(
            @RequestHeader(name = "Authorization") String token,
            @RequestParam Long caseId) throws IOException {
        String userEmail = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix
        if (userEmail == null) {
            return ResponseEntity.badRequest().body(null);
        }
        User user = userRepo.findByEmail(userEmail).orElse(null);
        if (user == null || !"patient".equals(user.getRole().getRoleName())) {
            return ResponseEntity.badRequest().body(null);
        }
        ByteArrayInputStream pdf=diagnosisPdfService.getDiagnosis(caseId);
        HttpHeaders httpHeaders=new HttpHeaders();
        httpHeaders.add("Content-Disposition","inline;file=diagnosis.pdf");
        return ResponseEntity.ok().
                headers(httpHeaders).
                contentType(MediaType.APPLICATION_PDF).
                body(new InputStreamResource(pdf));
    }

    @GetMapping("/get-prescription")
    public ResponseEntity<String> getPrescription(
            @RequestHeader(name = "Authorization") String token,
            @RequestParam Long caseId) {
        String userEmail = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix
        if (userEmail == null) {
            return ResponseEntity.badRequest().build(); // Return 400 if no user email found
        }
        User user = userRepo.findByEmail(userEmail).orElse(null);
        if (user == null || !"patient".equals(user.getRole().getRoleName())) {
            return ResponseEntity.badRequest().build(); // Return 400 without a body
        }
        String prescription = prescriptionService.getPrescription(caseId);
        return ResponseEntity.ok(prescription); // Return 200 with prescription
    }

    @GetMapping("/viewList/ofCases")
    public ResponseEntity<List<CaseDetailsDTO>> viewListOfCases(@RequestHeader(name = "Authorization") String token) {
        try {
            String userEmail = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix
            if (userEmail == null) {
                return ResponseEntity.badRequest().build(); // Return 400 if no user email found
            }
            User user = userRepo.findByEmail(userEmail).orElse(null);
            if (user == null || !"patient".equals(user.getRole().getRoleName())) {
                return ResponseEntity.badRequest().body(null);
            }
            List <CaseDetailsDTO> caseDetails = caseService.getCaseDetailsByEmail(userEmail)
                    .stream()
                    .map(this::convertToDTO) // Convert Case to CaseDTO
                    .collect(Collectors.toList());


            if (caseDetails.isEmpty()) {
                return ResponseEntity.notFound().build();
            } else {
                return ResponseEntity.ok(caseDetails);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/viewCase")
    public ResponseEntity<CaseDetailsDTO> getCaseDetailsById(
            @RequestHeader(name = "Authorization") String token,
            @RequestBody CaseIdRequest caseIdRequest) {

        try {
            String userEmail = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix
            if (userEmail == null) {
                return ResponseEntity.badRequest().build();
            }
            User user = userRepo.findByEmail(userEmail).orElse(null);
            if (user == null || !"patient".equals(user.getRole().getRoleName())) {
                return ResponseEntity.badRequest().body(null);
            }
            Long caseId = caseIdRequest.getCaseId();
            if (caseId == null) {
                return ResponseEntity.badRequest().build();
            }

            Case caseEntity = caseService.getCaseById(caseId);
            if (caseEntity == null) {
                return ResponseEntity.notFound().build(); // Return 404 if case not found
            }

            CaseDetailsDTO caseDTO = convertToDTO(caseEntity); // Convert Case to CaseDTO
            return ResponseEntity.ok(caseDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    private CaseDetailsDTO convertToDTO(Case caseEntity) {
        CaseDetailsDTO caseDTO = new CaseDetailsDTO();
        caseDTO.setCaseId(caseEntity.getCaseId());
        caseDTO.setCaseStatus(caseEntity.getCaseStatus());
        caseDTO.setCaseRegistrationDate(caseEntity.getCaseRegistrationDate());
        if (caseEntity.getDoctor() != null) {
            Doctor doctor = caseEntity.getDoctor();
            caseDTO.setDName(doctor.getDName());
            if (doctor.getHospital() != null) {
                caseDTO.setHospitalName(doctor.getHospital().getHospitalName());
            }
        }
        return caseDTO;
    }
    @PostMapping("/sendNotifications")
    public ResponseEntity<String> sendInvitation(
            @RequestHeader(name = "Authorization") String token,
            @RequestBody SelectingInvitationRequest selectingInvitationRequest) {
        String userEmail = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix
        if (userEmail == null) {
            return ResponseEntity.badRequest().build();
        }
        User user = userRepo.findByEmail(userEmail).orElse(null);
        if (user == null || !"patient".equals(user.getRole().getRoleName())) {
            return ResponseEntity.badRequest().body(null);
        }
        try {
            selectingRadiologist.sendInvitation(selectingInvitationRequest.getCaseId(), selectingInvitationRequest.getReceiverEmail() , selectingInvitationRequest.getSenderEmail());
            return new ResponseEntity<>("Invitation sent successfully", HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/add-technical-issues")
    public ResponseEntity<String> reportTechnicalIssue(@RequestHeader(name = "Authorization") String token,
                                                       @RequestBody UserIssueRequest request) {
        String userEmail = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix
        if (userEmail == null) {
            return ResponseEntity.badRequest().body(null);
        }
        User user = userRepo.findByEmail(userEmail).orElse(null);
        if (user == null || !"patient".equals(user.getRole().getRoleName())) {
            return ResponseEntity.badRequest().body(null);
        }
        try {
            logger.info("Received request to send Technical Issue: {}", request);
            userRequestService.addTechnicalIssue(request);
            logger.info("Technical Issue sent successfully");
            return new ResponseEntity<>("Technical issue reported successfully: " ,HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to report technical issue", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/request-delete-account")
    public ResponseEntity<String> requestDeleteAccount(@RequestHeader(name = "Authorization") String token,
                                                       @RequestBody UserIssueRequest request) {
        String userEmail = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix
        if (userEmail == null) {
            return ResponseEntity.badRequest().body(null);
        }
        User user = userRepo.findByEmail(userEmail).orElse(null);
        if (user == null || !"patient".equals(user.getRole().getRoleName())) {
            return ResponseEntity.badRequest().body(null);
        }
        try {
            logger.info("Received request to delete your account: {}", request);
            userRequestService.addDeleteAccountRequest(request);
            logger.info("Delete Account Request sent successfully");
            return new ResponseEntity<>("Delete account request sent successfully: " ,HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to send request", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

