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
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.mockito.ArgumentMatchers.longThat;
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
    public void getAll() {

    }

    @Test
    public void getCategory() {
        final List<CategoryFood> categoryFood = new ArrayList<CategoryFood>();
        CategoryFood category1 = new CategoryFood();
        CategoryFood category2 = new CategoryFood();
        CategoryFood category3 = new CategoryFood();
        category1.setId(1L);
        category1.setName("Drinks");
        category2.setId(2L);
        category2.setName("Dessert");
        category3.setId(3L);
        category3.setName("Main Course");
        categoryFood.add(category1);
        categoryFood.add(category2);
        categoryFood.add(category3);
        Long id = 1L;

        when(mockCategoryFoodService.findById(id).isPresent()).thenReturn(true);
        categoryFoodControllerUnderTest.getCategory(id);
        verify(mockCategoryFoodService, times(1)).findById(id);
        verifyNoMoreInteractions(mockCategoryFoodService);
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
