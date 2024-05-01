package com.example.security.Repositories;

import com.example.security.Model.Actors.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;
import java.util.Optional;

public interface DoctorRepo extends JpaRepository<Doctor,Long > {
    List<Doctor> findAll();

    Optional<Doctor> findByUserUserId(UUID userId);

    Optional<Doctor> findByUserEmail(String email);

    List<Doctor> findByHospitalHospitalName(String hospitalName);
    @Query("SELECT d FROM Doctor d WHERE d.user.email = :email")
    Optional<Doctor> findByDoctorEmail(String email);


}
