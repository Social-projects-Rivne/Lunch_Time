package com.lunchtime.service.impl;

import com.lunchtime.models.Order;
import com.lunchtime.models.OrderStatus;
import com.lunchtime.models.Person;
import com.lunchtime.models.RestaurantTable;
import com.lunchtime.repository.OrderRepository;
import com.lunchtime.service.OrderService;
import com.lunchtime.service.OrderStatusService;
import com.lunchtime.service.PersonService;
import com.lunchtime.service.RestaurantTableService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final RestaurantTableService restaurantTableService;
    private final PersonService personService;
    private final OrderStatusService orderStatusService;

    private final String newOrderStatus = "new";

    public Order saveOrder(Order order) {
        Date currentDate = new Date();
        if (currentDate.after(order.getStartTime())) {
            return null;
        }
        if (order.getStartTime().after(order.getFinishTime())) {
            return null;
        }

        List<Order> orders = orderRepository
            .findAllOrdersByTableInTime(order.getTable().getId(), order.getStartTime(), order.getFinishTime());
        if (!orders.isEmpty()) {
            return null;
        }

        Optional<Person> person = personService.getPersonById(order.getPerson().getId());
        if (person.isPresent()) {
            order.setPerson(person.get());
        } else {
            return null;
        }

        Optional<RestaurantTable> table = restaurantTableService.getTableById(order.getTable().getId());
        if (table.isPresent() && table.get().getCapacity() >= order.getVisitors()) {
            order.setTable(table.get());
        } else {
            return null;
        }

        Optional<OrderStatus> status = orderStatusService.getOrderStatusByName(newOrderStatus);
        status.ifPresent(order::setStatus);

        return orderRepository.save(order);
    }

    public Page<Order> getAllOrders(Pageable pageable) {
        return orderRepository.findAll(pageable);
    }

    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    public Order deleteOrder(Long id) {
        return getOrderById(id)
            .map(order -> {
                order.setDeleted(true);
                return orderRepository.save(order);
            })
            .orElse(null);
    }
}
