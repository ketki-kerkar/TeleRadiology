package com.example.security.Repositories;

import com.example.security.Model.Actors.Lab;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LabRepo extends JpaRepository<Lab,Long > {
    List<Lab> findAll();
}
