package com.example.security.Model;

import com.example.security.Model.Actors.Doctor;
import com.example.security.Model.Actors.Patient;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name="consent")
public class Consent {
    @Id
    @Column(name="consent_id",nullable = false,updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long consentId;

    @Column(name = "consent_status", nullable = false)
    private String consentStatus;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "timestamp_accepted")
    private Timestamp timestampAccepted;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "timestamp_received")
    private Timestamp timestampReceived;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "radiologist_id", nullable = true)
    private Doctor radiologist;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "case_id", nullable = false)
    private Case cases;

   /* @Column
    @ElementCollection//Annotation used in JPA to map collection of elements to a database table
    private List<Long> listOfRadiologistId;*/

    @Column
    private String listOfRadiologistId;



}