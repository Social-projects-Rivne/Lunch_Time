package com.lunchtime.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.lunchtime.models.MenuItemDish;
import com.lunchtime.repository.MenuItemDishRepository;

@Service
public class MenuItemDishService {

    private final MenuItemDishRepository menuItemDishRepository;

    public MenuItemDishService(MenuItemDishRepository menuItemDishRepository) {
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

    public MenuItemDish update(MenuItemDish newmenuItemDish) {
        return findById(newmenuItemDish.getId())
            .map(menuItemDish -> {
                menuItemDish.setDish(newmenuItemDish.getDish());
                menuItemDish.setImageUrl(newmenuItemDish.getImageUrl());
                menuItemDish.setPortionPrice(newmenuItemDish.getPortionPrice());
                menuItemDish.setPortionSize(newmenuItemDish.getPortionSize());
                menuItemDish.setPortionUnit(newmenuItemDish.getPortionUnit());
                menuItemDish.setRestaurant(newmenuItemDish.getRestaurant());
                return save(menuItemDish);
            })
            .orElseGet(() -> {
                return null;
            });
    }

    public MenuItemDish delete(Long id) {
        return findById(id)
            .map(menuItemDish -> {
                menuItemDish.setDeleted(true);
                return save(menuItemDish);
            })
            .orElseGet(() -> {
                return null;
            });
    }   
}
