package com.lunchtime.service;

import com.lunchtime.models.OrderStatus;

import java.util.List;
import java.util.Optional;

public interface OrderStatusService {
    OrderStatus saveOrderStatus(OrderStatus orderStatus);

    Optional<OrderStatus> getOrderStatusById(Long id);

    List<OrderStatus> getAllOrderStatuses();

    OrderStatus deleteOrderStatus(Long id);

    Optional<OrderStatus> getOrderStatusByName(String name);
}
