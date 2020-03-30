package com.lunchtime.service.implementation;

import com.lunchtime.models.OrderedTableStatus;
import com.lunchtime.repository.OrderedTableStatusRepository;
import com.lunchtime.service.OrderedTableStatusService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderedTableStatusServiceImplementation implements OrderedTableStatusService {

    private final OrderedTableStatusRepository orderedTableStatusRepository;

    public OrderedTableStatusServiceImplementation(OrderedTableStatusRepository orderedTableStatusRepository) {
        this.orderedTableStatusRepository = orderedTableStatusRepository;
    }

    public OrderedTableStatus save(OrderedTableStatus orderedTableStatus) {
        return orderedTableStatusRepository.save(orderedTableStatus);
    }

    public Optional<OrderedTableStatus> findById(Long id) {
        return orderedTableStatusRepository.findById(id);
    }

    public List<OrderedTableStatus> findAll() {
        return orderedTableStatusRepository.findAll();
    }

    public OrderedTableStatus delete(Long id) {
        return findById(id)
            .map(status -> {
                status.setDeleted(true);
                return save(status);
            })
            .orElseGet(null);
    }
}
