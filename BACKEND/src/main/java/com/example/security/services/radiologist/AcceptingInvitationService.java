package com.example.security.services.radiologist;

import com.example.security.DTOs.Requests.AcceptInvRequest;
import com.example.security.Model.AccessTable;
import com.example.security.Model.Actors.Doctor;
import com.example.security.Model.Actors.Patient;
import com.example.security.Model.Actors.User;
import com.example.security.Model.Case;
import com.example.security.Model.Invitation;
import com.example.security.Repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AcceptingInvitationService {
    @Autowired
    private DoctorRepo doctorRepo;
    @Autowired
    private CaseRepo caseRepo;
    @Autowired
    private InvitationRepo invitationRepo;
    @Autowired
    private AccessTableRepo accessTableRepo;
    @Autowired
    private UserRepo userRepo ;

    public void acceptInvitation(AcceptInvRequest acceptInvRequest) {
        // Find the Doctor from the database using the provided email
        Optional<User> userOptional = userRepo.findByEmail(acceptInvRequest.getEmail());
        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("User not found for email: " + acceptInvRequest.getEmail());
        }

        // Get the user ID
        UUID userId = userOptional.get().getUserId();

        // Find doctor based on the user ID
        Optional<Doctor> doctorOptional = doctorRepo.findByUserUserId(userId);
        if (doctorOptional.isEmpty()) {
            throw new IllegalArgumentException("Doctor not found for email: " + acceptInvRequest.getEmail());
        }
        Doctor doctor = doctorOptional.get();

        // Find the Case from the database using the provided caseId
        Optional<Case> caseOptional = caseRepo.findById(acceptInvRequest.getCaseId());
        if (caseOptional.isEmpty()) {
            throw new IllegalArgumentException("Case not found for caseId: " + acceptInvRequest.getCaseId());
        }
        Case caseEntity = caseOptional.get();

        // Initialize consentedUserIds list if it is null
        List<Long> consentedUserIds = caseEntity.getConsentedUserIds();
        if (consentedUserIds == null) {
            consentedUserIds = new ArrayList<>();
        }

        // Check if doctorId already exists in consentedUserIds list
        if (!consentedUserIds.contains(doctor.getDoctorId())) {
            // Add the doctorId to consentedUserIds list of the Case if not already present
            consentedUserIds.add(doctor.getDoctorId());
            caseEntity.setConsentedUserIds(consentedUserIds);
        }

        // Create a new AccessTable entry
        AccessTable accessTableEntry = new AccessTable();
        accessTableEntry.setDoctor(doctor); // Set the Doctor object directly
        accessTableEntry.setCases(caseEntity);
        accessTableEntry.setTimestampAccepted(new Date());

        // Save the AccessTable entry
        accessTableEntry = accessTableRepo.save(accessTableEntry);

        // If AccessTable entry is successfully saved, update the Invitation status to "Accepted"
        if (accessTableEntry != null) {
            // Find the Invitation by caseId
            Optional<Invitation> invitationOptional = invitationRepo.findById(acceptInvRequest.getCaseId());
            if (invitationOptional.isEmpty()) {
                throw new IllegalArgumentException("Invitation not found for caseId: " + acceptInvRequest.getCaseId());
            }
            Invitation invitation = invitationOptional.get();

            // Update the Invitation's status to "Accepted"
            invitation.setInvitationStatus("Accepted");
            invitation.setTimestampAccepted(new Date());
            invitation.setDoctor(doctor);

            // Save the updated Invitation
            invitationRepo.save(invitation);
        } else {
            // If AccessTable entry is not saved, update the Invitation status to "Rejected"
            // Find the Invitation by caseId
            Optional<Invitation> invitationOptional = invitationRepo.findById(acceptInvRequest.getCaseId());
            if (invitationOptional.isEmpty()) {
                throw new IllegalArgumentException("Invitation not found for caseId: " + acceptInvRequest.getCaseId());
            }
            Invitation invitation = invitationOptional.get();

            // Update the Invitation's status to "Rejected"
            invitation.setInvitationStatus("Rejected");
            invitation.setTimestampAccepted(new Date());

            // Save the updated Invitation
            invitationRepo.save(invitation);

            // Handle the case where AccessTable entry is not saved
            throw new RuntimeException("Failed to save AccessTable entry.");
        }
    }
}
