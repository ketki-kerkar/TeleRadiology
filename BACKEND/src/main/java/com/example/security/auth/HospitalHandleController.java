package com.example.security.auth;
import com.example.security.DTOs.PatientDTO;
import com.example.security.DTOs.Requests.AuthenticationResponse;
import com.example.security.DTOs.Requests.CaseCreationRequest;
import com.example.security.DTOs.Requests.DoctorRegisterRequest;
import com.example.security.DTOs.Requests.PatientRegistrationRequest;
import com.example.security.Model.Actors.Patient;
import com.example.security.services.admin.AddUser;
import com.example.security.services.hospitalHandle.PatientRegistrationService;
import com.example.security.services.hospitalHandle.ViewPatient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.security.services.hospitalHandle.CaseService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/receptionist")
public class HospitalHandleController {
    private static final Logger logger = LoggerFactory.getLogger(HospitalHandleController.class);
    @Autowired
    private PatientRegistrationService patientRegistrationService;
    @Autowired
    private ViewPatient viewPatient;

    @Autowired
    private CaseService caseService;

    @Autowired
    private AddUser addUser;

    /* @PostMapping("/registerPatient")
     public ResponseEntity<String> registerPatient(@RequestBody Patient patient) {
         try {
             logger.info("Received request to register patient: {}", patient);
             patientRegistrationService.registerPatient(patient);
             logger.info("Patient registration completed successfully");
             return new ResponseEntity<>("Patient registered successfully", HttpStatus.CREATED);
         } catch (Exception e) {
             logger.error("Error registering patient: {}", e.getMessage());
             return new ResponseEntity<>("Failed to register patient", HttpStatus.INTERNAL_SERVER_ERROR);
         }
     }*/
    @PostMapping("/add-patient")
    public ResponseEntity<AuthenticationResponse> registerPatient(
            @RequestBody PatientRegistrationRequest request
    ){
        return ResponseEntity.ok(addUser.registerPatient(request));
    }

    @GetMapping("/viewPatients")
    public ResponseEntity<List<PatientDTO>> getAllPatient() {
        List<PatientDTO> patientDTOs = viewPatient.getAllPatient()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(patientDTOs);
    }
    private PatientDTO convertToDTO(Patient patient) {
        return PatientDTO.builder()
                .patientId(patient.getPatientId())
                .name(patient.getName())
                .build();
    }

    @PostMapping("/cases")
    public ResponseEntity<String> createCase(@RequestBody CaseCreationRequest request) {
        caseService.createCase(request.getPatientEmail(), request.getDoctorEmail());
        return ResponseEntity.ok("Case created successfully");
    }

}