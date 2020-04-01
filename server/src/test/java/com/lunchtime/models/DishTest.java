package com.lunchtime.models;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class DishTest {

    Dish dish1 = new Dish();

    @Before
    public void setUp() {

    }

    @Test
    public void isDeleted() {
        dish1.setIsDeleted(true);
        Assert.assertTrue(dish1.getIsDeleted());
    }
}
