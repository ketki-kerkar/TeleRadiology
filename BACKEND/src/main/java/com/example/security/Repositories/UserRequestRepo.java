package com.example.security.Repositories;

import com.example.security.Model.UserRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRequestRepo extends JpaRepository<UserRequest, Long> {

}
