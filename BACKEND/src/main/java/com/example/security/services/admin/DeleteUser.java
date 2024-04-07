package com.example.security.services.admin;

import com.example.security.Model.Actors.User;
import com.example.security.Repositories.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DeleteUser {
    private final UserRepo userRepo;

    public ResponseEntity<String> disableUser(String email){
        Optional<User> userOptional = userRepo.findByEmail(email);
        if (userOptional.isPresent()) {
            User user=userOptional.get();
            user.setIsDisabled(true);
            userRepo.save(user);
            return ResponseEntity.ok("User with email: " + email + " deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

}
