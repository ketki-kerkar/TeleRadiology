package com.example.security.auth;

import com.example.security.DTOs.Requests.AuthenticationResponse;
import com.example.security.DTOs.Requests.CaseSummaryRequest;
import com.example.security.DTOs.Requests.ConsentRequest;
import com.example.security.DTOs.Requests.PrescriptionRequest;
import com.example.security.services.doctor.CaseSummaryService;
import com.example.security.services.doctor.ConsentService;
import com.example.security.services.doctor.PrescriptionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/doctor")
public class DoctorController {
    private static final Logger logger = LoggerFactory.getLogger(DoctorController.class);


    @Autowired
    private ConsentService consentservice;

    @Autowired
    private PrescriptionService prescriptionService;
    @Autowired
    private CaseSummaryService caseSummaryService;


    @PutMapping("/add-case-summary")
    public ResponseEntity<String> AddCaseSummary(@RequestBody CaseSummaryRequest request){
        try {
            logger.info("Received request to add caseSummary: {}", request);
            caseSummaryService.addcaseSummary(request);
            logger.info("Case Summary added successfully");
            return new ResponseEntity<>("Case Summary added successfully", HttpStatus.OK);
        }catch(Exception e){
            logger.error("Error in adding case Summary: {}", e.getMessage());
            return new ResponseEntity<>("Failed to add case summary", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    @PostMapping("/add-prescription")
    public ResponseEntity<String> AddPrescription(@RequestBody PrescriptionRequest request){
        try {
            logger.info("Received request to add Prescription: {}", request);
            prescriptionService.addPrescription(request);
            logger.info("Prescription added successfully");
            return new ResponseEntity<>("Prescription added successfully", HttpStatus.OK);
        }catch(Exception e){
            logger.error("Error in adding prescription: {}", e.getMessage());
            return new ResponseEntity<>("Failed to add prescription", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


    @PostMapping("/ask-consent")
    public ResponseEntity<String> askConsent(@RequestBody ConsentRequest request)//ConsentRequest is present in DTO->Request. For data that is passed in consent api body
    {
        try{
            logger.info("Received request to send consent: {}", request);
            consentservice.askConsent(request);
            logger.info("Consent sent successfully");
            return new ResponseEntity<>("Consent sent successfully", HttpStatus.CREATED);
        }catch(Exception e){
            logger.error("Error in sending consent: {}", e.getMessage());
            return new ResponseEntity<>("Failed to send consent", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}