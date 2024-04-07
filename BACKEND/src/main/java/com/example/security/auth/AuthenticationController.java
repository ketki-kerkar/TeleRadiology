package com.example.security.auth;

import com.example.security.DTOs.Requests.AuthenticationRequest;
import com.example.security.DTOs.Requests.ChangePasswordRequest;
import com.example.security.DTOs.Requests.RegisterRequest;
import com.example.security.DTOs.Requests.AuthenticationResponse;
import com.example.security.services.login.AuthenticationService;
import com.example.security.services.login.ChangePasswordService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor

@CrossOrigin("http://localhost:3000")
public class AuthenticationController {
    @Autowired
    private ChangePasswordService changePasswordService;
    @Autowired
    private final AuthenticationService service ;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ){
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate (
            @RequestBody AuthenticationRequest request
    ){
        return ResponseEntity.ok(service.authenticate(request));
    }

    @PostMapping("/authenticate/changePass")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequest request) {
        String result = changePasswordService.changePassword(
                request.getEmail(),
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
