package com.lunchtime.repository;

import com.lunchtime.models.CategoryToDish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryToDishRepository extends JpaRepository<CategoryToDish, Long> {

}
