package com.example.security.Model;

import com.example.security.Model.Actors.Doctor;
import com.example.security.Model.Actors.Patient;
import com.example.security.converter.LongListConverter;
import lombok.*;
import jakarta.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "Cases")
public class Case {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "case_id", nullable = false, updatable = false)
    private Long caseId;

    @Column(name = "case_summary",columnDefinition = "TEXT")
    private String caseSummary;

    @Column(name = "case_status", nullable = false)
    private Boolean caseStatus;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "case_registration_date", nullable = false, updatable = false)
    private Date caseRegistrationDate;

    @Column(name = "diagnosis_report", columnDefinition = "TEXT")
    private String diagnosisReportBase64;


    @Column(name = "consented_user_ids")
    @Convert(converter = LongListConverter.class)
    private List<Long> consentedUserIds;

    @Column(name = "is_severe")
    private Integer isSevere;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    @Column(name="aws_url")
    private String awsUrl;

    @OneToMany(mappedBy = "cases", cascade = CascadeType.ALL)
    private Set<AccessTable> accessTables = new HashSet<>();
}