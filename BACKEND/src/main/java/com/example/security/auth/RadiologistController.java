package com.example.security.auth;

import com.example.security.DTOs.InvitationDTO;
import com.example.security.DTOs.Requests.AcceptInvRequest;
import com.example.security.DTOs.Requests.EmailRequest;
import com.example.security.services.radiologist.AcceptingInvitationService;
import com.example.security.services.radiologist.ListingInvitations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/radiologist")
public class RadiologistController {

    @Autowired
    private AcceptingInvitationService acceptingInvitationService;

    @Autowired
    private ListingInvitations listingInvitations;

    @PostMapping("/accept-invitation")
    public ResponseEntity<String> acceptInvitation(@RequestBody AcceptInvRequest acceptInvRequest) {
        try {
            acceptingInvitationService.acceptInvitation(acceptInvRequest);
            return ResponseEntity.ok("Invitation accepted successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/list-invitations")
    public ResponseEntity<List<InvitationDTO>> listInvitations(@RequestBody EmailRequest emailRequest) {
        String receiverEmail = emailRequest.getEmail();
        List<InvitationDTO> invitations = listingInvitations.getInvitationsByReceiverEmail(receiverEmail);
        return ResponseEntity.ok(invitations);
    }
}
