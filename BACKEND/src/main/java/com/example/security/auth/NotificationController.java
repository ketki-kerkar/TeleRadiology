package com.example.security.auth;

import com.example.security.DTOs.Requests.EmailRequest;
import com.example.security.Model.Notification;
import com.example.security.services.notifications.ListNotifications;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/authenticate")
public class NotificationController {

    @Autowired
    private ListNotifications listNotifications;


    @PostMapping("/list-notifications")
    public ResponseEntity<List<Notification>> getNotificationsByEmail(@RequestBody EmailRequest emailRequest) {
        try {
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
