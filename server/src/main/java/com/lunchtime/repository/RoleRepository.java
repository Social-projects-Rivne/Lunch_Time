package com.lunchtime.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lunchtime.models.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String name);
}
