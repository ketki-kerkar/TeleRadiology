package com.example.security.auth.hospHanController;

import com.example.security.Model.Patient;
import com.example.security.services.hospitalHandle.ViewPatient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/receptionist")
public class ListPatient {


    @Autowired
    private ViewPatient viewPatient;

    @GetMapping("/viewPatients")
    public ResponseEntity<List<PatientDTO>> getAllPatient() {
        List<PatientDTO> patientDTOs = viewPatient.getAllPatient()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(patientDTOs);
    }
    private PatientDTO convertToDTO(Patient patient) {
        return PatientDTO.builder()
                .patientId(patient.getPatientId())
                .name(patient.getName())
                .age(patient.getAge())
                .address(patient.getAddress())
                .contact(patient.getContact())
                .gender(patient.getGender())
                .dateOfRegistration(patient.getDateOfRegistration())
                .emailId(patient.getEmailId())
                .build();
    }
}