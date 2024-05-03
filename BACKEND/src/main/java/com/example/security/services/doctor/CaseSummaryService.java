package com.example.security.services.doctor;

import com.example.security.DTOs.Requests.CaseSummaryRequest;
import com.example.security.Model.Case;
import com.example.security.Repositories.CaseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CaseSummaryService {
    @Autowired
    private CaseRepo caseRepo;
    public ResponseEntity<String> addcaseSummary(CaseSummaryRequest request){
        Optional<Case> caseOptional= caseRepo.findById(request.getCaseId());
        if(caseOptional.isPresent()){
            Case caseObj= caseOptional.get();
            caseObj.setCaseSummary(request.getCaseSummary());
            caseRepo.save(caseObj);
        return ResponseEntity.ok("Case summary added successfully");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Case summary not added");

    }
    public ResponseEntity<String> getCaseSummary(Long caseId){
        Optional<Case> caseOptional=caseRepo.findById(caseId);
        if (caseOptional.isPresent()){
            Case caseObj=caseOptional.get();
            String caseSummary= caseObj.getCaseSummary();
            return ResponseEntity.ok(caseSummary);
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Case not found");
    }
}
