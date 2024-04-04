package com.example.security.auth.hospHanController;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PatientDTO {
    private Long patientId;
    private String name;
    private int age;
    private String gender;
    private long contact;
    private String address;
    private Date dateOfRegistration;
    private String emailId;

}