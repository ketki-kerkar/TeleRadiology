package com.example.security.services.doctor;

import com.example.security.DTOs.Requests.SeverityRequest;
import com.example.security.Model.Case;
import com.example.security.Repositories.CaseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class SeverityService {
    @Autowired
    private CaseRepo caseRepo;
    public ResponseEntity<String> addSeverity(SeverityRequest request) {
        Optional<Case> caseOptional = caseRepo.findById(request.getCaseId());
        if (caseOptional.isPresent()) {
            Case caseObj = caseOptional.get();
            caseObj.setIsSevere(request.getIsSevere());
            caseRepo.save(caseObj);
            return ResponseEntity.ok("Case severity added successfully");
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Case not found");
    }

    public ResponseEntity<Integer> getSeverity(Long caseId){
        Optional<Case> caseOptional = caseRepo.findById(caseId);
        if (caseOptional.isPresent()){
            Case caseObj = caseOptional.get();
            Integer severity =caseObj.getIsSevere();
            return ResponseEntity.ok(severity);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
}
