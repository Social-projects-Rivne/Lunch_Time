package com.lunchtime.service.impl;

import com.lunchtime.mapper.OrderMapper;
import com.lunchtime.models.Order;
import com.lunchtime.models.OrderStatus;
import com.lunchtime.models.Person;
import com.lunchtime.models.RestaurantTable;
import com.lunchtime.repository.OrderRepository;
import com.lunchtime.service.OrderService;
import com.lunchtime.service.OrderStatusService;
import com.lunchtime.service.PersonService;
import com.lunchtime.service.RestaurantTableService;
import com.lunchtime.service.dto.OrderDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.IOException;
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
    private final OrderMapper orderMapper;

    private final String newOrderStatus = "new";

    public OrderDto saveOrder(OrderDto orderDto) throws IOException {
        Date currentDate = new Date();
        if (currentDate.after(orderDto.getStartTime())) {
            return null;
        }
        if (orderDto.getStartTime().after(orderDto.getFinishTime())) {
            return null;
        }

        List<Order> orders = orderRepository.findAllOrdersByTableInTime(
            orderDto.getTableId(), orderDto.getStartTime(), orderDto.getFinishTime()
        );
        if (!orders.isEmpty()) {
            return null;
        }

        Order validOrder = orderMapper.fromDtoToOrder(orderDto);

        if (validOrder != null) {
            Optional<Person> person = personService.getPersonById(orderDto.getPersonId());
            if (person.isPresent()) {
                validOrder.setPerson(person.get());
            } else {
                return null;
            }

            Optional<RestaurantTable> table = restaurantTableService.getTableById(orderDto.getTableId());
            if (table.isPresent() && table.get().getCapacity() >= orderDto.getVisitors()) {
                validOrder.setTable(table.get());
            } else {
                return null;
            }

            Optional<OrderStatus> status = orderStatusService.getOrderStatusByName(newOrderStatus);
            status.ifPresent(validOrder::setStatus);

            orderRepository.save(validOrder);
            return orderMapper.fromOrderToDto(validOrder);
        }
        return null;
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
