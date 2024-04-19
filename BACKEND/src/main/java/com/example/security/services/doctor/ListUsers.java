package com.example.security.services.doctor;

import com.example.security.DTOs.PatientWithCaseDTO;
import com.example.security.Model.Actors.Doctor;
import com.example.security.Model.Actors.Patient;
import com.example.security.Repositories.CaseRepo;
import com.example.security.Repositories.DoctorRepo;
import com.example.security.Repositories.PatientRepo;
import com.example.security.Model.Case;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ListUsers {
    @Autowired
    private PatientRepo patientRepo;
    @Autowired
    private DoctorRepo doctorRepo;
    @Autowired
    private CaseRepo caseRepo;

    public List<Doctor> getAllDoctor() {
        return doctorRepo.findAll();
    }

    // Service method to get patients under a specific doctor using doctor's email
    public List<PatientWithCaseDTO> getPatientsUnderDoctor(String doctorEmail) {
        // Fetch doctor by email
        Optional<Doctor> doctor = doctorRepo.findByUserEmail(doctorEmail);
        if (doctor.isEmpty()) {
            // Doctor not found
            return null;
        }

        // Fetch cases under the doctor
        List<Case> cases = caseRepo.findByDoctorUserEmail(doctorEmail);

        // Fetch patients associated with the cases
        List<Patient> patients = cases.stream()
                .map(Case::getPatient)
                .collect(Collectors.toList());

        // Convert patients to DTOs
        return patients.stream()
                .map(patient -> convertToDTO(patient, cases))
                .collect(Collectors.toList());
    }

    private PatientWithCaseDTO convertToDTO(Patient patient, List<Case> cases) {
        PatientWithCaseDTO dto = new PatientWithCaseDTO();
        dto.setName(patient.getName());
        dto.setEmail(patient.getUser().getEmail());
        dto.setAge(patient.getAge());
        dto.setAddress(patient.getAddress());
        dto.setContact(patient.getContact());
        dto.setGender(patient.getGender());
        dto.setDateOfRegistration(patient.getDateOfRegistration());

        // Find the case associated with the patient
        Optional<Case> patientCase = cases.stream()
                .filter(c -> c.getPatient().equals(patient))
                .findFirst();

        // Populate case ID and case status if a case is found
        if (patientCase.isPresent()) {
            dto.setCaseId(patientCase.get().getCaseId());
            dto.setCaseStatus(patientCase.get().getCaseStatus());
        }

        return dto;
    }
}