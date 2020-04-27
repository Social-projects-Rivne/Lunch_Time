package com.lunchtime.repository;

import com.lunchtime.models.CategoryFood;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryFoodRepository extends JpaRepository<CategoryFood, Long> {
    @Query("select c from CategoryFood c where c.isDeleted = false ")
    Page<CategoryFood> findAll(Pageable page);
}
