package com.example.security.services.login;

import com.example.security.Repositories.RoleRepo;
import com.example.security.Model.Actors.Role;
import org.springframework.stereotype.Service;

@Service
public class RoleService {
    private final RoleRepo roleRepo;

    public RoleService(RoleRepo roleRepo) {
        this.roleRepo = roleRepo;
    }

    public Role findRoleByName(String roleName) {
        return roleRepo.findByRoleName(roleName)
                .orElseThrow(() -> new RuntimeException("Role not found"));
    }
}
