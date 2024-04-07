package com.example.security.auth;

import com.example.security.DTOs.*;
import com.example.security.DTOs.Requests.*;
import com.example.security.Model.Actors.Doctor;
import com.example.security.Model.Actors.HospitalHandle;
import com.example.security.Model.Actors.Lab;
import com.example.security.DTOs.Requests.AuthenticationResponse;
import com.example.security.services.admin.AddUser;
import com.example.security.services.admin.DeleteUser;
import com.example.security.services.admin.FindUser;
import com.example.security.services.admin.ListUser;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {
    @Autowired
    private ListUser listUser ;
    @Autowired
    private final AddUser addUser;
    @Autowired
    private final FindUser findUser;
    @Autowired
    private final DeleteUser deleteUser;

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

    @GetMapping("/viewList/ofHospitals")
    public ResponseEntity<List<HospitalHandleDTO>> getAllHospitalHandles() {
        List<HospitalHandleDTO> hospitalHandleDTOs = listUser.getAllHospitalHandles()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(hospitalHandleDTOs);
    }
    private HospitalHandleDTO convertToDTO(HospitalHandle hospitalHandle) {
        HospitalHandleDTO dto = new HospitalHandleDTO();
        dto.setHospitalName(hospitalHandle.getHospitalName());
        dto.setEmail(hospitalHandle.getUser().getEmail());
        return dto;
    }

    @GetMapping("/viewList/ofLabs")
    public ResponseEntity<List<LabDTO>> getAllLab() {
        List<LabDTO> labDTOs = listUser.getAllLab()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(labDTOs);
    }
    private LabDTO convertToDTO(Lab lab) {
        LabDTO dto = new LabDTO();
        dto.setLabName(lab.getLabName());
        dto.setEmail(lab.getUser().getEmail());
        return dto;
    }

    @GetMapping("/viewList/ofDoctors")
    public ResponseEntity<List<DoctorDTO>> getAllDoctor() {
        List<DoctorDTO> doctorDTOs = listUser.getAllDoctor()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(doctorDTOs);
    }
    private DoctorDTO convertToDTO(Doctor doctor) {
        DoctorDTO dto = new DoctorDTO();
        dto.setDName(doctor.getDName());
        dto.setHospitalName(doctor.getHospital().getHospitalName());
        dto.setEmail(doctor.getUser().getEmail());
        return dto;
    }

    @PostMapping("/findUser/ByEmail")
    public ResponseEntity<UserDTO> getUserEntitiesByEmail(@RequestBody EmailRequest emailRequest) {
        try {
            String email = emailRequest.getEmail();
            ResponseEntity<UserDTO> response = findUser.findUserEntitiesByEmail(email);
            return response;
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @PutMapping("/delete-user")
    public ResponseEntity<String> disableDoctor(@RequestBody UserRequestEmail request){
        ResponseEntity<String> response=deleteUser.disableUser(request.getEmail());
        if (response.getStatusCode() == HttpStatus.OK) {
            return ResponseEntity.ok(response.getBody());
        } else {
            System.out.println("hello");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response.getBody());
        }
    }
}
