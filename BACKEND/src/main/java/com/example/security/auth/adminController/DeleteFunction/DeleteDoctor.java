package com.example.security.auth.adminController.DeleteFunction;

import com.example.security.services.admin.DeleteUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor

@CrossOrigin("http://localhost:3000")
public class DeleteDoctor {
    private final DeleteUser deleteUser;

    @PutMapping("/delete-doctor")
    public ResponseEntity<String> disableDoctor(@RequestBody UserRequestEmail request){
        ResponseEntity<String> response=deleteUser.disableUser(request.getEmail());
        if (response.getStatusCode() == HttpStatus.OK) {
            return ResponseEntity.ok(response.getBody());
        } else {
            System.out.println("hello");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response.getBody());
        }
    }

}
