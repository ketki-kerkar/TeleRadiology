package com.example.security.services.doctor;

import com.example.security.DTOs.Requests.ConsentRequest;
import com.example.security.Model.Actors.Doctor;
import com.example.security.Model.Case;
import com.example.security.Model.Consent;
import com.example.security.Model.Actors.Patient;
import com.example.security.Repositories.CaseRepo;
import com.example.security.Repositories.ConsentRepo;
import com.example.security.Repositories.DoctorRepo;
import com.example.security.Repositories.PatientRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Optional;

@Service
public class ConsentService {
    @Autowired
    private CaseRepo caseRepo;

    @Autowired
    private PatientRepo patientRepo;

    @Autowired
    private DoctorRepo doctorRepo;

    @Autowired
    private ConsentRepo consentRepo;

    public ResponseEntity<String> askConsent(ConsentRequest request){
        Optional<Doctor> doctorOptional=doctorRepo.findById(request.getDoctorId());
        Optional<Case> caseOptional= caseRepo.findById(request.getCaseId());
        Optional<Patient> patientOptional=patientRepo.findById(request.getPatientId());

        if(doctorOptional.isPresent() && caseOptional.isPresent() && patientOptional.isPresent()) {
            Doctor doctor = doctorOptional.get();
            Case cases=caseOptional.get();
            Patient patient=patientOptional.get();


            Consent consent = Consent.builder().
                    consentStatus("pending").
                    doctor(doctor).
                    cases(cases).
                    patient(patient).
                    listOfRadiologistId(request.getListOfRadiologistId()).
                    timestampReceived(new Timestamp(System.currentTimeMillis())).
                    build();
                 consentRepo.save(consent);
            return ResponseEntity.ok("Consent sent successfully");
        }



        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }
}