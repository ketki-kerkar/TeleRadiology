package com.example.security.DTOs.Requests;

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
    private String role = "receptionist"; // Set default value to "receptionist"
    private String hospitalName;
}