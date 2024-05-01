package com.example.security.Repositories;


import com.example.security.Model.AnnotatedImages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AnnotatedImagesRepo extends JpaRepository<AnnotatedImages,Long> {
    //Query to find list of all annotated images for a particular case
    @Query("SELECT ai FROM AnnotatedImages ai WHERE ai.cases.caseId = :caseId")
    List<AnnotatedImages> findAllByCaseId(Long caseId);
}
