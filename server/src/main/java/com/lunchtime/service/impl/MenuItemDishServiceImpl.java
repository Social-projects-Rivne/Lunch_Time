package com.lunchtime.service.impl;

import com.lunchtime.models.MenuItemDish;
import com.lunchtime.repository.MenuItemDishRepository;
import com.lunchtime.service.MenuItemDishService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class MenuItemDishServiceImpl implements MenuItemDishService {

    private final MenuItemDishRepository menuItemDishRepository;

    public MenuItemDishServiceImpl(MenuItemDishRepository menuItemDishRepository) {
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

    public Page<MenuItemDish> findByRestaurantId(Long id, Pageable pageable) {
        return menuItemDishRepository.findByRestaurantId(id, pageable);
    }

    @Override
    public Page<MenuItemDish> findDishesByRestaurantIdAndCategoryName(
            String name, Long id, Pageable pageable) {
        return menuItemDishRepository.findDishesByRestaurantIdAndCategoryName(
                                                        name, id, pageable);
    }

    public Optional<MenuItemDish> deleteById(Long id) {
        Optional<MenuItemDish> result = findById(id);
        if (result.isPresent()) {
            MenuItemDish menuItemDish = result.get();
            menuItemDish.setDeleted(true);
            save(menuItemDish);
            return Optional.of(menuItemDish);
        }
        return Optional.empty();
    }
}
