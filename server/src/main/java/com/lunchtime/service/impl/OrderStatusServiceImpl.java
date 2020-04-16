package com.lunchtime.service.impl;

import com.lunchtime.models.OrderStatus;
import com.lunchtime.repository.OrderStatusRepository;
import com.lunchtime.service.OrderStatusService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderStatusServiceImpl implements OrderStatusService {

    private final OrderStatusRepository orderStatusRepository;

    public OrderStatusServiceImpl(OrderStatusRepository orderStatusRepository) {
        this.orderStatusRepository = orderStatusRepository;
    }

    public OrderStatus saveOrderStatus(OrderStatus orderStatus) {
        return orderStatusRepository.save(orderStatus);
    }

    public Optional<OrderStatus> getOrderStatusById(Long id) {
        return orderStatusRepository.findById(id);
    }

    public List<OrderStatus> getAllOrderStatuses() {
        return orderStatusRepository.findAll();
    }

    public OrderStatus deleteOrderStatus(Long id) {
        return getOrderStatusById(id)
            .map(status -> {
                status.setDeleted(true);
                return orderStatusRepository.save(status);
            })
            .orElseGet(null);
    }

    public Optional<OrderStatus> getOrderStatusByName(String name) {
        return orderStatusRepository.findByName(name);
    }
}
