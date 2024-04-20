package com.example.security.Model;

import com.example.security.Model.Actors.Doctor;
import com.example.security.Model.Actors.Patient;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name="invitation")
public class Invitation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "invitation_id", nullable = false, updatable = false)
    private Long invitationId;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "Time_of_received", nullable = false, updatable = false)
    private Date TimestampReceived;

    @Column(name="invitationStatus")
    private String InvitationStatus = "Pending";

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "Time_of_accepted", nullable = false)
    private Date TimestampAccepted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id")
    private Doctor doctor ;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "case_id")
    private Case cases ;

    @Column(name="receiver_email")
    private String receiverEmail ;
}