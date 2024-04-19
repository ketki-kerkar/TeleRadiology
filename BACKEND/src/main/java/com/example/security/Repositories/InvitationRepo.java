package com.example.security.Repositories;

import com.example.security.Model.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvitationRepo extends JpaRepository<Invitation,Long> {
}
