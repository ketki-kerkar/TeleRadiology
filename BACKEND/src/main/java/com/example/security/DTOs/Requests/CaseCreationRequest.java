package com.example.security.DTOs.Requests;

import lombok.Data;

@Data
public class CaseCreationRequest {
    private Long patientId;
    private Long doctorId;
}