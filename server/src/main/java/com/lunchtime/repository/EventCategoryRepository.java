package com.lunchtime.repository;

import com.lunchtime.models.EventCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EventCategoryRepository extends JpaRepository<EventCategory, Long> {
    @Query("select e.id from EventCategory e where e.category in :category")
    List<Long> findIdOfCategory(String[] category);
}
