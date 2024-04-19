package com.example.security.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CaseDetailsDTO {
    private Long caseId;
    private String dName;
    private String hospitalName;
}
