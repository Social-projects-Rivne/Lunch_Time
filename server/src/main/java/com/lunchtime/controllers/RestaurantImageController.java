package com.lunchtime.controllers;

import com.lunchtime.models.RestaurantImage;
import com.lunchtime.service.RestaurantImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/restaurant-images")
public class RestaurantImageController {
    private final RestaurantImageService restaurantImageService;

    @PostMapping
    public ResponseEntity<List<RestaurantImage>> saveImageListByRestaurantId(
        @Valid @RequestBody List<RestaurantImage> restaurantImageList) throws URISyntaxException {
        List<RestaurantImage> result = restaurantImageService.saveImageListByRestaurantId(restaurantImageList);
        if (result == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.created(new URI("/api/restaurant-images")).body(result);
    }

    @GetMapping("{id}")
    public ResponseEntity<Optional<RestaurantImage>> getImageByRestaurantId(@PathVariable Long id) {
        return ResponseEntity.ok()
            .body(restaurantImageService.getImageByRestaurantId(id));
    }

    @GetMapping("/gallery/{id}")
    public ResponseEntity<List<RestaurantImage>> getRestaurantImageList(@PathVariable Long id) {
        return ResponseEntity.ok()
            .body(restaurantImageService.getRestaurantImageList(id));
    }
}
