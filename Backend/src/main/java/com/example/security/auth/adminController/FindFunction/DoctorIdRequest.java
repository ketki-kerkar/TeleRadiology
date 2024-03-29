package com.example.security.auth.adminController.FindFunction;

import lombok.Data;

@Data
public class DoctorIdRequest {
    private Long doctorId;
    private String dType;
    private String dName;
    private String qualification;
    private String department;
    private String hospitalName;
}