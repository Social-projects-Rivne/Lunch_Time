package com.lunchtime.repository;

import com.lunchtime.models.RestaurantImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RestaurantImageRepository extends JpaRepository<RestaurantImage, Long> {
    @Query("select i from RestaurantImage i "
        + "where i.restaurantId in :restaurantId "
        + "and i.isDeleted = false")
    RestaurantImage findImageByRestaurantId(Long restaurantId);

    List<RestaurantImage> findAllByRestaurantId(Long restaurantId);
}
