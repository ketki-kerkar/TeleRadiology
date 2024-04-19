package com.example.security.services.doctor;

import com.example.security.DTOs.PatientDTO;
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
    public List<PatientDTO> getPatientsUnderDoctor(String doctorEmail) {
        // Fetch doctor by email
        Optional<Doctor> doctor = doctorRepo.findByUserEmail(doctorEmail);
        if (doctor.isEmpty()) {
            // Doctor not found
            return null;
        }

        // Fetch cases under the doctor
        List<Long> caseIds = caseRepo.findByDoctorUserEmail(doctorEmail)
                .stream()
                .map(Case::getPatient)
                .map(Patient::getPatientId)
                .collect(Collectors.toList());

        // Fetch patients using caseIds
        List<Patient> patients = patientRepo.findByPatientIdIn(caseIds);

        // Convert patients to DTOs
        return patients.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private PatientDTO convertToDTO(Patient patient) {
        PatientDTO dto = new PatientDTO();
        dto.setName(patient.getName());
        dto.setEmail(patient.getUser().getEmail());
        dto.setAge(patient.getAge());
        dto.setAddress(patient.getAddress());
        dto.setContact(patient.getContact());
        dto.setGender(patient.getGender());
        dto.setDateOfRegistration(patient.getDateOfRegistration());
        return dto;
    }
}