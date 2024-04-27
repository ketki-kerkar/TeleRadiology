package com.example.security.auth;

import com.example.security.DTOs.CaseDetailsDTO;
import com.example.security.DTOs.PatientDTO;
import com.example.security.DTOs.Requests.EmailRequest;
import com.example.security.DTOs.Requests.SelectingInvitationRequest;
import com.example.security.DTOs.Requests.UserIssueRequest;
import com.example.security.Model.Actors.Patient;
import com.example.security.Model.Actors.User;
import com.example.security.Model.Case;
import com.example.security.services.patient.PatientService;
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
    private final PatientService patientService;

    @GetMapping("/patient-details")
    public ResponseEntity<Optional<Patient>> getPatientDetailsByEmail(@RequestHeader(name = "Authorization") String token) {
        try {
            String userEmail = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix
            if (userEmail == null) {
                return ResponseEntity.badRequest().build(); // Return 400 if no user email found
            }

            Optional<Patient> patientDetails = patientService.getPatientDetailsByEmail(userEmail);

            if (patientDetails.isEmpty()) {
                return ResponseEntity.notFound().build(); // Return 404 if no patient details found
            } else {
                return ResponseEntity.ok(patientDetails); // Return patient details if found
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Return 500 for internal server error
        }
    }

    @PostMapping("/consent-details")
    public ResponseEntity<List<CaseDetailsDTO>> getCaseDetailsByEmail(@RequestBody EmailRequest emailRequest) {
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
    public ResponseEntity<InputStreamResource> getDiagnosis(@RequestParam Long caseId) throws IOException {
        ByteArrayInputStream pdf=diagnosisPdfService.getDiagnosis(caseId);
        HttpHeaders httpHeaders=new HttpHeaders();
        httpHeaders.add("Content-Disposition","inline;file=diagnosis.pdf");
        return ResponseEntity.ok().
                headers(httpHeaders).
                contentType(MediaType.APPLICATION_PDF).
                body(new InputStreamResource(pdf));


    }
    @GetMapping("/get-prescription")
    public String getPrescription(@RequestParam Long caseId){
        String prescription=prescriptionService.getPrescription(caseId);
        return  prescription;
    }
    @GetMapping("/viewList/ofCases")
    public ResponseEntity<List<Case>> viewListOfCases(@RequestHeader(name = "Authorization") String token) {
        try {
            String userEmail = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix
            if (userEmail == null) {
                return ResponseEntity.badRequest().build(); // Return 400 if no user email found
            }
            List<Case> caseDetails = caseService.getCaseDetailsByEmail(userEmail);

            if (caseDetails.isEmpty()) {
                return ResponseEntity.notFound().build(); // Return 404 if no case details found
            } else {
                return ResponseEntity.ok(caseDetails); // Return case details if found
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Return 500 for internal server error
        }
    }
    @PostMapping("/sendNotifications")
    public ResponseEntity<String> sendInvitation(@RequestBody SelectingInvitationRequest selectingInvitationRequest) {
        try {
            selectingRadiologist.sendInvitation(selectingInvitationRequest.getCaseId(), selectingInvitationRequest.getEmail());
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

