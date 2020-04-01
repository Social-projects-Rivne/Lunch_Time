package com.lunchtime.service;

import com.lunchtime.models.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface OrderService {
    Order save(Order order);

    Page<Order> findAll(Pageable pageable);

    Optional<Order> findById(Long id);

    Order delete(Long id);
}
