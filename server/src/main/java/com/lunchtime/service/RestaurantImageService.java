package com.lunchtime.service;

import com.lunchtime.models.RestaurantImage;
import org.springframework.stereotype.Service;

@Service
public interface RestaurantImageService {
    RestaurantImage getImageByRestaurantId(Long restaurantId);
}
