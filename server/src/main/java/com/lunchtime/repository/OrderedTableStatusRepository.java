package com.lunchtime.repository;

import com.lunchtime.models.OrderedTableStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderedTableStatusRepository extends JpaRepository<OrderedTableStatus, Long> {
}
