package com.example.security.services.notifications;

import com.example.security.Model.Actors.Doctor;
import com.example.security.Model.Actors.Patient;
import com.example.security.Model.Actors.User;
import com.example.security.Model.Notification;
import com.example.security.Repositories.DoctorRepo;
import com.example.security.Repositories.NotificationRepo;
import com.example.security.Repositories.PatientRepo;
import com.example.security.Repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ListNotifications {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private DoctorRepo doctorRepo;

    @Autowired
    private PatientRepo patientRepo;

    @Autowired
    private NotificationRepo notificationRepo;


    public List<Notification> getPendingNotificationsByEmail(String email) {
        // Find the User associated with the provided email
        Optional<User> userOptional = userRepo.findByEmail(email);
        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("User not found for email: " + email);
        }

        // Get the user ID
        UUID userId = userOptional.get().getUserId();

        // Determine if the user is a doctor or a patient
        Optional<Doctor> doctorOptional = doctorRepo.findByUserUserId(userId);
        Optional<Patient> patientOptional = patientRepo.findByUserUserId(userId);

        if (doctorOptional.isPresent()) {
            // User is a doctor
            return notificationRepo.findByDoctorUserEmailAndNotification_Status(email, "Pending");
        } else if (patientOptional.isPresent()) {
            // User is a patient
            return notificationRepo.findByPatientUserEmailAndNotification_Status(email, "Pending");
        } else {
            // User is neither a doctor nor a patient
            throw new IllegalStateException("User is neither a doctor nor a patient.");
        }

    }

  /*  public void markNotificationsAsCompletedByEmail(String email) {
        // Find the User associated with the provided email
        Optional<User> userOptional = userRepo.findByEmail(email);
        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("User not found for email: " + email);
        }

        // Get the user ID
        UUID userId = userOptional.get().getUserId();

        // Determine if the user is a doctor or a patient
        Optional<Doctor> doctorOptional = doctorRepo.findByUserUserId(userId);
        Optional<Patient> patientOptional = patientRepo.findByUserUserId(userId);

        if (doctorOptional.isPresent()) {
            // User is a doctor
            Long doctorId = doctorOptional.get().getDoctorId();
            notificationRepo.updateStatusForDoctor(doctorId);
        } else if (patientOptional.isPresent()) {
            // User is a patient
            Long patientId = patientOptional.get().getPatientId();
            notificationRepo.updateStatusForPatient(patientId);
        } else {
            // User is neither a doctor nor a patient
            throw new IllegalStateException("User is neither a doctor nor a patient.");
        }
    }*/

}
