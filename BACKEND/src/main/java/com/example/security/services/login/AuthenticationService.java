package com.example.security.services.login;

import com.example.security.DTOs.Requests.AuthenticationRequest;
import com.example.security.DTOs.Requests.AuthenticationResponse;
import com.example.security.DTOs.Requests.RegisterRequest;
import com.example.security.Model.Actors.*;
import com.example.security.Repositories.*;
import com.example.security.Model.Token;
import com.example.security.Model.TokenType;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private static final Logger logger = LoggerFactory.getLogger(AuthenticationService.class);

    private final UserRepo userRepo;
    private final TokenRepo tokenRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final RoleService roleService;
    private final DoctorRepo doctorRepo;
    private final LabRepo labRepo;
    private final HospitalHandleRepo hospitalHandleRepo;
    private final PatientRepo patientRepo;

    @Transactional
    public AuthenticationResponse register(RegisterRequest request) {
        Role role = roleService.findRoleByName(request.getRole());
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .build();

        logger.info("Received role: {}", role);
        var savedUser = userRepo.save(user);

        var jwtToken = jwtService.generateToken(user);
        saveUserToken(savedUser, jwtToken);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .role(role.getRoleName())
                .build();
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepo.findAllValidTokensByUser(user.getUserId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(t -> {
            t.setExpired(true);
            t.setRevoked(true);
        });
        tokenRepo.saveAll(validUserTokens);
    }

    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .revoked(false)
                .expired(false)
                .build();
        tokenRepo.save(token);
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        User user = userRepo.findByEmail(request.getEmail())
                .orElseThrow();

        var jwtToken = jwtService.generateToken(user);
        var role = user.getRole().getRoleName();
        String name = switch (role) {
            case "doctor" -> {
                Doctor doctor = doctorRepo.findByUserUserId(user.getUserId())
                        .orElseThrow(() -> new RuntimeException("Doctor not found"));
                yield doctor.getDName();
            }
            case "receptionist" -> {
                HospitalHandle receptionist = hospitalHandleRepo.findByUUId(user.getUserId())
                        .orElseThrow(() -> new RuntimeException("Receptionist not found"));
                yield receptionist.getHospitalName();
            }
            case "radiologist" -> {
                Doctor radiologist = doctorRepo.findByUserUserId(user.getUserId())
                        .orElseThrow(() -> new RuntimeException("Radiologist not found"));
                yield radiologist.getDName();
            }
            case "lab" -> {
                Lab lab = labRepo.findByUUId(user.getUserId())
                        .orElseThrow(() -> new RuntimeException("Lab not found"));
                yield lab.getLabName();
            }
            case "patient" -> {
                Patient patient = patientRepo.findByUUId(user.getUserId())
                        .orElseThrow(() -> new RuntimeException("Patient not found"));
                yield patient.getName();
            }
            case "admin" -> "ADMIN";
            default -> throw new IllegalArgumentException("Invalid role: " + role);
        };
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .role(role)
                .name(name)
                .build();
    }

    public AuthenticationResponse authenticateWithToken(String token) {
        String userEmail = jwtService.extractUsername(token);
        User user = userRepo.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Authentication using token, no password required
        SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(
                userEmail,
                null,
                null
        ));

        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .role(user.getRole().getRoleName())
                .build();
    }
}