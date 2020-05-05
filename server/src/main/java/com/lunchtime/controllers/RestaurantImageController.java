package com.lunchtime.controllers;

import com.lunchtime.models.RestaurantImage;
import com.lunchtime.service.RestaurantImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/restaurant-images")
public class RestaurantImageController {
    private final RestaurantImageService restaurantImageService;

    @GetMapping("{id}")
    public ResponseEntity<RestaurantImage> getImageByRestaurantId(@PathVariable Long id) {
        return ResponseEntity.ok()
            .body(restaurantImageService.getImageByRestaurantId(id));
    }
}
