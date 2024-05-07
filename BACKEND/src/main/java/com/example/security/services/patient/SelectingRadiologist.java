package com.example.security.services.patient;

import com.example.security.Model.Actors.Patient;
import com.example.security.Model.Actors.User;
import com.example.security.Model.Case;
import com.example.security.Model.Consent;
import com.example.security.Model.Invitation;
import com.example.security.Model.Notification;
import com.example.security.Repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Service
public class SelectingRadiologist {

    @Autowired
    private InvitationRepo invitationRepo;
    @Autowired
    private PatientRepo patientRepo ;
    @Autowired
    private CaseRepo caseRepo;
    @Autowired
    private UserRepo userRepo ;
    @Autowired
    private NotificationRepo notificationRepo;
    @Autowired
    private ConsentRepo consentRepo ;

    public void sendInvitation(Long caseId, String receiverEmail , String senderEmail ) {
        //function when patient selects a radiologists and click accept button
        //passing caseId and email id as request body to update entry in invitation table
        //later the list of invitation table will be shown at radiologist side whose status=pending
        // Find the Case entity by caseId
        Optional<User> userOptional = userRepo.findByEmail(senderEmail);
        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("User not found for email: " + senderEmail);
        }

        // Get the user ID
        UUID userId = userOptional.get().getUserId();

        // Find patient based on the user ID
        Optional<Patient> patientOptional = patientRepo.findByUserUserId(userId);
        if (patientOptional.isEmpty()) {
            throw new IllegalArgumentException("Patient not found for email: " + senderEmail);
        }
        Long patientId = patientOptional.get().getPatientId();

        // Fetch consent with pending status for the given patientId
        Consent consent = consentRepo.findByPatient_PatientIdAndConsentStatus(patientId, "pending");
        // Update the consent status to "completed" so that while listing it can be removed
        consent.setConsentStatus("completed");
        consentRepo.save(consent);

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
        invitation.setDoctor(foundCase.getDoctor());
        // Save the invitation
        invitationRepo.save(invitation);

        // After saving the invitation, update the Notification table
        Notification notification = new Notification();
        notification.setTimestamp(new Date());
        notification.setMessageText("The patient selected a radiologist");
        notification.setReceiverType('d'); // Receiver is a doctor
        // Set the associated doctorId from the Case entity
        notification.setDoctor(foundCase.getDoctor());
        // Save the notification
        notificationRepo.save(notification);
    }
}
