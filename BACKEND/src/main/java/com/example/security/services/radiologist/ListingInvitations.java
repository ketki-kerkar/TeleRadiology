package com.example.security.services.radiologist;

import com.example.security.DTOs.InvitationDTO;
import com.example.security.Model.Actors.Doctor;
import com.example.security.Model.Case;
import com.example.security.Model.Invitation;
import com.example.security.Repositories.CaseRepo;
import com.example.security.Repositories.DoctorRepo;
import com.example.security.Repositories.InvitationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ListingInvitations {

    @Autowired
    private DoctorRepo doctorRepo;

    @Autowired
    private CaseRepo caseRepo;

    @Autowired
    private InvitationRepo invitationRepo;

    public List<InvitationDTO> getInvitationsByReceiverEmail(String receiverEmail) {
        List<Invitation> invitations = invitationRepo.findByReceiverEmail(receiverEmail);
        List<InvitationDTO> invitationDTOs = new ArrayList<>();

        for (Invitation invitation : invitations) {
            // Filter invitations based on status
            if ("Pending".equals(invitation.getInvitationStatus()) || "Accepted".equals(invitation.getInvitationStatus())) {
                InvitationDTO invitationDTO = new InvitationDTO();
                // Fetch case details from the associated Case
                Case aCase = invitation.getCases();
                if (aCase != null) {
                    // Set case summary
                    invitationDTO.setCaseSummary(aCase.getCaseSummary());
                    // Fetch doctor details from the associated Doctor
                    Doctor doctor = aCase.getDoctor();
                    if (doctor != null) {
                        // Set doctor name
                        invitationDTO.setDoctorName(doctor.getDName());
                    }
                }
                invitationDTOs.add(invitationDTO);
            }
        }

        return invitationDTOs;
    }

}
