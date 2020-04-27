package com.lunchtime.controllers;

import com.lunchtime.models.CategoryFood;
import com.lunchtime.service.CategoryFoodService;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import java.net.URISyntaxException;

import static org.mockito.Mockito.*;
import static org.mockito.MockitoAnnotations.initMocks;

@RunWith(SpringJUnit4ClassRunner.class)
public class CategoryFoodControllerTest {

    @Mock
    private CategoryFoodService mockCategoryFoodService;
    private CategoryFoodController categoryFoodControllerUnderTest;

    @Before
    public void setUp() {
        initMocks(this);
        categoryFoodControllerUnderTest = new CategoryFoodController(mockCategoryFoodService);
    }

    @Test
    public void newCategory() throws URISyntaxException {
        CategoryFood categoryFood = new CategoryFood();
        categoryFood.setId(6L);
        categoryFood.setName("Driks");
        categoryFood.setDeleted(false);
        ResponseEntity<CategoryFood> category = categoryFoodControllerUnderTest
            .newCategory(categoryFood);
        verify(mockCategoryFoodService).save(categoryFood);
        Mockito.verifyNoMoreInteractions(mockCategoryFoodService);
        Assertions.assertNotNull(category);
    }
}
