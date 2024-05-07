package com.example.security.Repositories;

import com.example.security.Model.Messages;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Timestamp;

public interface MessageRepo extends JpaRepository<Messages, Long> {
    Page<Messages> findAllByTimestampAfterOrderByTimestampAsc(Timestamp timestamp, Pageable pageable);
}
