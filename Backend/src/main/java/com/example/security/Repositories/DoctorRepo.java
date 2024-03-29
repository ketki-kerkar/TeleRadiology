package com.example.security.Repositories;

import com.example.security.Model.Actors.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DoctorRepo extends JpaRepository<Doctor,Long > {
    List<Doctor> findAll();
}
