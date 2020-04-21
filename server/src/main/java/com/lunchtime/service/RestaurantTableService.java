package com.lunchtime.service;

import com.lunchtime.models.RestaurantTable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface RestaurantTableService {

    RestaurantTable saveTable(RestaurantTable restaurant);

    Page<RestaurantTable> getAllTables(Pageable pageable);

    Optional<RestaurantTable> getTableById(Long id);

    Page<RestaurantTable> getAllTablesByRestaurantId(Pageable pageable, Long id);

    List<RestaurantTable> getAllAvailableTablesByRestaurantId(Long id, Date startTime, Date finisTime);

    RestaurantTable deleteTable(Long id);
}
