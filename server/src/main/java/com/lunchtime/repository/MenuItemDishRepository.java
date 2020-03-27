package com.lunchtime.repository;


import com.lunchtime.models.MenuItemDish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuItemDishRepository extends JpaRepository<MenuItemDish, Long> {
    List<MenuItemDish> findByRestaurantId(Long id);
}
