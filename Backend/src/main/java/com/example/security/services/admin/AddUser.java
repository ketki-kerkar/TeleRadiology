package com.example.security.services.admin;

import com.example.security.Model.Actors.*;
import com.example.security.Repositories.DoctorRepo;
import com.example.security.Repositories.HospitalHandleRepo;
import com.example.security.Repositories.LabRepo;
import com.example.security.Repositories.UserRepo;
import com.example.security.auth.loginController.AuthenticationResponse;
import com.example.security.auth.loginController.DoctorRegisterRequest;
import com.example.security.auth.loginController.HospitalRegisterRequest;
import com.example.security.auth.loginController.LabRegisterRequest;
import com.example.security.services.login.JwtService;
import com.example.security.services.login.MailService;
import com.example.security.services.login.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AddUser {
    private final UserRepo userRepo;
    private final HospitalHandleRepo hospitalHandleRepo;
    private final DoctorRepo doctorRepo;
    private final LabRepo labRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final RoleService roleService;
    private final MailService mailService;

    @Transactional
    public AuthenticationResponse registerHospital(HospitalRegisterRequest request) {
        Role userRole = roleService.findRoleByName("receptionist");
        String generatedPassword = generateRandomPassword();
        String encryptedPassword = passwordEncoder.encode(generatedPassword);
        User user = User.builder()
                .email(request.getEmail())
                .password(encryptedPassword)
                .role(userRole)
                .build();

        userRepo.save(user);

        HospitalHandle hospitalHandle = HospitalHandle.builder()
                .hospitalName(request.getHospitalName())
                .user(user)
                .build();
        hospitalHandleRepo.save(hospitalHandle);

        mailService.sendMail(request.getEmail(), "Registration Successful", "Your account has been successfully registered. Your password is: " + generatedPassword);

        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .role(userRole.getRoleName())
                .build();
    }

    @Transactional
    public AuthenticationResponse registerLab(LabRegisterRequest request) {
        Role userRole = roleService.findRoleByName("lab");
        String generatedPassword = generateRandomPassword();
        String encryptedPassword = passwordEncoder.encode(generatedPassword);
        User user = User.builder()
                .email(request.getEmail())
                .password(encryptedPassword)
                .role(userRole)
                .build();

        userRepo.save(user);

        Lab lab = Lab.builder()
                .labName(request.getLabName())
                .user(user)
                .build();
        labRepo.save(lab);

        mailService.sendMail(request.getEmail(), "Registration Successful", "Your account has been successfully registered. Your password is: " + generatedPassword);

        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .role(userRole.getRoleName())
                .build();
    }

    @Transactional
    public AuthenticationResponse registerDoctor(DoctorRegisterRequest request) {
        Role role = roleService.findRoleByName(request.getRole());
        String generatedPassword = generateRandomPassword();
        String encryptedPassword = passwordEncoder.encode(generatedPassword);
        User user = User.builder()
                .email(request.getEmail())
                .password(encryptedPassword)
                .role(role)
                .build();

        userRepo.save(user);

        HospitalHandle hospitalHandle = hospitalHandleRepo.findByHospitalName(request.getHospitalName())
                .orElseThrow(() -> new RuntimeException("Hospital not found"));

        char doctorType = (role.getRoleName().equalsIgnoreCase("radiologist")) ? 'R' : 'D';
        Doctor doctor = Doctor.builder()
                .dName(request.getDoctorName())
                .age(request.getAge())
                .qualification(request.getQualification())
                .department(request.getDepartment())
                .dType(String.valueOf(doctorType))
                .hospital(hospitalHandle)
                .user(user)
                .build();
        doctorRepo.save(doctor);

        mailService.sendMail(request.getEmail(), "Registration Successful", "Your account has been successfully registered. Your password is: " + generatedPassword);

        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .role(role.getRoleName())
                .build();
    }

    private String generateRandomPassword() {
        int passwordLength = 10; // Length of the generated password
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+";

        StringBuilder password = new StringBuilder();
        for (int i = 0; i < passwordLength; i++) {
            int index = (int) (Math.random() * characters.length());
            password.append(characters.charAt(index));
        }

        return password.toString();
    }
}
