package com.lunchtime.repository;

import com.lunchtime.models.Restaurant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    Page<Restaurant> findByIsDeletedFalse(Pageable pageable);

    Optional<Restaurant> findByIdAndIsDeletedFalse(Long id);

    Page<Restaurant> findByPersonIdAndIsDeletedFalse(Long id, Pageable pageable);
}
