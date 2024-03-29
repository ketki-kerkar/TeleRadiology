package com.example.security.auth.adminController;

import com.example.security.auth.loginController.AuthenticationResponse;
import com.example.security.auth.loginController.DoctorRegisterRequest;
import com.example.security.auth.loginController.HospitalRegisterRequest;
import com.example.security.auth.loginController.LabRegisterRequest;
import com.example.security.services.admin.AddUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor

@CrossOrigin("http://localhost:3000")

public class AddFunction {
    private final AddUser addUser;

    @PostMapping("/add-doctor")
    public ResponseEntity<AuthenticationResponse> registerDoctor(
            @RequestBody DoctorRegisterRequest request
    ){
        return ResponseEntity.ok(addUser.registerDoctor(request));
    }

    @PostMapping("/add-receptionist")
    public ResponseEntity<AuthenticationResponse> registerHospital(
            @RequestBody HospitalRegisterRequest request
    ){
        return ResponseEntity.ok(addUser.registerHospital(request));
    }

    @PostMapping("/add-lab")
    public ResponseEntity<AuthenticationResponse> registerLab(
            @RequestBody LabRegisterRequest request
    ){
        return ResponseEntity.ok(addUser.registerLab(request));
    }
}

