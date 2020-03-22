package com.lunchtime.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.lunchtime.models.CategoryFood;


public interface CategoryFoodService  {

    public CategoryFood save(CategoryFood categoryFood);

    public Page<CategoryFood> findAll(Pageable pageable);

    public Optional<CategoryFood> findById(Long id);

}
