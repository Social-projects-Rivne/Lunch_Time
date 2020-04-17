package com.lunchtime.service.impl;

import com.lunchtime.models.Order;
import com.lunchtime.models.OrderStatus;
import com.lunchtime.models.Person;
import com.lunchtime.models.RestaurantTable;
import com.lunchtime.repository.OrderRepository;
import com.lunchtime.service.OrderStatusService;
import com.lunchtime.service.PersonService;
import com.lunchtime.service.RestaurantTableService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@RunWith(SpringJUnit4ClassRunner.class)
public class OrderServiceImplTest {

    @InjectMocks
    private OrderServiceImpl orderServiceImpl;

    @Mock
    private OrderRepository orderRepository;
    @Mock
    private RestaurantTableService restaurantTableService;
    @Mock
    private PersonService personService;
    @Mock
    private OrderStatusService orderStatusService;

    private RestaurantTable restaurantTable;
    private Person person;
    private final Long personId = 1L;
    private final Long tableId = 1L;
    private final int tableCapacity = 4;

    @Before
    public void setup() {
        String statusName = "new";
        OrderStatus status = OrderStatus.builder()
            .name(statusName)
            .id(1L)
            .build();

        person = new Person();
        person.setId(personId);

        restaurantTable = RestaurantTable.builder()
            .id(tableId)
            .capacity(tableCapacity)
            .build();

        when(orderStatusService.getOrderStatusByName(statusName)).thenReturn(Optional.of(status));
        when(personService.getPersonById(personId)).thenReturn(Optional.of(person));
        when(restaurantTableService.getTableById(tableId)).thenReturn(Optional.of(restaurantTable));
    }

    @Test
    public void personCanMakeOrderInSpecificTimeIfRestaurantTableIsAvailable() {
        LocalDateTime start = LocalDateTime.now().plusDays(2);
        LocalDateTime finish = LocalDateTime.now().plusMinutes(40).plusDays(2);
        Date startDate = Date.from(start.atZone(ZoneId.systemDefault()).toInstant());
        Date finishDate = Date.from(finish.atZone(ZoneId.systemDefault()).toInstant());

        Order order = Order.builder()
            .table(restaurantTable)
            .person(person)
            .startTime(startDate)
            .finishTime(finishDate)
            .visitors(3)
            .build();

        when(orderRepository.findAllOrdersByTableInTime(order.getTable().getId(), startDate, finishDate))
            .thenReturn(Collections.emptyList());
        when(orderRepository.save(order)).thenReturn(order);

        Order createdOrder = orderServiceImpl.saveOrder(order);

        assertNotNull(createdOrder);
        assertEquals(order, createdOrder);
    }

    @Test
    public void personCanNotMakeOrderIfThereAreOtherOrdersInThatTimeInThatTableInThatRestaurant() {
        LocalDateTime start = LocalDateTime.now().plusDays(2);
        LocalDateTime finish = LocalDateTime.now().plusMinutes(40).plusDays(2);
        Date startDate = Date.from(start.atZone(ZoneId.systemDefault()).toInstant());
        Date finishDate = Date.from(finish.atZone(ZoneId.systemDefault()).toInstant());

        Order order = Order.builder()
            .table(restaurantTable)
            .person(person)
            .startTime(startDate)
            .finishTime(finishDate)
            .visitors(3)
            .build();

        List<Order> orders = new ArrayList<>();
        orders.add(Order.builder().build());

        when(orderRepository.findAllOrdersByTableInTime(order.getTable().getId(), startDate, finishDate))
            .thenReturn(orders);
        when(orderRepository.save(order)).thenReturn(order);

        Order createdOrder = orderServiceImpl.saveOrder(order);

        assertNull(createdOrder);
    }

    @Test
    public void personCanNotMakeOrderWhenNumberOfVisitorsMoreThanTableCapacity() {
        LocalDateTime start = LocalDateTime.now().plusDays(2);
        LocalDateTime finish = LocalDateTime.now().plusMinutes(40).plusDays(2);
        Date startDate = Date.from(start.atZone(ZoneId.systemDefault()).toInstant());
        Date finishDate = Date.from(finish.atZone(ZoneId.systemDefault()).toInstant());

        Order order = Order.builder()
            .table(restaurantTable)
            .person(person)
            .startTime(startDate)
            .finishTime(finishDate)
            .visitors(5)
            .build();

        when(orderRepository.findAllOrdersByTableInTime(order.getTable().getId(), startDate, finishDate))
            .thenReturn(Collections.emptyList());
        when(orderRepository.save(order)).thenReturn(order);

        Order createdOrder = orderServiceImpl.saveOrder(order);

        assertNull(createdOrder);
    }
}
