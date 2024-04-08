package com.example.security.auth;

import com.example.security.DTOs.Requests.ChangePasswordRequest;
import com.example.security.services.login.ChangePasswordService;
import com.example.security.services.login.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/authenticate")
public class ChangePassController {

    private final ChangePasswordService changePasswordService;
    private final JwtService jwtService;

    @Autowired
    public ChangePassController(ChangePasswordService changePasswordService, JwtService jwtService) {
        this.changePasswordService = changePasswordService;
        this.jwtService = jwtService;
    }

    @PostMapping("/changePass")
    public ResponseEntity<String> changePassword(@RequestHeader(name = "Authorization") String token,
                                                 @RequestBody ChangePasswordRequest request) {
        String userEmail = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix
        if (userEmail == null) {
            return ResponseEntity.badRequest().body("Invalid token");
        }

        String result = changePasswordService.changePassword(
                userEmail,
                request.getCurrentPassword(),
                request.getNewPassword(),
                request.getConfirmNewPassword()
        );

        if (result.equals("Password changed successfully.")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }
}