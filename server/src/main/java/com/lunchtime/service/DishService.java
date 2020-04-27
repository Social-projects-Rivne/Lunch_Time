package com.lunchtime.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.lunchtime.models.Dish;

public interface DishService {

    Dish save(Dish dish);

    Page<Dish> findAll(Pageable pageable);

    Optional<Dish> findById(Long id);

}
