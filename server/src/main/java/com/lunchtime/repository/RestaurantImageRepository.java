package com.lunchtime.repository;

import com.lunchtime.models.RestaurantImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RestaurantImageRepository extends JpaRepository<RestaurantImage, Long> {
    @Query("select i from RestaurantImage i "
        + "where i.restaurantId in :restaurantId")
    RestaurantImage findImageByRestaurantId(Long restaurantId);
}
