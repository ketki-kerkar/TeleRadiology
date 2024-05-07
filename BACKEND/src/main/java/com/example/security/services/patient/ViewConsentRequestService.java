package com.example.security.services.patient;

import com.example.security.DTOs.CaseDetailsDTO;
import com.example.security.Model.Actors.Doctor;
import com.example.security.Model.Actors.Patient;
import com.example.security.Model.Actors.User;
import com.example.security.Model.Consent;
import com.example.security.Repositories.ConsentRepo;
import com.example.security.Repositories.DoctorRepo;
import com.example.security.Repositories.PatientRepo;
import com.example.security.Repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ViewConsentRequestService {

    @Autowired
    private ConsentRepo consentRepo;

    @Autowired
    private DoctorRepo doctorRepo;

    @Autowired
    private UserRepo userRepo ;

    @Autowired
    private PatientRepo patientRepo;

    public List<CaseDetailsDTO> getCaseDetailsByEmail(String email) {
        // Find user based on the given email
        Optional<User> userOptional = userRepo.findByEmail(email);
        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("User not found for email: " + email);
        }

        // Get the user ID
        UUID userId = userOptional.get().getUserId();

        // Find patient based on the user ID
        Optional<Patient> patientOptional = patientRepo.findByUserUserId(userId);
        if (patientOptional.isEmpty()) {
            throw new IllegalArgumentException("Patient not found for email: " + email);
        }
        Long patientId = patientOptional.get().getPatientId();

        // Fetch consent with pending status for the given patientId
        Consent consent = consentRepo.findByPatient_PatientIdAndConsentStatus(patientId, "pending");
        if (consent == null) {
            return new ArrayList<>(); // or handle the consent not found scenario
        }

        // Update the consent status to "completed" so that while listing it can be removed
        //consent.setConsentStatus("completed");
        //consentRepo.save(consent); // Save the updated consent

        // Get the list of radiologist IDs from the consent
        String listOfRadiologistIdString = consent.getListOfRadiologistId();
        List<Long> listOfRadiologistId = Arrays.stream(listOfRadiologistIdString.split(","))
                .map(Long::valueOf)
                .collect(Collectors.toList());

        // Fetch doctor details based on listOfRadiologistId
        List<CaseDetailsDTO> caseDetails = new ArrayList<>();
        for (Long doctorId : listOfRadiologistId) {
            Optional<Doctor> doctorOptional = doctorRepo.findById(doctorId);
            doctorOptional.ifPresent(doctor -> {
                CaseDetailsDTO caseDetail = new CaseDetailsDTO();
                caseDetail.setCaseId(consent.getCases().getCaseId()); // Set the caseId for each doctor
                caseDetail.setDName(doctor.getDName());
                caseDetail.setHospitalName(doctor.getHospital().getHospitalName());
                caseDetail.setEmail(doctor.getUser().getEmail());
                caseDetail.setQualification(doctor.getQualification());
                caseDetails.add(caseDetail);
            });
        }
        return caseDetails;
    }


}








