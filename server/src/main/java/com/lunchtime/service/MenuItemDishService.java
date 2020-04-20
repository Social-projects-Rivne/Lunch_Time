package com.lunchtime.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.lunchtime.models.MenuItemDish;

public interface MenuItemDishService {

    MenuItemDish save(MenuItemDish menuItemDish);

    Page<MenuItemDish> findAll(Pageable pageable);

    Optional<MenuItemDish> findById(Long id);

    Page<MenuItemDish> findByRestaurantId(Long id, Pageable pageable);

    Page<MenuItemDish> findMenuItemDishesByRestaurantIdAndDish_CategoryFood_Name(
                                                 Long categoryId, Long id, Pageable pageable);
}
