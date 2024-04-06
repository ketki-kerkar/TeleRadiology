package com.example.security.auth.hospHanController;

import com.example.security.services.hospitalHandle.PatientRegistrationService;
import com.example.security.Model.Patient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/receptionist")

@CrossOrigin("http://localhost:3000")
public class PatientRegistration {
    private static final Logger logger = LoggerFactory.getLogger(PatientRegistration.class);

    @Autowired
    private PatientRegistrationService patientRegistrationService;

    @PostMapping("/register")
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
    }
}