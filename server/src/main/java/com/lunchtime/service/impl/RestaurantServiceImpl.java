package com.lunchtime.service.impl;

import com.lunchtime.models.Restaurant;
import com.lunchtime.repository.PersonRepository;
import com.lunchtime.repository.RestaurantRepository;
import com.lunchtime.service.PersonService;
import com.lunchtime.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class RestaurantServiceImpl implements RestaurantService {
    private final RestaurantRepository restaurantRepository;
    private final PersonRepository personRepository;
    private final PersonService personService;
    private static final long OWNER_ROLE_ID = 2;

    public Restaurant saveRestaurant(Restaurant restaurant) {
        return personService.getPersonById(restaurant.getPersonId())
            .map(person -> {
                restaurant.setPersonId(person.getId());
                return restaurantRepository.save(restaurant);
            })
            .orElse(null);
    }

    public Page<Restaurant> getRestaurantPage(Pageable pageable) {
        return restaurantRepository.findByIsDeletedFalse(pageable);
    }

    public Page<Restaurant> getRestaurantPageByUserId(Long userId, Pageable pageable) {
        long userRoleId = personRepository.findRoleIdByUserId(userId);
        if (userRoleId == OWNER_ROLE_ID) {
            return restaurantRepository.findByOwnerRestList(userId, pageable);
        }
        return null;
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
                restaurant.setPersonId(newRestaurant.getPersonId());
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
