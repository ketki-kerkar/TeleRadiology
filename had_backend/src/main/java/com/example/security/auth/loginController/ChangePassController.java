package com.example.security.auth.loginController;

import com.example.security.auth.loginController.Requests.ChangePasswordRequest;
import com.example.security.services.login.ChangePasswordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("api/v1/authenticate")
public class ChangePassController {

    @Autowired
    private ChangePasswordService changePasswordService;

    @PostMapping("/changePass")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequest request) {
        String result = changePasswordService.changePassword(
                request.getEmail(),
                request.getCurrentPassword(),
                request.getNewPassword(),
                request.getConfirmNewPassword()
        );

        if (result.equals("Password changed successfully.")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }
}