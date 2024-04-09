package com.example.security.auth;

import com.example.security.DTOs.Requests.AuthenticationResponse;
import com.example.security.DTOs.Requests.ConsentRequest;
import com.example.security.services.doctor.ConsentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/doctor")
public class DoctorController {
    private static final Logger logger = LoggerFactory.getLogger(DoctorController.class);

    @Autowired
    private ConsentService consentservice;
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