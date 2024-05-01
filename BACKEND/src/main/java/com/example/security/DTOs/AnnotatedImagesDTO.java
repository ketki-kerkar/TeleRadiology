package com.example.security.DTOs;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnnotatedImagesDTO {
    private String annotatedImageBase64;
    private Long annotatorId;
    private String finalRemarks;
}
