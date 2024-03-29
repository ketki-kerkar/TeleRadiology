package com.example.security.auth.adminController.FindFunction;

import com.example.security.services.admin.FindUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor

@CrossOrigin("http://localhost:3000")
public class FindByEmail {
    private final FindUser findUser;


    @PostMapping("/user/email")
    public ResponseEntity<UserDTO> getUserEntitiesByEmail(@RequestBody EmailRequest emailRequest) {
        try {
            String email = emailRequest.getEmail();
            ResponseEntity<UserDTO> response = findUser.findUserEntitiesByEmail(email);
            return response;
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}