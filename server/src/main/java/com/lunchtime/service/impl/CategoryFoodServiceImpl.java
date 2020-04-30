package com.lunchtime.service.impl;

import com.lunchtime.models.CategoryFood;
import com.lunchtime.models.Restaurant;
import com.lunchtime.repository.CategoryFoodRepository;
import com.lunchtime.service.CategoryFoodService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class CategoryFoodServiceImpl implements CategoryFoodService {

    private final CategoryFoodRepository categoryFoodRepository;

    public CategoryFoodServiceImpl(CategoryFoodRepository categoryFoodRepository) {
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

    public CategoryFood deleteCategoryFoodById(Long id) {
        return findById(id)
            .map(categoryFood -> {
                categoryFood.setDeleted(true);
                return save(categoryFood);
            })
            .orElse(null);
    }
}


