package com.example.security.services.admin;

import com.example.security.Repositories.DoctorRepo;
import com.example.security.Repositories.HospitalHandleRepo;
import com.example.security.Repositories.LabRepo;
import com.example.security.Model.Actors.Doctor;
import com.example.security.Model.Actors.HospitalHandle;
import com.example.security.Model.Actors.Lab;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FindUser {
    private final HospitalHandleRepo hospitalHandleRepo;
    private final DoctorRepo doctorRepo;
    private final LabRepo labRepo;


    public ResponseEntity<String> getHospitalNameAndId(Long hospitalId) {
        Optional<HospitalHandle> hospitalHandleOptional = hospitalHandleRepo.findById(hospitalId);
        if (hospitalHandleOptional.isPresent()) {
            HospitalHandle hospitalHandle = hospitalHandleOptional.get();
            return ResponseEntity.ok("Hospital ID: " + hospitalHandle.getHospitalId() + ", Hospital Name: " + hospitalHandle.getHospitalName());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("The HospitalId does not Exist");
        }
    }

    public ResponseEntity<String> getLabNameAndId(Long labId) {
        Optional<Lab> labOptional = labRepo.findById(labId);
        if (labOptional.isPresent()) {
            Lab lab = labOptional.get();
            return ResponseEntity.ok("Lab ID: " + lab.getLabId() + ", Lab Name: " + lab.getLabName());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("The LabId does not Exist");
        }
    }

   /* public ResponseEntity<String> getDoctorNameAndId(Long doctorId) {
        Optional<Doctor> doctorOptional = doctorRepo.findById(doctorId);
        if (doctorOptional.isPresent()) {
            Doctor doctor = doctorOptional.get();
            return ResponseEntity.ok("Doctor ID: " + doctor.getDoctorId() + ", Doctor Name: " + doctor.getDName() + ", Doctor Type:" + doctor.getDType() + ", Qualification: " + doctor.getQualification()+ ",Department:" + doctor.getDepartment()+ ",Hospital Name" + doctor.getHospitalId());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("The DoctorId does not Exist");
        }
    }*/
   public ResponseEntity<String> getDoctorNameAndId(Long doctorId) {
       Optional<Doctor> doctorOptional = doctorRepo.findById(doctorId);
       if (doctorOptional.isPresent()) {
           Doctor doctor = doctorOptional.get();
           HospitalHandle hospitalHandle = doctor.getHospital();
           if (hospitalHandle != null) {
               return ResponseEntity.ok("Doctor ID: " + doctor.getDoctorId() +
                       ", Doctor Name: " + doctor.getDName() +
                       ", Doctor Type: " + doctor.getDType() +
                       ", Qualification: " + doctor.getQualification() +
                       ", Department: " + doctor.getDepartment() +
                       ", Hospital Name: " + hospitalHandle.getHospitalName());
           } else {
               return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Hospital associated with Doctor ID not found");
           }
       } else {
           return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Doctor ID not found");
       }
   }
}