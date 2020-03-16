package com.lunchtime.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.lunchtime.models.Dish;
import com.lunchtime.repository.DishRepository;



@Service
public class DishService {

    private final DishRepository dishRepository;

    public DishService(DishRepository dishRepository) {
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

    public Dish update(Dish newDish) {
        return findById(newDish.getId())
            .map(dish -> {
                dish.setName(newDish.getName());
                dish.setIngredients(newDish.getIngredients());
                dish.setCategoryFood(newDish.getCategory());
                dish.setMenuItemDish(newDish.getMenuItemDish());
                return save(dish);
            })
            .orElseGet(() -> {
                return null;
            });
    }

    public Dish delete(Long id) {
        return findById(id)
            .map(dish -> {
                dish.setDeleted(true);
                return save(dish);
            })
            .orElseGet(() -> {
                return null;
            });
    }   
}
