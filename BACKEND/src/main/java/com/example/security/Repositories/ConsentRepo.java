package com.example.security.Repositories;

import com.example.security.Model.Consent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConsentRepo extends JpaRepository<Consent,Long> {
    Consent findByPatient_PatientIdAndConsentStatus(Long patientId, String consentStatus);

}