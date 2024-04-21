package com.example.security.Repositories;

import com.example.security.Model.Notification;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface NotificationRepo extends JpaRepository<Notification, Long> {

    @Query("SELECT n FROM Notification n WHERE n.patient.user.email = :email AND n.Notification_Status = :status")
    List<Notification> findByPatientUserEmailAndNotification_Status(String email, String status);

    @Query("SELECT n FROM Notification n WHERE n.doctor.user.email = :email AND n.Notification_Status = :status")
    List<Notification> findByDoctorUserEmailAndNotification_Status(String email, String status);

    @Transactional
    @Modifying
    @Query("UPDATE Notification n SET n.Notification_Status = 'Completed' WHERE n.doctor.doctorId = :doctorId AND n.Notification_Status = 'Pending'")
    void updateStatusForDoctor(UUID doctorId);

    @Transactional
    @Modifying
    @Query("UPDATE Notification n SET n.Notification_Status = 'Completed' WHERE n.patient.patientId = :patientId AND n.Notification_Status = 'Pending'")
    void updateStatusForPatient(UUID patientId);
}