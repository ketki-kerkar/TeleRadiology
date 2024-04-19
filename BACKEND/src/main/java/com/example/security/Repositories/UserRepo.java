package com.example.security.Repositories;

import com.example.security.Model.Actors.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository <User, Integer> {
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailAndOtpContent(String email, Integer otpContent);
}
