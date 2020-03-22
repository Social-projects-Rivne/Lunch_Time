package com.lunchtime.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.lunchtime.models.Dish;


public interface DishService {

    public Dish save(Dish dish);

    public Page<Dish> findAll(Pageable pageable);

    public Optional<Dish> findById(Long id);

}
