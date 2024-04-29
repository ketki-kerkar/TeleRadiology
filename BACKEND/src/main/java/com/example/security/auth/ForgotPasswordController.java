package com.example.security.auth;

import com.example.security.DTOs.Requests.PasswordResetRequest;
import com.example.security.services.login.ForgotPasswordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class ForgotPasswordController {
    @Autowired
    private ForgotPasswordService forgotPasswordService;

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> requestBody) {
        String email = requestBody.get("email");
        forgotPasswordService.forgotPassword(email);
        return ResponseEntity.ok("An email with instructions to reset your password has been sent to your email address.");
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOTP(@RequestBody PasswordResetRequest resetRequest) {
        boolean otpVerified = forgotPasswordService.verifyOTP(resetRequest.getEmail(), resetRequest.getOtp());
        if (otpVerified) {
            return ResponseEntity.ok("OTP verified successfully. You can now reset your password.");
        } else {
            return ResponseEntity.badRequest().body("OTP verification failed. Please check your email and OTP again.");
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody PasswordResetRequest resetRequest) {
        forgotPasswordService.resetPassword(resetRequest.getEmail(),
                resetRequest.getOtp(),
                resetRequest.getNewPassword(),
                resetRequest.getConfirmNewPassword());
        return ResponseEntity.ok("Password changed successfully.");
    }
}
