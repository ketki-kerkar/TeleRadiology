package com.example.security.Repositories;

import com.example.security.Model.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InvitationRepo extends JpaRepository<Invitation,Long> {
    List<Invitation> findByReceiverEmail(String receiverEmail);
}