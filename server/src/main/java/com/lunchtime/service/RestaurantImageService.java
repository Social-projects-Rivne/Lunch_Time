package com.lunchtime.service;

import com.lunchtime.models.RestaurantImage;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface RestaurantImageService {
    List<RestaurantImage> saveImageListByRestaurantId(List<RestaurantImage> restaurantImageList);

    Optional<RestaurantImage> getImageByRestaurantId(Long restaurantId);

    List<RestaurantImage> getRestaurantImageList(Long restaurantId);
}
