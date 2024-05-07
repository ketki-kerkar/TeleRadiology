package com.example.security.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CaseDetailsDTO {
    private Long caseId;
    private String dName;
    private String hospitalName;
    private Date caseRegistrationDate;
    private Boolean caseStatus;
    private String email;
    private String qualification ;
}
