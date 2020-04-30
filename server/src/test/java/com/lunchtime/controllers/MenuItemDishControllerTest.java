package com.lunchtime.controllers;

import com.lunchtime.models.Dish;
import com.lunchtime.models.MenuItemDish;
import com.lunchtime.models.Restaurant;
import com.lunchtime.service.MenuItemDishService;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.math.BigDecimal;
import java.net.URISyntaxException;

import static org.mockito.Mockito.verify;
import static org.mockito.MockitoAnnotations.initMocks;

@RunWith(SpringJUnit4ClassRunner.class)
public class MenuItemDishControllerTest {

    @Mock
    private MenuItemDishService mockMenuItemDishService;
    private MenuItemDishController menuItemDishControllerUnderTest;

    @Before
    public void setUp() throws Exception {
        initMocks(this);
        menuItemDishControllerUnderTest = new MenuItemDishController(mockMenuItemDishService);
    }
    @Test
    public void newMenuItemDish() throws URISyntaxException {
        MenuItemDish menuItem = new MenuItemDish();
        menuItem.setId(6L);
        menuItem.setDish(new Dish());
        menuItem.setImageUrl("glasses-4720011_640.jpg");
        menuItem.setPortionPrice(Double.valueOf(100));
        menuItem.setPortionSize("500 gr");
        menuItem.setPortionUnit(2L);
        menuItem.setRestaurant(new Restaurant());
        menuItem.setDeleted(false);

        ResponseEntity<MenuItemDish> menuItemDish = menuItemDishControllerUnderTest
            .newMenuItemDish(menuItem);
        verify(mockMenuItemDishService).save(menuItem);
        Mockito.verifyNoMoreInteractions(mockMenuItemDishService);
        Assertions.assertNotNull(menuItemDish);
    }
}
