package com.example.security.Repositories;

import com.example.security.Model.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TokenRepo extends JpaRepository<Token, Integer> {
    @Query("""
    select t from Token t inner join User u on t.user.userId = u.userId
    where u.userId = :userId and (t.expired=false and t.revoked=false)
""")
    List<Token> findAllValidTokensByUser(UUID userId);

    Optional<Token> findByToken(String token);
}