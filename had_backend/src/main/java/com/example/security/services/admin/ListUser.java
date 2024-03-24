
package com.example.security.services.admin;

import com.example.security.Repositories.DoctorRepo;
import com.example.security.Repositories.HospitalHandleRepo;
import com.example.security.Repositories.LabRepo;
import com.example.security.Model.Actors.Doctor;
import com.example.security.Model.Actors.HospitalHandle;
import com.example.security.Model.Actors.Lab;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ListUser {

    @Autowired
    private HospitalHandleRepo hospitalHandleRepo;
    @Autowired
    private LabRepo labRepo ;
    @Autowired
    private DoctorRepo doctorRepo ;

    public List<HospitalHandle> getAllHospitalHandles() {
        return hospitalHandleRepo.findAll();
    }

    public List<Lab> getAllLab() {
        return labRepo.findAll();
    }

    public List<Doctor> getAllDoctor() {
        return doctorRepo.findAll();
    }
}
