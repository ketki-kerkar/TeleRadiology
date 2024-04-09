package com.example.security.services.hospitalHandle;

import com.example.security.Model.Actors.Patient;
import com.example.security.Model.Actors.User;
import com.example.security.Repositories.PatientRepo;
import com.example.security.services.login.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.Date;

@Service
public class PatientRegistrationService {

    private final PatientRepo patientRepo;
    private final MailService mailService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public PatientRegistrationService(PatientRepo patientRepo, MailService mailService, PasswordEncoder passwordEncoder) {
        this.patientRepo = patientRepo;
        this.mailService = mailService;
        this.passwordEncoder = passwordEncoder;
    }

    public int calculateAge(Date dob) {
        LocalDate birthDate = dob.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate currentDate = LocalDate.now();
        int age = Period.between(birthDate, currentDate).getYears();
        return age;
    }

    private void calculateAndSetAge(Patient patient) {
        LocalDate birthDate = patient.getDateOfBirth().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate currentDate = LocalDate.now();
        int age = Period.between(birthDate, currentDate).getYears();
        patient.setAge(age);
    }

    private void setRegistrationDate(Patient patient) {
        patient.setDateOfRegistration(new Date());
    }

    private String generateRandomPassword() {
        int passwordLength = 10;
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+";
        StringBuilder password = new StringBuilder();
        for (int i = 0; i < passwordLength; i++) {
            int index = (int) (Math.random() * characters.length());
            password.append(characters.charAt(index));
        }
        return password.toString();
    }

    private void sendPasswordEmail(User user, String unencryptedPassword) {
        String subject = "Your password for patient portal";
        String message = "Your password is: " + unencryptedPassword;
        mailService.sendMail(user.getEmail(), subject, message);
    }
}
