package com.example.security.services.patient;

import com.example.security.DTOs.Requests.UserIssueRequest;
import com.example.security.Model.Actors.Patient;
import com.example.security.Model.UserRequest;
import com.example.security.Repositories.PatientRepo;
import com.example.security.Repositories.UserRequestRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class UserRequestService {

    private final UserRequestRepo userRequestRepo;
    private final PatientRepo patientRepo;

    public void addTechnicalIssue(UserIssueRequest requestDTO) {
        Patient patient = patientRepo.findByUserEmail(requestDTO.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Patient not found"));

        UserRequest technicalIssueRequest = UserRequest.builder()
                .requestType("Technical Issue")
                .requestDate(new Date())
                .requestContent(requestDTO.getIssueType())
                .patient(patient)
                .requestStatus(true)
                .build();

        userRequestRepo.save(technicalIssueRequest);
    }

    public void addDeleteAccountRequest(UserIssueRequest requestDTO) {
        Patient patient = patientRepo.findByUserEmail(requestDTO.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Patient not found"));

        UserRequest deleteAccountRequest = UserRequest.builder()
                .requestType("Delete Account")
                .requestDate(new Date())
                .requestContent(requestDTO.getIssueType()) // Use requestDTO directly
                .patient(patient)
                .requestStatus(true)
                .build();

        userRequestRepo.save(deleteAccountRequest);
    }
}
