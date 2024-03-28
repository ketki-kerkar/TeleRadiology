
package com.example.security.services.admin;

import com.example.security.Model.Actors.Doctor;
import com.example.security.Model.Actors.HospitalHandle;
import com.example.security.Model.Actors.Lab;
import com.example.security.Model.Actors.User;
import com.example.security.Repositories.DoctorRepo;
import com.example.security.Repositories.HospitalHandleRepo;
import com.example.security.Repositories.LabRepo;
import com.example.security.Repositories.UserRepo;
import com.example.security.auth.adminController.FindFunction.UserDTO;
import com.example.security.auth.adminController.ListFunction.DoctorDTO;
import com.example.security.auth.adminController.ListFunction.HospitalHandleDTO;
import com.example.security.auth.adminController.ListFunction.LabDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class FindUser {
    @Autowired
    private HospitalHandleRepo hospitalHandleRepo;
    @Autowired
    private UserRepo userRepo ;
    @Autowired
    private LabRepo labRepo;
    @Autowired
    private DoctorRepo doctorRepo;


    public ResponseEntity<UserDTO> findUserEntitiesByEmail(String email) {
        Optional<User> userOptional = userRepo.findByEmail(email);
        if (userOptional.isPresent()) {
            UUID userId = userOptional.get().getUserId();
           // List<HospitalHandleDTO> hospitalHandles = findHospitalHandlesByUserId(userId);
           // List<LabDTO> labs = findLabsByUserId(userId);
            List<DoctorDTO> doctors = findDoctorsByUserId(userId);
            UserDTO userDTO = new UserDTO(doctors);
            return ResponseEntity.ok(userDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    private List<HospitalHandleDTO> findHospitalHandlesByUserId(UUID userId) {
        List<HospitalHandle> hospitalHandles = hospitalHandleRepo.findByUserUserId(userId);
        return hospitalHandles.stream()
                .map(h -> new HospitalHandleDTO(h.getUser().getEmail(), h.getHospitalName()))
                .collect(Collectors.toList());
    }

    private List<LabDTO> findLabsByUserId(UUID userId) {
        List<Lab> labs = labRepo.findByUserUserId(userId);
        return labs.stream()
                .map(l -> new LabDTO(l.getUser().getEmail(), l.getLabName()))
                .collect(Collectors.toList());
    }

    private List<DoctorDTO> findDoctorsByUserId(UUID userId) {
        List<Doctor> doctors = doctorRepo.findByUserUserId(userId);
        return doctors.stream()
                .map(d -> new DoctorDTO(
                        d.getUser().getEmail(),
                        d.getDName(),
                        d.getDType(),
                        d.getDepartment(),
                        d.getQualification(),
                        d.getHospital().getHospitalName()))
                .collect(Collectors.toList());
    }

}