package com.example.security.Repositories;

import com.example.security.Model.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrescriptionRepo extends JpaRepository<Prescription,Long> {

}
