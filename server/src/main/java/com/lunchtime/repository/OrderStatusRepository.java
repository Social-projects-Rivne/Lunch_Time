package com.lunchtime.repository;

import com.lunchtime.models.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderStatusRepository extends JpaRepository<OrderStatus, Long> {

    @Query("select s from OrderStatus s where s.isDeleted = false and s.name = :name")
    Optional<OrderStatus> findByName(String name);

    @Override
    @Query("select s from OrderStatus s where s.isDeleted = false")
    List<OrderStatus> findAll();

    @Override
    @Query("select s from OrderStatus s where s.isDeleted = false and s.id = :id")
    Optional<OrderStatus> findById(Long id);
}
