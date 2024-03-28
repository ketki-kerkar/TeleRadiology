package com.example.security.auth.adminController.FindFunction;

import com.example.security.auth.adminController.ListFunction.DoctorDTO;
import com.example.security.auth.adminController.ListFunction.HospitalHandleDTO;
import com.example.security.auth.adminController.ListFunction.LabDTO;
import lombok.Data;

import java.util.List;

@Data
public class UserDTO {
   // private String email;
   // private List<HospitalHandleDTO> hospitalHandles;
   // private List<LabDTO> labs;
    private List<DoctorDTO> doctors;

    public UserDTO(  List<DoctorDTO> doctors) {
      //  this.email = email;
       // this.hospitalHandles = hospitalHandles;
       // this.labs = labs;
        this.doctors = doctors;
    }
}
