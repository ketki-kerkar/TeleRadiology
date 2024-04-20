package com.example.security.auth;

import com.example.security.DTOs.CaseDetailsDTO;
import com.example.security.DTOs.PatientIdRequestDTO;
import com.example.security.DTOs.Requests.EmailRequest;
import com.example.security.DTOs.Requests.SelectingInvitationRequest;
import com.example.security.services.doctor.DiagnosisPdfService;
import com.example.security.services.patient.SelectingRadiologist;
import com.example.security.services.patient.ViewConsentRequestService;
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

@RestController
@RequestMapping("/api/v1/consent")
public class PatientController {

    @Autowired
    private ViewConsentRequestService viewConsentRequestService;

    @Autowired
    private SelectingRadiologist selectingRadiologist;
    @Autowired
    private DiagnosisPdfService diagnosisPdfService;


    @PostMapping("/case-details")
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


    @PostMapping("/sendNotifications")
    public ResponseEntity<String> sendInvitation(@RequestBody SelectingInvitationRequest selectingInvitationRequest) {
        try {
            selectingRadiologist.sendInvitation(selectingInvitationRequest.getCaseId(), selectingInvitationRequest.getEmail());
            return new ResponseEntity<>("Invitation sent successfully", HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}

