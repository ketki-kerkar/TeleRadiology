package com.example.security.auth.adminController.FindFunction;

import com.example.security.services.admin.FindUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor

@CrossOrigin("http://localhost:3000")
public class FindById {
    private final FindUser findUser;

    @PostMapping("/view-receptionist")
    public ResponseEntity<String> getHospitalHandleById(
            @RequestBody HospitalIdRequest hospitalIdRequest) {

        return findUser.getHospitalNameAndId(hospitalIdRequest.getHospitalId()); // Return the ResponseEntity directly
    }

    @PostMapping("/view-lab")
    public ResponseEntity<String> getLabById(
            @RequestBody LabIdRequest labIdRequest) {

        return findUser.getLabNameAndId(labIdRequest.getLabId()); // Return the ResponseEntity directly
    }

    @PostMapping("/view-doctor")
    public ResponseEntity<String> getDoctorById(
            @RequestBody DoctorIdRequest doctorIdRequest) {

        return findUser.getDoctorNameAndId(doctorIdRequest.getDoctorId()); // Return the ResponseEntity directly
    }
}