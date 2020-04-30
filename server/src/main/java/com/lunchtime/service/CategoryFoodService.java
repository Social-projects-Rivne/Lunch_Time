package com.lunchtime.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.lunchtime.models.CategoryFood;

public interface CategoryFoodService  {

    CategoryFood save(CategoryFood categoryFood);

    Page<CategoryFood> findAll(Pageable pageable);

    Optional<CategoryFood> findById(Long id);

    CategoryFood deleteCategoryFoodById(Long id);
}
