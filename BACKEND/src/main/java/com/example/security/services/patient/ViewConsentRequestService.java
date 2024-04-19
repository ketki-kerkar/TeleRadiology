package com.example.security.services.patient;

import com.example.security.DTOs.CaseDetailsDTO;
import com.example.security.Model.Actors.Doctor;
import com.example.security.Model.Consent;
import com.example.security.Repositories.ConsentRepo;
import com.example.security.Repositories.DoctorRepo;
import com.example.security.Repositories.PatientRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ViewConsentRequestService {

    @Autowired
    private ConsentRepo consentRepo;

    @Autowired
    private DoctorRepo doctorRepo;

    @Autowired
    private PatientRepo patientRepo;

    public List<CaseDetailsDTO> getCaseDetailsByEmail(String email) {
        // Find patientId based on the given email
        Long patientId = patientRepo.findByUserEmail(email)
                .map(patient -> patient.getPatientId())
                .orElseThrow(() -> new IllegalArgumentException("Patient not found for email: " + email));

        // Call the existing getCaseDetails method with the found patientId
        return getCaseDetails(patientId);
    }

    // Existing method to fetch case details by patientId
    public List<CaseDetailsDTO> getCaseDetails(Long patientId) {
        //function to view the list of radiologist at patient side by passing caseId and email of 3 radio. as request body
        // Fetch consent with pending status for the given patientId
        Consent consent = consentRepo.findByPatient_PatientIdAndConsentStatus(patientId, "pending");

        if (consent == null) {
            return new ArrayList<>(); // or handle the consent not found scenario
        }

        // Get the caseId associated with the pending consent
        Long caseId = consent.getCases().getCaseId();

        // Split the listOfRadiologistId string by comma and convert to Long
        List<Long> listOfRadiologistId = Arrays.stream(consent.getListOfRadiologistId().split(","))
                .map(Long::valueOf)
                .collect(Collectors.toList());

        List<CaseDetailsDTO> caseDetails = new ArrayList<>();

        // Fetch doctor details based on listOfRadiologistId
        for (Long doctorId : listOfRadiologistId) {
            Optional<Doctor> doctorOptional = doctorRepo.findById(doctorId);
            doctorOptional.ifPresent(doctor -> {
                CaseDetailsDTO caseDetail = new CaseDetailsDTO();
                caseDetail.setCaseId(caseId); // Set the caseId for each doctor
                caseDetail.setDName(doctor.getDName());
                caseDetail.setHospitalName(doctor.getHospital().getHospitalName());
                caseDetails.add(caseDetail);
            });
        }

        return caseDetails;
    }

}




