package com.example.security.auth.loginController;

import lombok.Data;

@Data
public class RegisterRequest {
    private String email;
    private String password;
    private String role;
    private String hospitalName;
    private String labName;
}
