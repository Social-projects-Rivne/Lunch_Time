package com.lunchtime.implementation;

import com.lunchtime.models.MenuItemDish;
import com.lunchtime.repository.MenuItemDishRepository;
import com.lunchtime.service.MenuItemDishService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MenuItemDishServiceImplement implements MenuItemDishService {

    private final MenuItemDishRepository menuItemDishRepository;

    public MenuItemDishServiceImplement(MenuItemDishRepository menuItemDishRepository) {
        this.menuItemDishRepository = menuItemDishRepository;
    }

    public MenuItemDish save(MenuItemDish menuItemDish) {
        return menuItemDishRepository.save(menuItemDish);
    }

    public Page<MenuItemDish> findAll(Pageable pageable) {
        return menuItemDishRepository.findAll(pageable);
    }

    public Optional<MenuItemDish> findById(Long id) {
        return menuItemDishRepository.findById(id);
    }
}
