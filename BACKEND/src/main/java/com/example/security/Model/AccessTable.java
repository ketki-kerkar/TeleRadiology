package com.example.security.Model;

import com.example.security.Model.Actors.Doctor;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="accesstable")
public class AccessTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="accessId" , nullable = false)
    private Long accessId ;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "case_id", nullable = false)
    private Case cases;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="timestampAccepted",nullable = false , updatable = false)
    private Date timestampAccepted ;

}