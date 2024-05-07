package com.example.security.auth;

import com.example.security.DTOs.Requests.EmailRequest;
import com.example.security.Model.Actors.User;
import com.example.security.Model.Notification;
import com.example.security.Repositories.UserRepo;
import com.example.security.services.login.JwtService;
import com.example.security.services.notifications.ListNotifications;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notification")
public class NotificationController {

    @Autowired
    private ListNotifications listNotifications;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JwtService jwtService;


    @PostMapping("/list-notifications")
    public ResponseEntity<List<Notification>> getNotificationsByEmail(
            @RequestHeader(name = "Authorization") String token,
            @RequestBody EmailRequest emailRequest) {
        try {
            String userEmail = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix
            if (userEmail == null) {
                return ResponseEntity.badRequest().build();
            }
            User user = userRepo.findByEmail(userEmail).orElse(null);
            System.out.println(userEmail);
            System.out.println(user.getRole().getRoleName());
            if (!("patient".equals(user.getRole().getRoleName()) || "doctor".equals(user.getRole().getRoleName()))) {
                return ResponseEntity.badRequest().body(null);
            }
            String email = emailRequest.getEmail();
            List<Notification> notifications = listNotifications.getPendingNotificationsByEmail(email);
            return ResponseEntity.ok(notifications);
        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
