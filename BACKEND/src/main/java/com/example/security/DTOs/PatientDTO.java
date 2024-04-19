package com.example.security.DTOs;

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
    private String name;
    private String email;
    private int age;
    private String address;
    private String contact;
    private String gender;
    private Date dateOfRegistration;
}