package com.example.security.services.patient;

import com.example.security.DTOs.Requests.UserIssueRequest;
import com.example.security.Model.Actors.Patient;
import com.example.security.Model.UserRequest;
import com.example.security.Repositories.PatientRepo;
import com.example.security.Repositories.UserRequestRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class UserRequestService {

    private final UserRequestRepo userRequestRepo;

    @Autowired
    private PatientRepo patientRepo;

    // Method to add a technical issue type of request
    public void addTechnicalIssue(UserIssueRequest requestDTO) {
        Patient patient = patientRepo.findByUserEmail(requestDTO.getEmail()).orElseThrow(() -> new IllegalArgumentException("Patient not found"));

        UserRequest technicalIssueRequest = UserRequest.builder()
                .requestType("Technical Issue")
                .requestDate(new Date())
                .patient(patient)
                .build();

        userRequestRepo.save(technicalIssueRequest);
    }
    public void addDeleteAccountRequest(UserIssueRequest requestDTO) {
        Patient patient = patientRepo.findByUserEmail(requestDTO.getEmail()).orElseThrow(() -> new IllegalArgumentException("Patient not found"));

        UserRequest deleteAccountRequest = UserRequest.builder()
                .requestType("Delete Account")
                .requestDate(new Date())
                .patient(patient)
                .build();

        userRequestRepo.save(deleteAccountRequest);
    }

}
