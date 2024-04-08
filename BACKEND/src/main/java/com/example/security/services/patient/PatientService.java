package com.example.security.services.patient;

import com.example.security.Model.Actors.Patient;
import com.example.security.Model.Actors.User;
import com.example.security.Repositories.PatientRepo;
import com.example.security.services.login.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Duration;
import java.time.Instant;
import java.util.Optional;
import java.util.Random;

@Service
public class PatientService {
    @Autowired
    private PatientRepo patientRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private MailService mailService;

    public void forgotPassword(String emailId) {
        Optional<Patient> optionalPatient = patientRepo.findByUserEmail(emailId);
        if (optionalPatient.isPresent()) {
            Patient patient = optionalPatient.get();
            int otp = Integer.parseInt(generateOTP());
            patient.setOtpContent(otp);
            patient.setOtpGenerationTime(new Timestamp(System.currentTimeMillis()));
            patientRepo.save(patient);
            mailService.sendOTPEmailId(patient.getUser().getEmail(), String.valueOf(otp));
        } else {
            throw new IllegalArgumentException("Patient not registered with this email");
        }
    }

    public void resetPassword(String emailId, Integer otp, String newPassword, String confirmNewPassword) {
        Optional<Patient> optionalPatient = patientRepo.findByUserEmailAndOtpContent(emailId, otp);
        if (optionalPatient.isPresent()) {
            Patient patient = optionalPatient.get();
            if (isValidOTP(patient)) {
                if (newPassword.equals(confirmNewPassword)) {
                    patient.getUser().setPassword(passwordEncoder.encode(newPassword));
                    patient.setOtpContent(null);
                    patient.setOtpGenerationTime(null);
                    patientRepo.save(patient);
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

    private boolean isValidOTP(Patient patient) {
        Timestamp otpGenerationTime = patient.getOtpGenerationTime();
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
