package com.lunchtime.service;

import com.lunchtime.models.RestaurantImage;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RestaurantImageService {
    List<RestaurantImage> saveImageListByRestaurantId(List<RestaurantImage> restaurantImageList);

    RestaurantImage getImageByRestaurantId(Long restaurantId);
}
