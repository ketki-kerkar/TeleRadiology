package com.example.security.DTOs;

import com.example.security.Model.Status;
import lombok.*;

import java.sql.Timestamp;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class MessageDTO {
    private String senderName;
    private String receiverName;
    private String message;
    private Timestamp date;
    private Status status;
    private Long caseId;
    private Long messageId;
}
