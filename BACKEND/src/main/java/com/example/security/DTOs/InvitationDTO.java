package com.example.security.DTOs;

import lombok.Data;

@Data
public class InvitationDTO {
    private String doctorName;
    private String caseSummary;
    private Long invitationId;
    private Long caseId ;
    private String invitation_status ;
}