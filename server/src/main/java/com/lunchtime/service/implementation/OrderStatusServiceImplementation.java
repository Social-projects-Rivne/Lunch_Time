package com.lunchtime.service.implementation;

import com.lunchtime.models.OrderStatus;
import com.lunchtime.repository.OrderStatusRepository;
import com.lunchtime.service.OrderStatusService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderStatusServiceImplementation implements OrderStatusService {

    private final OrderStatusRepository orderStatusRepository;

    public OrderStatusServiceImplementation(OrderStatusRepository orderStatusRepository) {
        this.orderStatusRepository = orderStatusRepository;
    }

    public OrderStatus save(OrderStatus orderStatus) {
        return orderStatusRepository.save(orderStatus);
    }

    public Optional<OrderStatus> findById(Long id) {
        return orderStatusRepository.findById(id);
    }

    public List<OrderStatus> findAll() {
        return orderStatusRepository.findAll();
    }

    public OrderStatus delete(Long id) {
        return findById(id)
            .map(status -> {
                status.setDeleted(true);
                return save(status);
            })
            .orElseGet(null);
    }
}
