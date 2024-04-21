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
@Table(name="notification")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id", nullable = false, updatable = false)
    private Long notificationId;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "Time_of_sent", nullable = false, updatable = false)
    private Date Timestamp;

    @Column(name="Notification_Status")
    private String Notification_Status = "Pending";

    @Column(name="messageText")
    private String MessageText;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @Column(name = "receiver_type")
    private char receiverType;

    public void setReceiverType(char receiverType) {
        this.receiverType = receiverType;
        if (receiverType == 'd') {
            this.patient = null;
        } else if (receiverType == 'p') {
            this.doctor = null;
        } else {
            throw new IllegalArgumentException("Invalid receiver type: " + receiverType);
        }
    }


}
