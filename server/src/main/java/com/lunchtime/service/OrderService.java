package com.lunchtime.service;

import com.lunchtime.models.Order;
import com.lunchtime.service.dto.OrderDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.IOException;
import java.util.Optional;

public interface OrderService {
    OrderDto saveOrder(OrderDto orderDto) throws IOException;

    Page<Order> getAllOrders(Pageable pageable);

    Optional<Order> getOrderById(Long id);

    Order deleteOrder(Long id);
}
