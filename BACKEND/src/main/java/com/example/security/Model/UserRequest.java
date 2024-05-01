package com.example.security.Model;
import com.example.security.Model.Actors.Patient;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "User_Requests")
public class UserRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "request_id", nullable = false, updatable = false)
    private Long requestId;

    @Column(name = "request_type", nullable = false)
    private String requestType;

    @Column(name = "request_content")
    private String requestContent;

    @Column(name = "request_status")
    private boolean requestStatus;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "request_date", nullable = false)
    private Date requestDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @Transient
    private String patientEmail;

    public String getPatientEmail() {
        return this.patient.getUser().getEmail();
    }
}
