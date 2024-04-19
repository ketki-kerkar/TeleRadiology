package com.example.security.DTOs.Requests;

import lombok.Data;

@Data
public class SelectingInvitationRequest {
    private Long caseId ;
    private String email ;
}
