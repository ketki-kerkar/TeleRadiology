package com.example.security.auth;

import com.example.security.DTOs.DoctorDTO;
import com.example.security.DTOs.PatientDTO;
import com.example.security.DTOs.Requests.CaseSummaryRequest;
import com.example.security.DTOs.Requests.ConsentRequest;
import com.example.security.DTOs.Requests.EmailRequest;
import com.example.security.DTOs.Requests.PrescriptionRequest;
import com.example.security.DTOs.UserDTO;
import com.example.security.Model.Actors.*;
import com.example.security.Repositories.*;
import com.example.security.services.admin.FindUser;
import com.example.security.services.doctor.ListUsers;
import com.example.security.services.doctor.CaseSummaryService;
import com.example.security.services.doctor.ConsentService;
import com.example.security.services.doctor.PrescriptionService;
import com.example.security.services.login.JwtService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/doctor")
@RequiredArgsConstructor
public class DoctorController {
    private static final Logger logger = LoggerFactory.getLogger(DoctorController.class);

    @Autowired
    private ConsentService consentservice;

    @Autowired
    private ListUsers listUsers;

    @Autowired
    private PrescriptionService prescriptionService;
    @Autowired
    private CaseSummaryService caseSummaryService;

    private final JwtService jwtService;
    private final UserRepo userRepo;
    @Autowired
    private CaseRepo caseRepo;
    @Autowired
    private DoctorRepo doctorRepo;
    @Autowired
    private PatientRepo patientRepo;
    @Autowired
    private LabRepo labRepo;
    @Autowired
    private HospitalHandleRepo hospitalHandleRepo;
    @Autowired
    private FindUser findUser;

    @PutMapping("/add-case-summary")
    public ResponseEntity<String> AddCaseSummary(
            @RequestHeader(name = "Authorization") String token,
            @RequestBody CaseSummaryRequest request) {
        String userEmail = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix
        if (userEmail == null) {
            return ResponseEntity.badRequest().body(null);
        }
        User user = userRepo.findByEmail(userEmail).orElse(null);
        if (user == null || !"doctor".equals(user.getRole().getRoleName())) {
            return ResponseEntity.badRequest().body(null);
        }
        try {
            logger.info("Received request to add caseSummary: {}", request);
            caseSummaryService.addcaseSummary(request);
            logger.info("Case Summary added successfully");
            return new ResponseEntity<>("Case Summary added successfully", HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error in adding case Summary: {}", e.getMessage());
            return new ResponseEntity<>("Failed to add case summary", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping("/add-prescription")
    public ResponseEntity<String> AddPrescription(
            @RequestHeader(name = "Authorization") String token,
            @RequestBody PrescriptionRequest request) {
        String userEmail = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix
        if (userEmail == null) {
            return ResponseEntity.badRequest().body(null);
        }
        User user = userRepo.findByEmail(userEmail).orElse(null);
        if (user == null || !"doctor".equals(user.getRole().getRoleName())) {
            return ResponseEntity.badRequest().body(null);
        }
        try {
            logger.info("Received request to add Prescription: {}", request);
            prescriptionService.addPrescription(request);
            logger.info("Prescription added successfully");
            return new ResponseEntity<>("Prescription added successfully", HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error in adding prescription: {}", e.getMessage());
            return new ResponseEntity<>("Failed to add prescription", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping("/ask-consent")
    public ResponseEntity<String> askConsent(
            @RequestHeader(name = "Authorization") String token,
            @RequestBody ConsentRequest request)//ConsentRequest is present in DTO->Request. For data that is passed in consent api body
    {
        String userEmail = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix
        if (userEmail == null) {
            return ResponseEntity.badRequest().body(null);
        }
        User user = userRepo.findByEmail(userEmail).orElse(null);
        if (user == null || !"doctor".equals(user.getRole().getRoleName())) {
            return ResponseEntity.badRequest().body(null);
        }
        try {
            logger.info("Received request to send consent: {}", request);
            consentservice.askConsent(request);
            logger.info("Consent sent successfully");
            return new ResponseEntity<>("Consent sent successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            logger.error("Error in sending consent: {}", e.getMessage());
            return new ResponseEntity<>("Failed to send consent", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/viewList/ofDoctors")
    public ResponseEntity<List<DoctorDTO>>  getAllDoctor(@RequestHeader(name = "Authorization") String token) {
        String userEmail = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix
        if (userEmail == null) {
            return ResponseEntity.badRequest().body(null);
        }
        User user = userRepo.findByEmail(userEmail).orElse(null);
        if (user == null || !"doctor".equals(user.getRole().getRoleName())) {

            return ResponseEntity.badRequest().body(null);
        }
        List<DoctorDTO> doctorDTOs = listUsers.getAllDoctor()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(doctorDTOs);
    }
    private DoctorDTO convertToDTO(Doctor doctor) {
        DoctorDTO dto = new DoctorDTO();
        dto.setDName(doctor.getDName());
        dto.setHospitalName(doctor.getHospital().getHospitalName());
        dto.setEmail(doctor.getUser().getEmail());
        dto.setQualification(doctor.getQualification());
        return dto;
    }

    @GetMapping("/viewList/ofPatients")
    public ResponseEntity<List<PatientDTO>> getAllPatients(@RequestHeader(name = "Authorization") String token) {
        String userEmail = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix
        if (userEmail == null) {
            return ResponseEntity.badRequest().body(null);
        }
        User user = userRepo.findByEmail(userEmail).orElse(null);
        if (user == null || !"doctor".equals(user.getRole().getRoleName())) {
            return ResponseEntity.badRequest().body(null);
        }

        // Fetch patients under the doctor
        List<PatientDTO> patientDTOs = listUsers.getPatientsUnderDoctor(userEmail);

        return ResponseEntity.ok(patientDTOs);
    }

    @PostMapping("/findUser/ByEmail")
    public ResponseEntity<UserDTO> getUserEntitiesByEmail(
            @RequestHeader(name = "Authorization") String token,
            @RequestBody EmailRequest emailRequest) {
        String userEmail = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix
        if (userEmail == null) {
            return ResponseEntity.badRequest().body(null);
        }
        User user = userRepo.findByEmail(userEmail).orElse(null);
        if (user == null || !"doctor".equals(user.getRole().getRoleName())) {
            return ResponseEntity.badRequest().body(null);
        }
        try {
            String email = emailRequest.getEmail();

            // Check if the user is a lab
            Optional<Lab> labOptional = labRepo.findByUserEmail(email);
            if (labOptional.isPresent()) {
                // If the user is a lab, return bad request
                return ResponseEntity.badRequest().body(null);
            }

            // Check if the user is a hospital handle
            Optional<HospitalHandle> hospitalHandleOptional = hospitalHandleRepo.findByUserEmail(email);
            if (hospitalHandleOptional.isPresent()) {
                // If the user is a hospital handle, return bad request
                return ResponseEntity.badRequest().body(null);
            }

            // Check if the user is a doctor
            Optional<Doctor> doctorOptional = doctorRepo.findByUserEmail(email);
            if (doctorOptional.isPresent()) {
                ResponseEntity<UserDTO> response = findUser.findUserEntitiesByEmail(email);
                return response;
            }

            // Check if the email belongs to a patient under the doctor
            List<PatientDTO> patientsUnderDoctor = listUsers.getPatientsUnderDoctor(userEmail);
            boolean isPatientUnderDoctor = patientsUnderDoctor.stream()
                    .anyMatch(patient -> patient.getEmail().equals(email));

            if (!isPatientUnderDoctor) {
                // If the email doesn't belong to a patient under the doctor, return bad request
                return ResponseEntity.badRequest().body(null);
            }

            // If none of the above conditions are met, proceed to fetch user details
            ResponseEntity<UserDTO> response = findUser.findUserEntitiesByEmail(email);
            return response;
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}