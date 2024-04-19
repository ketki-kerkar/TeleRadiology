package com.example.security.DTOs.Requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LabRegisterRequest {
    private String email;
    private String password;
    @Builder.Default
    private String role = "lab";
    private String labName;
}
