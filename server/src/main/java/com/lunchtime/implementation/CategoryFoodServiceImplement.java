package com.lunchtime.implementation;

import com.lunchtime.models.CategoryFood;
import com.lunchtime.repository.CategoryFoodRepository;
import com.lunchtime.service.CategoryFoodService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CategoryFoodServiceImplement implements CategoryFoodService {

    private final CategoryFoodRepository categoryFoodRepository;

    public CategoryFoodServiceImplement(CategoryFoodRepository categoryFoodRepository) {
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

}


