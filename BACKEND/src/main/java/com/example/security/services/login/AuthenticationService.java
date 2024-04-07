package com.example.security.services.login;

import com.example.security.DTOs.Requests.AuthenticationResponse;
import com.example.security.Model.Actors.Role;
import com.example.security.Model.Actors.User;
import com.example.security.Repositories.*;
import com.example.security.DTOs.Requests.AuthenticationRequest;
import com.example.security.DTOs.Requests.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
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
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final RoleService roleService;

    @Transactional
    public AuthenticationResponse register(RegisterRequest request) {
        Role role = roleService.findRoleByName(request.getRole());
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .build();

        logger.info("Received role: {}", role);
        userRepo.save(user);

        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .role(role.getRoleName())
                .build();
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

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .role(role)
                .build();
    }
}
