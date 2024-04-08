package com.example.security.DTOs.Requests;

import lombok.Data;

@Data
public class PasswordResetRequest {
    private String emailId;
    private Integer otp;
    private String newPassword;
    private String confirmNewPassword;
}
