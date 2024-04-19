package com.example.security.Model.Actors;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "Patient")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "patient_id", nullable = false, updatable = false)
    private Long patientId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "age", nullable = false)
    private int age;

    @Column(name = "gender", nullable = false)
    private String gender;

    @Temporal(TemporalType.DATE)
    @Column(name = "date_of_birth", nullable = false)
    private Date dateOfBirth;

    @Column(name = "blood_group", nullable = false)
    private String bloodGroup;

    @Column(name = "contact")
    private String contact;

    @Column(name = "address", nullable = false)
    private String address;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "date_of_registration", nullable = false, updatable = false)
    private Date dateOfRegistration;

    @Column(name = "history")
    private String history;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

}