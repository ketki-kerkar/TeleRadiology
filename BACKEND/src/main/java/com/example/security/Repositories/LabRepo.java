package com.example.security.Repositories;

import com.example.security.Model.Actors.Lab;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface LabRepo extends JpaRepository<Lab,Long > {
    List<Lab> findAll();
    List<Lab> findByUserUserId(UUID userId);
    Optional<Lab> findByUserEmail(String userEmail);
}
