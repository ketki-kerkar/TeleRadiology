package com.example.security.Model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "AnnotatedImages")
public class AnnotatedImages {
    //Class for storing annotated images
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "annotated_image_id", nullable = false, updatable = false)
    private Long annotatedImageId;

    @Column(name = "image_base64", columnDefinition = "TEXT")
    private String annotatedImageBase64;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "case_id", nullable = false)
    private Case cases;

    @Column(name = "annotator_id", nullable = false)
    private Long annotatorId;

    @Column(name = "final_remarks", nullable = true,columnDefinition = "TEXT")
    private String finalRemarks;


}
