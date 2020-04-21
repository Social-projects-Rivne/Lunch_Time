package com.lunchtime.service.impl;

import com.lunchtime.models.Order;
import com.lunchtime.models.RestaurantTable;
import com.lunchtime.repository.OrderRepository;
import com.lunchtime.repository.RestaurantTableRepository;
import com.lunchtime.service.RestaurantService;
import com.lunchtime.service.RestaurantTableService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class RestaurantTableServiceImpl implements RestaurantTableService {

    private final RestaurantTableRepository restaurantTableRepository;
    private final RestaurantService restaurantService;
    private final OrderRepository orderRepository;

    public RestaurantTable saveTable(RestaurantTable restaurantTable) {
        List<RestaurantTable> restaurantTables = restaurantTableRepository
            .findByRestaurantId(restaurantTable.getRestaurant().getId());
        for (RestaurantTable table: restaurantTables) {
            if (table.getNumber().equals(restaurantTable.getNumber())) {
                return null;
            }
        }
        return restaurantService.getRestaurantById(restaurantTable.getRestaurant().getId())
            .map(restaurant -> {
                restaurantTable.setRestaurant(restaurant);
                return restaurantTableRepository.save(restaurantTable);
            })
            .orElse(null);
    }

    public Page<RestaurantTable> getAllTables(Pageable pageable) {
        return restaurantTableRepository.findAll(pageable);
    }

    public Optional<RestaurantTable> getTableById(Long id) {
        return restaurantTableRepository.findById(id);
    }

    public Page<RestaurantTable> getAllTablesByRestaurantId(Pageable pageable, Long id) {
        return restaurantTableRepository.findByRestaurantId(pageable, id);
    }

    public List<RestaurantTable> getAllAvailableTablesByRestaurantId(Long id, Date startTime, Date finisTime) {
        List<Order> orders = orderRepository.findAllOrdersByRestaurantIdInTime(id, startTime, finisTime);
        List<RestaurantTable> tables = restaurantTableRepository.findByRestaurantId(id);
        return tables.stream()
            .filter(table -> (
                orders.stream()
                    .filter(o -> o.getTable().getId().equals(table.getId()))
                    .count()) < 1)
                    .collect(Collectors.toList());
    }

    public RestaurantTable deleteTable(Long id) {
        return getTableById(id)
            .map(table -> {
                table.setDeleted(true);
                return restaurantTableRepository.save(table);
            })
            .orElse(null);
    }
}
