package com.example.security.services.login;

import com.example.security.Repositories.UserRepo;
import com.example.security.Model.Actors.User;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ChangePasswordService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public String changePassword(String userEmail, String currentPassword, String newPassword, String confirmNewPassword) {
        Optional<User> optionalUser = userRepo.findByEmail(userEmail);
        if (optionalUser.isEmpty()) {
            return "The user does not exist.";
        }

        User user = optionalUser.get();

        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            return "The old password does not match.";
        }

        if (!newPassword.equals(confirmNewPassword)) {
            return "New password and confirm password do not match.";
        }

        // All conditions are satisfied, update the password
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepo.save(user);
        return "Password changed successfully.";
    }
}
