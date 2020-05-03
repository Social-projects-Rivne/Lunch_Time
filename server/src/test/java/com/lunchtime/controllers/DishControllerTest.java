package com.lunchtime.controllers;

import com.lunchtime.models.CategoryFood;
import com.lunchtime.models.Dish;
import com.lunchtime.service.DishService;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import java.net.URISyntaxException;
import static org.mockito.Mockito.verify;
import static org.mockito.MockitoAnnotations.initMocks;

@RunWith(SpringJUnit4ClassRunner.class)
public class DishControllerTest {
    @Mock
    private DishService mockDishService;
    private DishController dishControllerUnderTest;

    @Before
    public void setUp() throws Exception {
        initMocks(this);
        dishControllerUnderTest = new DishController(mockDishService);
    }

    @Test
    public void newDish() throws URISyntaxException {
        Dish dish = new Dish();
        dish.setId(6L);
        dish.setName("Cola");
        dish.setDeleted(false);
        dish.setIngredients("first, second");
        dish.setCategoryFood(new CategoryFood());
        ResponseEntity<Dish> dish1 = dishControllerUnderTest
            .newDish(dish);
        verify(mockDishService).save(dish);
        Mockito.verifyNoMoreInteractions(mockDishService);
        Assertions.assertNotNull(dish1);
    }
}
