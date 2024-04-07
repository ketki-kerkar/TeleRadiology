package com.example.security.services.hospitalHandle;
import com.example.security.Model.Actors.Doctor;
import com.example.security.Model.Case;
import com.example.security.Model.Actors.Patient;
import com.example.security.Repositories.CaseRepo;
import com.example.security.Repositories.DoctorRepo;
import com.example.security.Repositories.PatientRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
@Transactional
public class CaseService {
    private final CaseRepo caseRepo;
    private final PatientRepo patientRepo;
    private final DoctorRepo doctorRepo;

    @Autowired
    public CaseService(CaseRepo caseRepo, PatientRepo patientRepo, DoctorRepo doctorRepo) {
        this.caseRepo = caseRepo;
        this.patientRepo = patientRepo;
        this.doctorRepo = doctorRepo;
    }

    public void createCase(Long patientId, Long doctorId) {
        Doctor doctor = doctorRepo.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found with ID: " + doctorId));

        if (doctor.getDType().equals("R")) {
            throw new RuntimeException("Cannot register case with a Radiologist doctor.");
        }

        Patient patient = patientRepo.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found with ID: " + patientId));

        Case newCase = new Case();
        newCase.setPatient(patient);
        newCase.setDoctor(doctor);
        newCase.setCaseStatus(true); // Default value: Open
        newCase.setCaseRegistrationDate(new Date());
        // Set other default values as necessary

        caseRepo.save(newCase);
    }

}