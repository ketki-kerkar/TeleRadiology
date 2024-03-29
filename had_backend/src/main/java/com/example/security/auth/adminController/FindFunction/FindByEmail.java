
package com.example.security.auth.adminController.FindFunction;

import com.example.security.services.admin.FindUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor

@CrossOrigin("http://localhost:3000")
public class FindByEmail {

    private final FindUser findUser;


    @PostMapping("/user/email")
    public ResponseEntity<UserDTO> getUserEntitiesByEmail(@RequestBody EmailRequest emailRequest) {
        String email = emailRequest.getEmail();
        return findUser.findUserEntitiesByEmail(email);
    }

}