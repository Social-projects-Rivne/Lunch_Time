package com.lunchtime.service.implementation;

import com.lunchtime.models.Order;
import com.lunchtime.models.RestaurantTable;
import com.lunchtime.repository.OrderRepository;
import com.lunchtime.repository.RestaurantTableRepository;
import com.lunchtime.service.RestaurantService;
import com.lunchtime.service.RestaurantTableService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RestaurantTableServiceImplement implements RestaurantTableService {

    private final RestaurantTableRepository restaurantTableRepository;
    private final RestaurantService restaurantService;
    private final OrderRepository orderRepository;

    public RestaurantTableServiceImplement(
        RestaurantTableRepository restaurantTableRepository,
        RestaurantService restaurantService,
        OrderRepository orderRepository) {
        this.restaurantTableRepository = restaurantTableRepository;
        this.restaurantService = restaurantService;
        this.orderRepository = orderRepository;
    }

    public RestaurantTable save(RestaurantTable restaurantTable) {
        List<RestaurantTable> restaurantTables = restaurantTableRepository
            .findByRestaurantId(restaurantTable.getRestaurant().getId());
        for (RestaurantTable table: restaurantTables) {
            if (table.getNumber().equals(restaurantTable.getNumber())) {
                return null;
            }
        }
        return restaurantService.findById(restaurantTable.getRestaurant().getId())
            .map(restaurant -> {
                restaurantTable.setRestaurant(restaurant);
                return restaurantTableRepository.save(restaurantTable);
            })
            .orElseGet(null);
    }

    public Page<RestaurantTable> findAll(Pageable pageable) {
        return restaurantTableRepository.findAll(pageable);
    }

    public Optional<RestaurantTable> findById(Long id) {
        return restaurantTableRepository.findById(id);
    }

    public Page<RestaurantTable> findAllByRestaurantId(Pageable pageable, Long id) {
        return restaurantTableRepository.findByRestaurantId(pageable, id);
    }

    public List<RestaurantTable> findAllAvailableTablesByRestaurantId(Long id, Date startTime, Date finisTime) {
        List<Order> orders = orderRepository.findAllOrdersByRestaurantIdInTime(id, startTime, finisTime);
        List<RestaurantTable> tables = restaurantTableRepository.findByRestaurantId(id);
        return tables.stream()
            .filter(table -> (
                orders.stream()
                    .filter(o -> o.getTable().getId().equals(table.getId()))
                    .count()) < 1)
                    .collect(Collectors.toList());
    }

    public RestaurantTable delete(Long id) {
        return findById(id)
            .map(table -> {
                table.setDeleted(true);
                return restaurantTableRepository.save(table);
            })
            .orElseGet(null);
    }
}