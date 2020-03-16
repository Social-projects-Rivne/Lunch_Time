package com.lunchtime.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.lunchtime.models.CategoryFood;
import com.lunchtime.repository.CategoryFoodRepository;

@Service
public class CategoryFoodService  {

    private final CategoryFoodRepository categoryFoodRepository;

    public CategoryFoodService(CategoryFoodRepository categoryFoodRepository) {
        this.categoryFoodRepository = categoryFoodRepository;
    }

    public CategoryFood save(CategoryFood categoryFood) {
        return categoryFoodRepository.save(categoryFood);
    }

    public Page<CategoryFood> findAll(Pageable pageable) {
        return categoryFoodRepository.findAll(pageable);
    }

    public Optional<CategoryFood> findById(Long id) {
        return categoryFoodRepository.findById(id);
    }

    public CategoryFood update(CategoryFood newCategory) {
        return findById(newCategory.getId())
            .map(categoryFood -> {
                categoryFood.setName(newCategory.getName());
                categoryFood.setDishes(newCategory.getDishes());
                return save(categoryFood);
            })
            .orElseGet(() -> {
                return null;
            });
    }

    public CategoryFood delete(Long id) {
        return findById(id)
            .map(categoryFood -> {
                categoryFood.setDeleted(true);
                return save(categoryFood);
            })
            .orElseGet(() -> {
                return null;
            });
    }   


}
