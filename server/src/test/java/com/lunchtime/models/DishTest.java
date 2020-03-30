package com.lunchtime.models;

import org.junit.Assert;

import static org.junit.Assert.*;

public class DishTest {

    @org.junit.Test
    public void getName() {
        Dish dishitem = new Dish();
        dishitem.setName("Pizza");
        String expected = "Pizza";
        Assert.assertEquals(expected, dishitem.getName());
    }
}
