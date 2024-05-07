package com.example.security.Model;

import com.example.security.Model.Actors.Doctor;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Entity
@Table(name = "messages")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Messages {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id")
    private Long messageId;

    @ManyToOne // Many messages belong to One user
    @JoinColumn(name = "sender_id", nullable = false)
    private Doctor doctor;

    @ManyToOne(fetch = FetchType.LAZY) // Many messages belong to One case
    @JoinColumn(name = "case_id", nullable = false)
    private Case cases;

    @Column(name = "message_text", nullable = false)
    private String messageText;

    @Column(name = "timestamp", nullable = false)
    private Timestamp timestamp;
}
