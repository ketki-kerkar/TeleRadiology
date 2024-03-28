package com.example.security.Repositories;

import com.example.security.Model.Actors.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepo extends JpaRepository<Role, Long> { // Assuming Role entity has a Long primary key
    Optional<Role> findByRoleName(String roleName);
}
