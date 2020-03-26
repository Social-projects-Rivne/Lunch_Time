package com.lunchtime.repository;

import com.lunchtime.models.RestaurantTable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RestaurantTableRepository extends JpaRepository<RestaurantTable, Long> {
    List<RestaurantTable> findByRestaurantId(Long id);
}
