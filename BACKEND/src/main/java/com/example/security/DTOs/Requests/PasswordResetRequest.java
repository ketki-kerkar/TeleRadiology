package com.example.security.DTOs.Requests;

import lombok.Data;

@Data
public class PasswordResetRequest {
    private String email;
    private Integer otp;
    private String newPassword;
    private String confirmNewPassword;
}
