package com.lunchtime.service.impl;

import com.lunchtime.models.Restaurant;
import com.lunchtime.repository.RestaurantRepository;
import com.lunchtime.service.PersonService;
import com.lunchtime.service.RestaurantService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RestaurantServiceImpl implements RestaurantService {
    private final RestaurantRepository restaurantRepository;
    private final PersonService personService;

    public RestaurantServiceImpl(RestaurantRepository restaurantRepository, PersonService personService) {
        this.restaurantRepository = restaurantRepository;
        this.personService = personService;
    }

    public Restaurant saveRestaurant(Restaurant restaurant) {
        return personService.getPersonById(restaurant.getPerson().getId())
            .map(person -> {
                restaurant.setPerson(person);
                return restaurantRepository.save(restaurant);
            })
            .orElse(null);
    }

    public Page<Restaurant> getRestaurantPage(Pageable pageable) {
        return restaurantRepository.findByIsDeletedFalse(pageable);
    }

    public Optional<Restaurant> getRestaurantById(Long id) {
        return restaurantRepository.findByIdAndIsDeletedFalse(id);
    }

    public Restaurant updateRestaurant(Restaurant newRestaurant) {
        return getRestaurantById(newRestaurant.getId())
            .map(restaurant -> {
                restaurant.setName(newRestaurant.getName());
                restaurant.setEmail(newRestaurant.getEmail());
                restaurant.setTextAddress(newRestaurant.getTextAddress());
                restaurant.setWebsite(newRestaurant.getWebsite());
                restaurant.setDescription(newRestaurant.getDescription());
                restaurant.setWorkingTime(newRestaurant.getWorkingTime());
                restaurant.setMenuId(newRestaurant.getMenuId());
                restaurant.setPerson(newRestaurant.getPerson());
                restaurant.setTables(newRestaurant.getTables());
                restaurant.setLongitude(newRestaurant.getLongitude());
                restaurant.setLatitude(newRestaurant.getLatitude());
                return saveRestaurant(restaurant);
            })
            .orElse(null);
    }

    public Restaurant deleteRestaurantById(Long id) {
        return getRestaurantById(id)
            .map(restaurant -> {
                restaurant.setDeleted(true);
                return saveRestaurant(restaurant);
            })
            .orElse(null);
    }
}
