package com.example.security.DTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.text.SimpleDateFormat;
import java.util.Date;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestDTO {
    private String patientEmail;
    private String requestType;
    private String requestDate;
    private boolean requestStatus;

    // Method to format date
    public void setRequestDate(Date requestDate) {
        SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
        this.requestDate = sdf.format(requestDate);
    }
}
