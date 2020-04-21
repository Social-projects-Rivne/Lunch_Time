package com.lunchtime.service;

import com.lunchtime.models.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface OrderService {
    Order saveOrder(Order order);

    Page<Order> getAllOrders(Pageable pageable);

    Optional<Order> getOrderById(Long id);

    Order deleteOrder(Long id);
}
