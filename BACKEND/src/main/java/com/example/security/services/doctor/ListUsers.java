package com.example.security.services.doctor;

import com.example.security.Model.Actors.Doctor;
import com.example.security.Repositories.DoctorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ListUsers {
    @Autowired
    private DoctorRepo doctorRepo;

    public List<Doctor> getAllDoctor() {
        return doctorRepo.findAll();
    }
}
