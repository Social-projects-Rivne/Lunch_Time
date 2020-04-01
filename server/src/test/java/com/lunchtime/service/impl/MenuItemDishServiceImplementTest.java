package com.lunchtime.service.impl;

import com.lunchtime.models.Dish;
import com.lunchtime.models.MenuItemDish;
import com.lunchtime.repository.MenuItemDishRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class MenuItemDishServiceImplementTest {

    private Long id = 1L;
    MenuItemDish menuItemDish;
    MenuItemDish menuItemDish1;
    MenuItemDish menuItemDish2;
    Dish dish;
    Dish dish1;
    Dish dish2;
    MenuItemDishServiceImplement menuItemDishServiceImplement;

    @Before
    public void setUp() throws Exception {
        menuItemDish = new MenuItemDish();
        menuItemDish1 = new MenuItemDish();
        menuItemDish2 = new MenuItemDish();
        dish = new Dish();
        dish1 = new Dish();
        dish2 = new Dish();
        menuItemDishServiceImplement = new MenuItemDishServiceImplement();

        dish.setName("Pizza");
        dish.setIngredients("Sousse, salami, tomato");
        dish1.setName("Fish");
        dish1.setIngredients("Fish, sold, tomato");
        dish2.setName("Beef");
        dish2.setIngredients("apple, meet, pepper");


        menuItemDish.setId(1L);
        menuItemDish.setDish(dish);
        menuItemDish.setImageUrl("example/image/url");
        menuItemDish.setPortionUnit(2L);
        menuItemDish.setPortionPrice("120 grn");
        menuItemDish.setPortionSize("500 gr");

        menuItemDish1.setId(2L);
        menuItemDish1.setDish(dish1);
        menuItemDish1.setImageUrl("example2/image/url");
        menuItemDish1.setPortionUnit(2L);
        menuItemDish1.setPortionPrice("220 grn");
        menuItemDish1.setPortionSize("200 gr");

        menuItemDish2.setId(3L);
        menuItemDish2.setDish(dish2);
        menuItemDish2.setImageUrl("example3/image/url");
        menuItemDish2.setPortionUnit(1L);
        menuItemDish2.setPortionPrice("300 grn");
        menuItemDish2.setPortionSize("250 gr");

        menuItemDishServiceImplement.save(menuItemDish);
        menuItemDishServiceImplement.save(menuItemDish1);
        menuItemDishServiceImplement.save(menuItemDish2);

    }

    @Test
    public void findById() {

        Assert.assertEquals(menuItemDish,
            menuItemDishServiceImplement.findById(id));
    }
}
