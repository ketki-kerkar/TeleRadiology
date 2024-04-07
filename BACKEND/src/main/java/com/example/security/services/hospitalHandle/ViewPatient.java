package com.example.security.services.hospitalHandle;

import com.example.security.Model.Actors.Patient;
import com.example.security.Repositories.PatientRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ViewPatient {

    @Autowired
    private PatientRepo patientRepo;

    public List<Patient> getAllPatient() {
        return patientRepo.findAll();
    }
}