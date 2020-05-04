package com.lunchtime.controllers;

import com.lunchtime.models.Restaurant;
import com.lunchtime.repository.PersonRepository;
import com.lunchtime.service.RestaurantService;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.net.URISyntaxException;

import static org.mockito.MockitoAnnotations.initMocks;

@RunWith(SpringJUnit4ClassRunner.class)
public class RestaurantControllerTest {
    @Mock
    private RestaurantService mockRestaurantService;
    private RestaurantController restaurantController;
    private PersonRepository personRepository;

    @Before
    public void setUp() {
        initMocks(this);
        restaurantController = new RestaurantController(
            mockRestaurantService, personRepository);
    }
    @Test
    public void testCreateRestaurant() throws URISyntaxException {
        final Restaurant restaurant = new Restaurant();

        restaurant.setId(0L);
        restaurant.setDeleted(false);
        restaurant.setEmail("somemail@gmail.com");
        restaurant.setDescription("some description");
        restaurant.setName("Some name");
        restaurant.setPersonId(0L);
        restaurant.setTextAddress("some address");

        final ResponseEntity<Restaurant> restaurant1 = restaurantController.createRestaurant(restaurant);
        Assertions.assertNotNull(restaurant1);

    }

}
