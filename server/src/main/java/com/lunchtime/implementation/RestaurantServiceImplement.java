package com.lunchtime.implementation;

import com.lunchtime.models.Restaurant;
import com.lunchtime.repository.RestaurantRepository;
import com.lunchtime.service.PersonService;
import com.lunchtime.service.RestaurantService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RestaurantServiceImplement implements RestaurantService {

    private final RestaurantRepository restaurantRepository;
    private final PersonService personService;

    public RestaurantServiceImplement(RestaurantRepository restaurantRepository, PersonService personService) {
        this.restaurantRepository = restaurantRepository;
        this.personService = personService;
    }

    public Restaurant save(Restaurant restaurant) {
        return personService.findById(restaurant.getPerson().getId())
            .map(person -> {
                restaurant.setPerson(person);
                return restaurantRepository.save(restaurant);
            })
            // TODO simple ... .orElseGet(null)
            .orElseGet(() -> {
                return null;
            });
    }

    public Page<Restaurant> findAll(Pageable pageable) {
        return restaurantRepository.findAll(pageable);
    }

    public Optional<Restaurant> findById(Long id) {
        return restaurantRepository.findById(id);
    }

    public Restaurant update(Restaurant newRestaurant) {
        return findById(newRestaurant.getId())
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
                return save(restaurant);
            })
            // TODO simple ... .orElseGet(null)
            .orElseGet(() -> {
                return null;
            });
    }

    public Restaurant delete(Long id) {
        return findById(id)
            .map(restaurant -> {
                restaurant.setIsDeleted(true);
                return save(restaurant);
            })
            .orElseGet(() -> {
                return null;
            });
        // TODO simple ... .orElseGet(null)
    }
}
