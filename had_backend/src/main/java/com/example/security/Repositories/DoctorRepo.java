package com.example.security.Repositories;

import com.example.security.Model.Actors.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface DoctorRepo extends JpaRepository<Doctor,Long > {
    @Query("SELECT doc, u.email FROM Doctor doc JOIN doc.user u")
    List<Doctor> findAll();
    List<Doctor> findByUserUserId(UUID userId);
}
