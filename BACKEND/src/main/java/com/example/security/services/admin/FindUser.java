package com.example.security.services.admin;

import com.example.security.DTOs.*;
import com.example.security.Model.Actors.*;
import com.example.security.Repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Collections;
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
    @Autowired
    private PatientRepo patientRepo ;

    public ResponseEntity<UserDTO> findUserEntitiesByEmail(String email) {
        Optional<User> userOptional = userRepo.findByEmail(email);
        if (userOptional.isPresent()) {
            UUID userId = userOptional.get().getUserId();
            List<HospitalHandleDTO> hospitalHandles = findHospitalHandlesByUserId(userId);
            List<LabDTO> labs = findLabsByUserId(userId);
            List<DoctorDTO> doctors = findDoctorsByUserId(userId);
            List<PatientDTO> patients = findPatientsByUserId(userId);
            UserDTO userDTO = new UserDTO(email, hospitalHandles, labs, doctors, patients);
            return ResponseEntity.ok(userDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    private List<HospitalHandleDTO> findHospitalHandlesByUserId(UUID userId) {
        List<HospitalHandle> hospitalHandles = hospitalHandleRepo.findByUserUserId(userId);
        if (hospitalHandles != null) {
            return hospitalHandles.stream()
                    .map(h -> new HospitalHandleDTO(h.getHospitalName(), h.getUser().getEmail()))
                    .collect(Collectors.toList());
        }
        return Collections.emptyList();
    }

    private List<LabDTO> findLabsByUserId(UUID userId) {
        List<Lab> labs = labRepo.findByUserUserId(userId);
        if (labs != null) {
            return labs.stream()
                    .map(l -> new LabDTO(l.getLabName(), l.getUser().getEmail()))
                    .collect(Collectors.toList());
        }
        return Collections.emptyList();
    }

    private List<DoctorDTO> findDoctorsByUserId(UUID userId) {
        Optional<Doctor> doctors = doctorRepo.findByUserUserId(userId);
        if (doctors != null) {
            return doctors.stream()
                    .map(d -> new DoctorDTO(
                            d.getDName(),
                            d.getUser().getEmail(),
                            d.getDType(),
                            d.getHospital().getHospitalName(),
                            d.getDepartment(),
                            d.getQualification()))
                    .collect(Collectors.toList());
        }
        return Collections.emptyList();
    }

    private List<PatientDTO> findPatientsByUserId(UUID userId) {
        Optional<Patient> patients = patientRepo.findByUserUserId(userId);
        if (patients != null) {
            return patients.stream()
                    .map(p -> new PatientDTO(
                            p.getName(),
                            p.getUser().getEmail(),
                            p.getAge(),
                            p.getAddress(),
                            p.getContact(),
                            p.getGender(),
                            p.getDateOfRegistration()))
                    .collect(Collectors.toList());
        }
        return Collections.emptyList();
    }
}