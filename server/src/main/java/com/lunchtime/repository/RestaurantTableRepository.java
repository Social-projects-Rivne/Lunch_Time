package com.lunchtime.repository;

import com.lunchtime.models.RestaurantTable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RestaurantTableRepository extends JpaRepository<RestaurantTable, Long> {
    @Query("select t from RestaurantTable t where t.isDeleted = false and t.restaurant.id = :id")
    Page<RestaurantTable> findByRestaurantId(Pageable pageable, Long id);

    @Query("select t from RestaurantTable t where t.isDeleted = false and t.restaurant.id = :id")
    List<RestaurantTable> findByRestaurantId(Long id);

    @Override
    @Query("select t from RestaurantTable t where t.isDeleted = false")
    List<RestaurantTable> findAll();

    @Override
    @Query("select t from RestaurantTable t where t.isDeleted = false and t.id = :id")
    Optional<RestaurantTable> findById(Long id);
}
