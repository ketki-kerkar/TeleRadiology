package com.example.security.services.hospitalHandle;

import com.example.security.Model.Actors.Doctor;
import com.example.security.Model.Actors.HospitalHandle;
import com.example.security.Repositories.DoctorRepo;
import com.example.security.Repositories.HospitalHandleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ListDoctor {

    @Autowired
    private HospitalHandleRepo hospitalHandleRepo;
    @Autowired
    private DoctorRepo doctorRepo;
    public ListDoctor() {
    }

    public List<Doctor> getDoctorsByHospital(String userEmail) {
        Optional<HospitalHandle> hospitalHandleOptional = hospitalHandleRepo.findByUserEmail(userEmail);
        if (hospitalHandleOptional.isPresent()) {
            HospitalHandle hospitalHandle = hospitalHandleOptional.get();
            String hospitalName = hospitalHandle.getHospitalName();

            // Retrieve all doctors from the specified hospital
            List<Doctor> doctors = doctorRepo.findByHospitalHospitalName(hospitalName);

            // Filter out doctors with type "R"
            doctors.removeIf(doctor -> "R".equals(doctor.getDType()));

            return doctors;
        } else {
            return Collections.emptyList();
        }
    }
}