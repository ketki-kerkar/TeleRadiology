package com.example.security.Repositories;

import com.example.security.DTOs.DoctorDTO;
import com.example.security.DTOs.HospitalHandleDTO;
import com.example.security.DTOs.LabDTO;
import com.example.security.DTOs.PatientDTO;
import com.example.security.Model.Actors.Doctor;
import lombok.Data;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;
import java.util.Optional;

public interface DoctorRepo extends JpaRepository<Doctor,Long > {
    List<Doctor> findAll();
    List<Doctor> findByUserUserId(UUID userId);
    Optional<Doctor> findByUserEmail(String email);
    List<Doctor> findByHospitalHospitalName(String hospitalName);

    @Data
    class UserDTO {
        private String email;
        private List<HospitalHandleDTO> hospitalHandles;
        private List<LabDTO> labs;
        private List<DoctorDTO> doctors;
        private List<PatientDTO> patients;

        public UserDTO(String email, List<HospitalHandleDTO> hospitalHandles, List<LabDTO> labs, List<DoctorDTO> doctors, List<PatientDTO> patients) {
            this.email = email;
            if (hospitalHandles != null && !hospitalHandles.isEmpty()) {
                this.hospitalHandles = hospitalHandles;
            }
            if (labs != null && !labs.isEmpty()) {
                this.labs = labs;
            }
            if (doctors != null && !doctors.isEmpty()) {
                this.doctors = doctors;
            }
            if (patients != null && !patients.isEmpty()) {
                this.patients = patients;
            }
        }
    }
}
