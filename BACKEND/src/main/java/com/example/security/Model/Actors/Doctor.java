package com.example.security.Model.Actors;

import com.example.security.Model.AccessTable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Doctor")
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "doctor_id", nullable = false, updatable = false)
    private Long doctorId;

    @Column(name = "dType", nullable = false)
    private String dType;

    @Column(name = "dName", nullable = false)
    private String dName;

    @Column(name = "gender", nullable = false)
    private String gender;

    @Column(name = "qualification", nullable = false)
    private String qualification;

    @Column(name = "department", nullable = false)
    private String department;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospitalId", nullable = false)
    private HospitalHandle hospital;

    @OneToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @OneToMany(mappedBy = "doctor")
    private Set<AccessTable> accessTables = new HashSet<>();
}
