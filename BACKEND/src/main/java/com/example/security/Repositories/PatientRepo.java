package com.example.security.Repositories;
import com.example.security.Model.Actors.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientRepo extends JpaRepository<Patient, Long>{
    List<Patient> findAll();
}