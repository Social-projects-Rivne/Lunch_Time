package com.lunchtime.repository;

import com.lunchtime.models.RestaurantTable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RestaurantTableRepository extends JpaRepository<RestaurantTable, Long> {
    Page<RestaurantTable> findByRestaurantId(Pageable pageable, Long id);

    List<RestaurantTable> findByRestaurantId(Long id);
}
