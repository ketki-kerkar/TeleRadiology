package com.example.security.services.patient;

import com.example.security.Model.Case;
import com.example.security.Model.Invitation;
import com.example.security.Repositories.CaseRepo;
import com.example.security.Repositories.InvitationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class SelectingRadiologist {

    @Autowired
    private InvitationRepo invitationRepo;

    @Autowired
    private CaseRepo caseRepo;

    public void sendInvitation(Long caseId, String receiverEmail) {
        //function when patient selects a radiologists and click accept button
        //passing caseId and email id as request body to update entry in invitation table
        //later the list of invitation table will be shown at radiologist side whose status=pending
        // Find the Case entity by caseId
        Case foundCase = caseRepo.findById(caseId)
                .orElseThrow(() -> new IllegalArgumentException("Case not found with id: " + caseId));

        // Create a new Invitation
        Invitation invitation = new Invitation();
        // Set the received timestamp to the current system time
        invitation.setTimestampReceived(new Date());
        // Set the receiver email
        invitation.setReceiverEmail(receiverEmail);
        // Set the case
        invitation.setCases(foundCase);
        // Set the accepted timestamp to the current system time
        invitation.setTimestampAccepted(new Date()); // <-- Set TimestampAccepted to current system time
        // Save the invitation
        invitationRepo.save(invitation);
    }
}
