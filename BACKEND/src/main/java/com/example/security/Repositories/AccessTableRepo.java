package com.example.security.Repositories;

import com.example.security.Model.AccessTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccessTableRepo extends JpaRepository<AccessTable , Long> {
    Optional<AccessTable> findByDoctorDoctorIdAndCasesCaseId(Long doctorId, Long caseId);
}
