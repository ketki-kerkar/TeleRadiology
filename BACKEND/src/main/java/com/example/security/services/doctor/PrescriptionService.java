package com.example.security.services.doctor;

import com.example.security.DTOs.Requests.PrescriptionRequest;
import com.example.security.Model.Case;
import com.example.security.Model.Prescription;
import com.example.security.Repositories.CaseRepo;
import com.example.security.Repositories.PrescriptionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PrescriptionService {
    @Autowired
    private PrescriptionRepo prescriptionRepo;
    @Autowired
    private CaseRepo caseRepo;


    public ResponseEntity<String> addPrescription(PrescriptionRequest request){
        Optional<Case> caseOptional= caseRepo.findById(request.getCaseId());
        if(caseOptional.isPresent()){
             Case caseObj=caseOptional.get();
             Prescription prescription=Prescription.builder().
                    cases(caseObj).
                    prescriptionTests(request.getPrescriptionTests()).
                    build();
             prescriptionRepo.save(prescription);
            return ResponseEntity.ok("Prescription added successfully");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Not added");
    }

    public String getPrescription(Long caseId){

        Optional<Case> caseOptional = caseRepo.findById(caseId);
        if(caseOptional.isPresent()){
            Case caseObj = caseOptional.get();

            // Retrieve prescription associated with the case
            Prescription prescription = prescriptionRepo.findByCaseId(caseObj.getCaseId());
            String prescribedTest=prescription.getPrescriptionTests();
            return prescribedTest; // Assuming this is how you get prescription tests

        }
        return "Case not found";
    }

}
