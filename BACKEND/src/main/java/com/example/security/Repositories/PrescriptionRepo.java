package com.example.security.Repositories;

import com.example.security.Model.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PrescriptionRepo extends JpaRepository<Prescription,Long> {
    @Query("SELECT p FROM Prescription p WHERE p.cases.caseId = ?1")
    Prescription findByCaseId(Long caseId);
}
