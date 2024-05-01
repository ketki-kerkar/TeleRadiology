package com.example.security.services.hospitalHandle;

import com.example.security.DTOs.CaseDetailsDTO;
import com.example.security.Model.AccessTable;
import com.example.security.Model.Actors.Doctor;
import com.example.security.Model.Case;
import com.example.security.Model.Actors.Patient;
import com.example.security.Repositories.AccessTableRepo;
import com.example.security.Repositories.CaseRepo;
import com.example.security.Repositories.DoctorRepo;
import com.example.security.Repositories.PatientRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CaseService {

    private final CaseRepo caseRepo;
    private final PatientRepo patientRepo;
    private final DoctorRepo doctorRepo;

    private final AccessTableRepo accessTableRepo;

    @Autowired
    public CaseService(CaseRepo caseRepo, PatientRepo patientRepo, DoctorRepo doctorRepo, AccessTableRepo accessTableRepo) {
        this.caseRepo = caseRepo;
        this.patientRepo = patientRepo;
        this.doctorRepo = doctorRepo;
        this.accessTableRepo = accessTableRepo;
    }

    public void createCase(String patientEmail, String doctorEmail) {
        Doctor doctor = doctorRepo.findByUserEmail(doctorEmail)
                .orElseThrow(() -> new RuntimeException("Doctor not found with email: " + doctorEmail));

        if (doctor.getDType().equals("R")) {
            throw new RuntimeException("Cannot register case with a Radiologist doctor.");
        }

        Patient patient = patientRepo.findByUserEmail(patientEmail)
                .orElseThrow(() -> new RuntimeException("Patient not found with email: " + patientEmail));

        Case newCase = new Case();
        newCase.setPatient(patient);
        newCase.setDoctor(doctor);
        newCase.setCaseStatus(true); // Default value: Active
        newCase.setCaseRegistrationDate(new Date());
        // Set other default values as necessary

        Case savedCase = caseRepo.save(newCase);

        // Create AccessTable entry
        AccessTable accessTable = new AccessTable();
        accessTable.setDoctor(doctor);
        accessTable.setCases(savedCase);
        accessTable.setTimestampAccepted(new Date()); // Current date and time

        accessTableRepo.save(accessTable);
    }
    public List<Case> getCaseDetailsByEmail(String userEmail) {
        List<Case> caseList = caseRepo.findByPatientUserEmail(userEmail);
        return caseList;
    }
    public Case getCaseById(Long caseId) {
        Optional<Case> optionalCase = caseRepo.findById(caseId);
        return optionalCase.orElse(null); // Return null if case not found
    }
}