package com.example.security.Repositories;

import com.example.security.Model.Actors.Lab;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface LabRepo extends JpaRepository<Lab,Long > {
    List<Lab> findAll();
    List<Lab> findByUserUserId(UUID userId);
    Optional<Lab> findByUserEmail(String userEmail);
    @Query("SELECT lab FROM Lab lab WHERE lab.user.userId = :userId")
    Optional<Lab> findByUUId(UUID userId);

    @Query("SELECT l FROM Lab l WHERE l.user.email = :email")
    Optional<Lab> findByLabEmail(@Param("email") String email);

}
