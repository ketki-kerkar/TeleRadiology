package com.example.security.auth.adminController.ListFunction;

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
    private String hospitalName;
    private String department;
    private String qualification;
    private String email;
    private String dtype;
}
