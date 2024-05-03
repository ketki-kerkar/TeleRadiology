package com.example.security.services.doctor;

import com.example.security.Model.Case;
import com.example.security.Repositories.CaseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GetJsonUrlService {
    @Autowired
    private CaseRepo caseRepo;

    public ResponseEntity<String> getUrl(Long caseId){
        Optional<Case> case1=caseRepo.findById(caseId);
        if (case1.isPresent()){
            Case caseObj=case1.get();
            String url =caseObj.getAwsUrl();
            return ResponseEntity.ok(url);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Case Not Found");
    }
}
