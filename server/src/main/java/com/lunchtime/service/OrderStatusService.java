package com.lunchtime.service;

import com.lunchtime.models.OrderStatus;

import java.util.List;
import java.util.Optional;

public interface OrderStatusService {
    OrderStatus save(OrderStatus orderStatus);

    Optional<OrderStatus> findById(Long id);

    List<OrderStatus> findAll();

    OrderStatus delete(Long id);
}
