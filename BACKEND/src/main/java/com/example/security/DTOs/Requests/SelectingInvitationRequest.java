package com.example.security.DTOs.Requests;

import lombok.Data;

@Data
public class SelectingInvitationRequest {
    private Long caseId ;
    private String receiverEmail ;
    private String senderEmail ;
}
