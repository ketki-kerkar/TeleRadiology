package com.example.security.DTOs.Requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PatientRegistrationRequest {
    private String email;
    private String password;
    @Builder.Default
    private String role = "patient";
    private String name;
    private String gender;
    private String contact;
    private String bloodGroup;
    private String address;
    private Date dateOfBirth;
}