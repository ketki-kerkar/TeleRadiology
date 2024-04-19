package com.example.security.DTOs.Requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CaseSummaryRequest {
    private Long caseId;
    private String caseSummary;
}
