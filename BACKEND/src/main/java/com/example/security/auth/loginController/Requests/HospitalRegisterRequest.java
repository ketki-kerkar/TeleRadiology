package com.example.security.auth.loginController.Requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HospitalRegisterRequest {
    private String email;
    private String password;
    @Builder.Default
    private String role = "receptionist";
    private String hospitalName;
}
