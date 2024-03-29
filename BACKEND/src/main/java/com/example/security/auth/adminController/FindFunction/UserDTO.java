package com.example.security.auth.adminController.FindFunction;

import com.example.security.auth.adminController.ListFunction.DoctorDTO;
import com.example.security.auth.adminController.ListFunction.HospitalHandleDTO;
import com.example.security.auth.adminController.ListFunction.LabDTO;
import lombok.Data;

import java.util.List;

@Data
public class UserDTO {
    private String email;
    private List<HospitalHandleDTO> hospitalHandles;
    private List<LabDTO> labs;
    private List<DoctorDTO> doctors;

    public UserDTO(String email, List<HospitalHandleDTO> hospitalHandles, List<LabDTO> labs, List<DoctorDTO> doctors) {
        this.email = email;
        if (hospitalHandles != null && !hospitalHandles.isEmpty()) {
            this.hospitalHandles = hospitalHandles;
        }
        if (labs != null && !labs.isEmpty()) {
            this.labs = labs;
        }
        this.doctors = doctors;
    }
}