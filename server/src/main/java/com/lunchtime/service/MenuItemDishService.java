package com.lunchtime.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.lunchtime.models.MenuItemDish;



public interface MenuItemDishService {

    public MenuItemDish save(MenuItemDish menuItemDish);

    public Page<MenuItemDish> findAll(Pageable pageable);

    public Optional<MenuItemDish> findById(Long id);
}
