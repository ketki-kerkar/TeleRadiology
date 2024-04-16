package com.example.security.DTOs.Requests;
//This is used for adding prescription to table when clicked on Add prescription
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PrescriptionRequest {
    private Long caseId;
    private String prescriptionTests;
}
