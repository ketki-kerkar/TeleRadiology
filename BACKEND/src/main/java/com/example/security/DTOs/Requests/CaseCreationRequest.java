package com.example.security.DTOs.Requests;

import lombok.Data;

@Data
public class CaseCreationRequest {
    private String patientEmail;
    private String doctorEmail;
}