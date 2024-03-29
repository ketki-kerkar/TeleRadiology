package com.example.security.Repositories;

import com.example.security.Model.Actors.HospitalHandle;
import com.example.security.Model.Actors.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface HospitalHandleRepo extends JpaRepository<HospitalHandle,Long > {
    Optional<HospitalHandle> findByHospitalName(String hospitalName);
    List<HospitalHandle> findAll();
}
