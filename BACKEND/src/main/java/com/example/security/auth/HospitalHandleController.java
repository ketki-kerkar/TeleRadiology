package com.example.security.auth;

import com.example.security.DTOs.DoctorByHospitalDTO;
import com.example.security.DTOs.PatientDTO;
import com.example.security.DTOs.Requests.*;
import com.example.security.DTOs.UserDTO;
import com.example.security.Model.Actors.HospitalHandle;
import com.example.security.Model.Actors.Lab;
import com.example.security.Model.Actors.Patient;
import com.example.security.Model.Actors.User;
import com.example.security.Repositories.HospitalHandleRepo;
import com.example.security.Repositories.LabRepo;
import com.example.security.Repositories.UserRepo;
import com.example.security.services.admin.AddUser;
import com.example.security.services.admin.FindUser;
import com.example.security.services.admin.ListUser;
import com.example.security.services.hospitalHandle.ListDoctor;
import com.example.security.services.hospitalHandle.PatientRegistrationService;
import com.example.security.services.hospitalHandle.ViewPatient;
import com.example.security.services.login.JwtService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.security.services.hospitalHandle.CaseService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/receptionist")
public class HospitalHandleController {
    private static final Logger logger = LoggerFactory.getLogger(HospitalHandleController.class);
    @Autowired
    private PatientRegistrationService patientRegistrationService;
    @Autowired
    private ViewPatient viewPatient;

    @Autowired
    private CaseService caseService;

    @Autowired
    private AddUser addUser;

    @Autowired
    private ListDoctor listDoctor;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private FindUser findUser;

    @Autowired
    private ListUser listUser;

    @Autowired
    private LabRepo labRepo;

    @Autowired
    private HospitalHandleRepo hospitalHandleRepo;

    @PostMapping("/add-patient")
    public ResponseEntity<AuthenticationResponse> registerPatient(
            @RequestHeader(name = "Authorization") String token,
            @RequestBody PatientRegistrationRequest request
    ){
        String userEmail = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix
        if (userEmail == null) {
            return ResponseEntity.badRequest().body(null);
        }
        User user = userRepo.findByEmail(userEmail).orElse(null);
        if (user == null || !"receptionist".equals(user.getRole().getRoleName())) {
            return ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.ok(addUser.registerPatient(request));
    }

    @GetMapping("/viewList/ofPatients")
    public ResponseEntity<List<PatientDTO>> getAllPatient(@RequestHeader(name = "Authorization") String token) {
        String userEmail = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix
        if (userEmail == null) {
            return ResponseEntity.badRequest().body(null);
        }
        User user = userRepo.findByEmail(userEmail).orElse(null);
        if (user == null || !"receptionist".equals(user.getRole().getRoleName())) {
            return ResponseEntity.badRequest().body(null);
        }
        List<PatientDTO> patientDTOs = listUser.getAllPatient()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(patientDTOs);
    }
    private PatientDTO convertToDTO(Patient patient) {
        PatientDTO dto = new PatientDTO();
        dto.setName(patient.getName());
        dto.setEmail(patient.getUser().getEmail());
        dto.setAge(patient.getAge());
        dto.setAddress(patient.getAddress());
        dto.setContact(patient.getContact());
        dto.setGender(patient.getGender());
        dto.setDateOfRegistration(patient.getDateOfRegistration());
        return dto;
    }

    @PostMapping("/cases")
    public ResponseEntity<String> createCase(
            @RequestHeader(name = "Authorization") String token,
            @RequestBody CaseCreationRequest request) {
        String userEmail = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix
        if (userEmail == null) {
            return ResponseEntity.badRequest().body("Invalid token");
        }
        User user = userRepo.findByEmail(userEmail).orElse(null);
        if (user == null || !"receptionist".equals(user.getRole().getRoleName())) {
            return ResponseEntity.badRequest().body("User does not have privileges");
        }
        caseService.createCase(request.getPatientEmail(), request.getDoctorEmail());
        return ResponseEntity.ok("Case created successfully");
    }

    @GetMapping("/list-doctors")
    public ResponseEntity<List<DoctorByHospitalDTO>> getDoctorsByHospital(@RequestHeader(name = "Authorization") String token) {
        String userEmail = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix
        if (userEmail == null) {
            return ResponseEntity.badRequest().body(null);
        }
        User user = userRepo.findByEmail(userEmail).orElse(null);
        if (user == null || !"receptionist".equals(user.getRole().getRoleName())) {
            return ResponseEntity.badRequest().body(null);
        }
        List<DoctorByHospitalDTO> doctors = listDoctor.getDoctorsByHospital(userEmail)
                .stream()
                .map(doctor -> new DoctorByHospitalDTO(doctor.getDName(), doctor.getUser().getEmail()))
                .collect(Collectors.toList());

        return ResponseEntity.ok(doctors);
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
        if (user == null || !"receptionist".equals(user.getRole().getRoleName())) {
            return ResponseEntity.badRequest().body(null);
        }
        try {
            String email = emailRequest.getEmail();
            Optional<Lab> labOptional = labRepo.findByUserEmail(email);
            if (labOptional.isPresent()) {
                // If the user is a lab, return bad request
                return ResponseEntity.badRequest().body(null);
            }
            Optional<HospitalHandle> hospitalHandleOptional = hospitalHandleRepo.findByUserEmail(email);
            if (hospitalHandleOptional.isPresent()) {
                // If the user is a hospital handle, return bad request
                return ResponseEntity.badRequest().body(null);
            }
            ResponseEntity<UserDTO> response = findUser.findUserEntitiesByEmail(email);
            return response;
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}