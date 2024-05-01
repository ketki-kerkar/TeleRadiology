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
import com.example.security.converter.ListConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.example.security.converter.LongListConverter;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
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
        Optional<Case> caseOptional= caseRepo.findById(request.getCaseId());
        if(caseOptional.isPresent()){
            Case caseObj=caseOptional.get();
            Doctor doctor=caseObj.getDoctor();
            Patient patient=caseObj.getPatient();
            List<Long> radiologistIds = new ArrayList<>();
            ListConverter converter = new ListConverter();
            List<String> listRadiologist=request.getListOfRadiologistId();
            for (String radiologistId : listRadiologist) {
                System.out.println(radiologistId);
                Optional<Doctor> optionalDoctor=doctorRepo.findByDoctorEmail(radiologistId);
                if(optionalDoctor.isPresent()) {
                    Doctor doctor1 = optionalDoctor.get();
                    radiologistIds.add(doctor1.getDoctorId());
                }

            }
            String listofRadiologist= converter.convertToDatabaseColumn(radiologistIds); ;

            Consent consent = Consent.builder().
                    consentStatus("pending").
                    doctor(doctor).
                    cases(caseObj).
                    patient(patient).
                    listOfRadiologistId(listofRadiologist).
                    timestampReceived(new Timestamp(System.currentTimeMillis())).
                    build();
            consentRepo.save(consent);
            return ResponseEntity.ok("Consent sent successfully");
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Case not found");


    }
}