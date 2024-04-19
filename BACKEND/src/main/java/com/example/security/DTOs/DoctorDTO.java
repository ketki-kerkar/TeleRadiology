package com.example.security.DTOs;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DoctorDTO {
    private String dName;
    private String email;
    private String dType;
    private String hospitalName;
    private String department;
    private String qualification;

    public String getDType() {
        if (dType != null && dType.equalsIgnoreCase("D")) {
            return "Doctor";
        } else if (dType != null && dType.equalsIgnoreCase("R")) {
            return "Radiologist";
        }
        return "";
    }

}