package com.lunchtime.repository;


import com.lunchtime.models.MenuItemDish;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

@Repository
public interface MenuItemDishRepository extends JpaRepository<MenuItemDish, Long> {

    Page<MenuItemDish> findByRestaurantId(Long id, Pageable pageable);

    @Query("select m from MenuItemDish m "
        + "where m.restaurant.id = :id "
        + "and m.dish.categoryFood.id = :categoryId "
        + "and m.isDeleted = false")
    Page<MenuItemDish> findMenuItemDishesByRestaurantIdAndDish_CategoryFood_Name(
                                                      Long categoryId, Long id, Pageable pageable);
}
