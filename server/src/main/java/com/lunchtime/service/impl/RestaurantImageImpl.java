package com.lunchtime.service.impl;

import com.lunchtime.models.RestaurantImage;
import com.lunchtime.repository.RestaurantImageRepository;
import com.lunchtime.service.RestaurantImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RestaurantImageImpl implements RestaurantImageService {
    private final RestaurantImageRepository restaurantImageRepository;

    @Override
    public RestaurantImage getImageByRestaurantId(Long restaurantId) {
        return restaurantImageRepository.findImageByRestaurantId(restaurantId);
    }
}
