package com.example.security.auth.adminController.ListFunction;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HospitalHandleDTO {
    private String hospitalName;
    private String email ;
}