package com.example.security.DTOs.Requests;

import lombok.Getter;

@Getter
public class UserRequestEmail {
    private String email;

    public void setEmail(String email) {
        this.email = email;
    }
}
