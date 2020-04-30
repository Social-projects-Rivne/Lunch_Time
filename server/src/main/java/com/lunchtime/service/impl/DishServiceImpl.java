package com.lunchtime.service.impl;

import com.lunchtime.models.Dish;
import com.lunchtime.repository.DishRepository;
import com.lunchtime.service.DishService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class DishServiceImpl implements DishService {
    private final DishRepository dishRepository;

    public DishServiceImpl(DishRepository dishRepository) {
        this.dishRepository = dishRepository;
    }

    public Dish save(Dish dish) {
        return dishRepository.save(dish);
    }

    public Page<Dish> findAll(Pageable pageable) {
        return dishRepository.findAll(pageable);
    }

    public Optional<Dish> findById(Long id) {
        return dishRepository.findById(id);
    }
}
