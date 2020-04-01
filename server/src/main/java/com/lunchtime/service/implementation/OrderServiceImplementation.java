package com.lunchtime.service.implementation;

import com.lunchtime.models.Order;
import com.lunchtime.models.Person;
import com.lunchtime.models.RestaurantTable;
import com.lunchtime.repository.OrderRepository;
import com.lunchtime.service.OrderService;
import com.lunchtime.service.PersonService;
import com.lunchtime.service.RestaurantTableService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OrderServiceImplementation implements OrderService {

    private final OrderRepository orderRepository;
    private final RestaurantTableService restaurantTableService;
    private final PersonService personService;

    public OrderServiceImplementation(
        OrderRepository orderRepository,
        RestaurantTableService restaurantTableService,
        PersonService personService
    ) {
        this.orderRepository = orderRepository;
        this.restaurantTableService = restaurantTableService;
        this.personService = personService;
    }

    public Order save(Order order) {
        Optional<Person> person = personService.findById(order.getPerson().getId());
        if (person.isPresent()) {
            order.setPerson(person.get());
        } else {
            return null;
        }

        Optional<RestaurantTable> table = restaurantTableService.findById(order.getTable().getId());
        if (table.isPresent()) {
            order.setTable(table.get());
        } else {
            return null;
        }
        return orderRepository.save(order);
    }

    public Page<Order> findAll(Pageable pageable) {
        return null;
    }

    public Optional<Order> findById(Long id) {
        return Optional.empty();
    }

    public Order delete(Long id) {
        return null;
    }
}
