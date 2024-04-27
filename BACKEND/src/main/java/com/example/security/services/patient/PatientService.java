package com.example.security.services.patient;

import com.example.security.DTOs.UserDTO;
import com.example.security.Model.Actors.Patient;
import com.example.security.Repositories.PatientRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepo patientRepo;
    public Optional<Patient> getPatientDetailsByEmail(String userEmail) {
        return patientRepo.findByUserEmail(userEmail);
    }
}
