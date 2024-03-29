package com.example.security.Model.Actors;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Lab")
public class Lab {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "lab_id", nullable = false, updatable = false)
    private Long labId;

    @Column(name = "lab_name", nullable = false)
    private String labName;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}