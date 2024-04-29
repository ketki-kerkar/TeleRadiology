package com.example.security.Repositories;

import com.example.security.Model.Actors.HospitalHandle;
import com.example.security.Model.Actors.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface HospitalHandleRepo extends JpaRepository<HospitalHandle,Long > {
    Optional<HospitalHandle> findByHospitalName(String hospitalName);
    List<HospitalHandle> findAll();
    List<HospitalHandle> findByUserUserId(UUID userId);
    Optional<HospitalHandle> findByUserEmail(String userEmail);
    @Query("SELECT hospitalHandle FROM HospitalHandle hospitalHandle WHERE hospitalHandle.user.userId = :userId")
    Optional<HospitalHandle> findByUUId(UUID userId);
}
