package com.lunchtime.service.impl;

import com.lunchtime.models.RestaurantImage;
import com.lunchtime.repository.RestaurantImageRepository;
import com.lunchtime.service.RestaurantImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RestaurantImageServiceImpl implements RestaurantImageService {
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
    public Optional<RestaurantImage> getImageByRestaurantId(Long restaurantId) {
        return restaurantImageRepository.findFirstByRestaurantId(restaurantId);
    }

    @Override
    public List<RestaurantImage> getRestaurantImageList(Long restaurantId) {
        return restaurantImageRepository.findAllByRestaurantId(restaurantId);
    }
}
