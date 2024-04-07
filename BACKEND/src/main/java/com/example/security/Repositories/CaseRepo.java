package com.example.security.Repositories;
import com.example.security.Model.Case;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface CaseRepo extends JpaRepository<Case, Long> {
}