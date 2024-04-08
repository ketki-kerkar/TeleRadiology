package com.example.security.auth;

import com.example.security.DTOs.Requests.PasswordResetRequest;
import com.example.security.services.patient.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/patient")
public class PatientController {
    @Autowired
    private PatientService patientService;

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> requestBody) {
        String emailId = requestBody.get("emailId");
        patientService.forgotPassword(emailId);
        return ResponseEntity.ok("An email with instructions to reset your password has been sent to your email address.");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody PasswordResetRequest resetRequest) {
        patientService.resetPassword(resetRequest.getEmailId(),
                resetRequest.getOtp(),
                resetRequest.getNewPassword(),
                resetRequest.getConfirmNewPassword());
        return ResponseEntity.ok("Password changed successfully.");
    }
}
