package com.involveininnovation.chat.repository;

import com.involveininnovation.chat.model.MessageEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;

@Repository
public interface MessageRepository extends JpaRepository<MessageEntity, Long> {
    Page<MessageEntity> findAllByTimestampAfterOrderByTimestampAsc(Timestamp timestamp, Pageable pageable);
}
