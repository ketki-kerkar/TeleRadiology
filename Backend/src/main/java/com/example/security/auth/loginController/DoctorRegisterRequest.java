package com.example.security.auth.loginController;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DoctorRegisterRequest {
    private String email;
    private String password;
    private String role;
    private String doctorName;
    private int age;
    private String qualification;
    private String department;
    private String hospitalName;
}
