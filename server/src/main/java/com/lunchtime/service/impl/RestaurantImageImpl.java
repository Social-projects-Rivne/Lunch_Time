package com.lunchtime.service.impl;

import com.lunchtime.models.RestaurantImage;
import com.lunchtime.repository.RestaurantImageRepository;
import com.lunchtime.service.RestaurantImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RestaurantImageImpl implements RestaurantImageService {
    private final RestaurantImageRepository restaurantImageRepository;

    @Override
    public List<RestaurantImage> saveImageListByRestaurantId(List<RestaurantImage> restaurantImageList) {
        List<RestaurantImage> restaurantImages = new LinkedList<>();
        for (RestaurantImage image : restaurantImageList) {
            restaurantImageRepository.save(image);
            restaurantImages.add(image);
        }
        return restaurantImages;
    }

    @Override
    public RestaurantImage getImageByRestaurantId(Long restaurantId) {
        return restaurantImageRepository.findImageByRestaurantId(restaurantId);
    }
}
