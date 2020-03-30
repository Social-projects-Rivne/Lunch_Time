package com.lunchtime.service;

import com.lunchtime.models.OrderedTableStatus;

import java.util.List;
import java.util.Optional;

public interface OrderedTableStatusService {
    OrderedTableStatus save(OrderedTableStatus orderedTableStatus);

    Optional<OrderedTableStatus> findById(Long id);

    List<OrderedTableStatus> findAll();

    OrderedTableStatus delete(Long id);
}
