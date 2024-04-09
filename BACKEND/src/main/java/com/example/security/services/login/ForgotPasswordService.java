package com.example.security.services.login;

import com.example.security.Model.Actors.User;
import com.example.security.Repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Duration;
import java.time.Instant;
import java.util.Optional;
import java.util.Random;

@Service
public class ForgotPasswordService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private MailService mailService;

    public void forgotPassword(String email) {
        Optional<User> optionalUser = userRepo.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            int otp = Integer.parseInt(generateOTP());
            user.setOtpContent(otp);
            user.setOtpGenerationTime(new Timestamp(System.currentTimeMillis()));
            userRepo.save(user);
            mailService.sendOTPEmailId(user.getEmail(), String.valueOf(otp));
        } else {
            throw new IllegalArgumentException("User not registered with this email");
        }
    }

    public boolean verifyOTP(String email, Integer otp) {
        Optional<User> optionalUser = userRepo.findByEmailAndOtpContent(email, otp);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return isValidOTP(user);
        }
        return false;
    }

    public void resetPassword(String email, Integer otp, String newPassword, String confirmNewPassword) {
        Optional<User> optionalUser = userRepo.findByEmailAndOtpContent(email, otp);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (isValidOTP(user)) {
                if (newPassword.equals(confirmNewPassword)) {
                    user.setPassword(passwordEncoder.encode(newPassword));
                    user.setOtpContent(null);
                    user.setOtpGenerationTime(null);
                    userRepo.save(user);
                } else {
                    throw new IllegalArgumentException("New password and confirm password do not match");
                }
            } else {
                throw new IllegalArgumentException("OTP has expired or is invalid");
            }
        } else {
            throw new IllegalArgumentException("Invalid email or OTP");
        }
    }


    private boolean isValidOTP(User user) {
        Timestamp otpGenerationTime = user.getOtpGenerationTime();
        Instant currentTime = Instant.now();
        Duration timeDifference = Duration.between(otpGenerationTime.toInstant(), currentTime);
        long otpValiditySeconds = 5 * 60; // 5 minutes in seconds

        return timeDifference.getSeconds() <= otpValiditySeconds;
    }

    private String generateOTP() {
        Random random = new Random();
        int otpLength = 6;
        StringBuilder otp = new StringBuilder();
        for (int i = 0; i < otpLength; i++) {
            otp.append(random.nextInt(10));
        }
        return otp.toString();
    }
}
