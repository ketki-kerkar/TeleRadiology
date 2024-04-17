package com.example.security.DTOs;

import lombok.Data;

import java.util.List;

@Data
public class UserDTO {
    private String email;
    private List<HospitalHandleDTO> hospitalHandles;
    private List<LabDTO> labs;
    private List<DoctorDTO> doctors;
    private List<PatientDTO> patients;

    public UserDTO(String email, List<HospitalHandleDTO> hospitalHandles, List<LabDTO> labs, List<DoctorDTO> doctors, List<PatientDTO> patients) {
        this.email = email;
        if (hospitalHandles != null && !hospitalHandles.isEmpty()) {
            this.hospitalHandles = hospitalHandles;
        }
        if (labs != null && !labs.isEmpty()) {
            this.labs = labs;
        }
        if (doctors != null && !doctors.isEmpty()) {
            this.doctors = doctors;
        }
        this.patients = patients;
    }
}