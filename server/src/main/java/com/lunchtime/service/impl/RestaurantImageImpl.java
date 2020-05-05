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
        // param "1L" in feature should be changed to "restaurantId"
        return restaurantImageRepository.findImageByRestaurantId(1L);
    }
}
