package com.example.security.auth;

import com.example.security.services.login.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mail")
public class MailController {
    @Autowired
    private MailService mailService;

    @PostMapping("/send/{mail}")
    public String sendMail(@PathVariable String mail, @RequestParam("subject") String subject, @RequestParam("message") String message) {
        mailService.sendMail(mail, subject, message);
        return "Successfully sent the mail";
    }
}
