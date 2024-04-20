package com.example.security.DTOs.Requests;

import lombok.Data;

@Data
public class AcceptInvRequest {
    private String email;
    private String choice;
    private long caseId;
}
