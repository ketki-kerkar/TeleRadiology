package com.example.security.Repositories;
import com.example.security.DTOs.PatientDTO;
import com.example.security.Model.Actors.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PatientRepo extends JpaRepository<Patient, Long> {
    List<Patient> findAll();
    Optional<Patient> findByUserEmail(String emailId);

    Optional<Patient> findByUser_Email(String email);

    Optional<Patient> findByUserUserId(UUID userId);

    @Query("SELECT patient FROM Patient patient WHERE patient.user.userId = :userId")
    Optional<Patient> findByUUId(UUID userId);
}