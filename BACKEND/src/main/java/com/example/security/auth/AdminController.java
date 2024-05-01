package com.example.security.auth;

import com.example.security.DTOs.*;
import com.example.security.DTOs.Requests.*;
import com.example.security.Model.Actors.*;
import com.example.security.DTOs.Requests.AuthenticationResponse;
import com.example.security.Model.UserRequest;
import com.example.security.Repositories.PatientRepo;
import com.example.security.Repositories.UserRepo;
import com.example.security.Repositories.UserRequestRepo;
import com.example.security.services.admin.AddUser;
import com.example.security.services.admin.DeleteUser;
import com.example.security.services.admin.FindUser;
import com.example.security.services.admin.ListUser;
import com.example.security.services.login.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
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
    private final UserRequestRepo userRequestRepo;
    private final JwtService jwtService;
    private final UserRepo userRepo;
    @Autowired
    private PatientRepo patientRepo;

    @PostMapping("/add-doctor")
    public ResponseEntity<AuthenticationResponse> registerDoctor(
            @RequestHeader(name = "Authorization") String token,
            @RequestBody DoctorRegisterRequest request
    ){
        String userEmail = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix
        if (userEmail == null) {
            return ResponseEntity.badRequest().body(null);
        }
        User user = userRepo.findByEmail(userEmail).orElse(null);
        if (user == null || !"admin".equals(user.getRole().getRoleName())) {
            return ResponseEntity.badRequest().body(null);
        }

        // Only admin can access this endpoint
        return ResponseEntity.ok(addUser.registerDoctor(request));
    }

    @PostMapping("/add-receptionist")
    public ResponseEntity<AuthenticationResponse> registerHospital(
            @RequestHeader(name = "Authorization") String token,
            @RequestBody HospitalRegisterRequest request
    ){
        String userEmail = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix
        if (userEmail == null) {
            return ResponseEntity.badRequest().body(null);
        }
        User user = userRepo.findByEmail(userEmail).orElse(null);
        if (user == null || !"admin".equals(user.getRole().getRoleName())) {
            return ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.ok(addUser.registerHospital(request));
    }

    @PostMapping("/add-lab")
    public ResponseEntity<AuthenticationResponse> registerLab(
            @RequestHeader(name = "Authorization") String token,
            @RequestBody LabRegisterRequest request
    ){
        String userEmail = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix
        if (userEmail == null) {
            return ResponseEntity.badRequest().body(null);
        }
        User user = userRepo.findByEmail(userEmail).orElse(null);
        if (user == null || !"admin".equals(user.getRole().getRoleName())) {
            return ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.ok(addUser.registerLab(request));
    }

    @GetMapping("/viewList/ofHospitals")
    public ResponseEntity<List<HospitalHandleDTO>> getAllHospitalHandles(@RequestHeader(name = "Authorization") String token) {
        String userEmail = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix
        if (userEmail == null) {
            return ResponseEntity.badRequest().body(null);
        }
        User user = userRepo.findByEmail(userEmail).orElse(null);
        if (user == null || !"admin".equals(user.getRole().getRoleName())) {
            return ResponseEntity.badRequest().body(null);
        }
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
    public ResponseEntity<List<LabDTO>> getAllLab(@RequestHeader(name = "Authorization") String token) {
        String userEmail = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix
        if (userEmail == null) {
            return ResponseEntity.badRequest().body(null);
        }
        User user = userRepo.findByEmail(userEmail).orElse(null);
        if (user == null || !"admin".equals(user.getRole().getRoleName())) {
            return ResponseEntity.badRequest().body(null);
        }
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
    public ResponseEntity<List<DoctorDTO>> getAllDoctor(@RequestHeader(name = "Authorization") String token) {
        String userEmail = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix
        if (userEmail == null) {
            return ResponseEntity.badRequest().body(null);
        }
        User user = userRepo.findByEmail(userEmail).orElse(null);
        if (user == null || !"admin".equals(user.getRole().getRoleName())) {
            return ResponseEntity.badRequest().body(null);
        }
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
    public ResponseEntity<UserDTO> getUserEntitiesByEmail(
            @RequestHeader(name = "Authorization") String token,
            @RequestBody EmailRequest emailRequest) {
        String userEmail = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix
        if (userEmail == null) {
            return ResponseEntity.badRequest().body(null);
        }
        User user = userRepo.findByEmail(userEmail).orElse(null);
        if (user == null || !"admin".equals(user.getRole().getRoleName())) {
            return ResponseEntity.badRequest().body(null);
        }
        try {
            String email = emailRequest.getEmail();
            Optional<Patient> patientOptional = patientRepo.findByUserEmail(email);
            if (patientOptional.isPresent()) {
                // If the user is a patient, return bad request
                return ResponseEntity.badRequest().body(null);
            }
            ResponseEntity<UserDTO> response = findUser.findUserEntitiesByEmail(email);
            return response;
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @PutMapping("/delete-user")
    public ResponseEntity<String> disableDoctor(
            @RequestHeader(name = "Authorization") String token,
            @RequestBody UserRequestEmail request){
        String userEmail = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix
        if (userEmail == null) {
            return ResponseEntity.badRequest().body(null);
        }
        User user = userRepo.findByEmail(userEmail).orElse(null);
        if (user == null || !"admin".equals(user.getRole().getRoleName())) {
            return ResponseEntity.badRequest().body(null);
        }
        ResponseEntity<String> response=deleteUser.disableUser(request.getEmail());
        if (response.getStatusCode() == HttpStatus.OK) {
            return ResponseEntity.ok(response.getBody());
        } else {
            System.out.println("hello");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response.getBody());
        }
    }

    @GetMapping("/view-complaints")
    public ResponseEntity<List<UserRequestDTO>> getAllComplaints(@RequestHeader(name = "Authorization") String token) {
        String userEmail = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix
        if (userEmail == null) {
            return ResponseEntity.badRequest().body(null);
        }
        User user = userRepo.findByEmail(userEmail).orElse(null);
        if (user == null || !"admin".equals(user.getRole().getRoleName())) {
            return ResponseEntity.badRequest().body(null);
        }
        List<UserRequest> complaints = userRequestRepo.findAll(); // Assuming complaintRepo is the repository for UserRequest

        List<UserRequestDTO> complaintDTOs = complaints.stream()
                .map(complaint -> {
                    UserRequestDTO dto = new UserRequestDTO();
                    dto.setPatientEmail(complaint.getPatientEmail());
                    dto.setRequestType(complaint.getRequestType());
                    dto.setRequestDate(complaint.getRequestDate());
                    dto.setRequestStatus(complaint.isRequestStatus());
                    return dto;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(complaintDTOs);
    }
}