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
import org.mockito.junit.MockitoJUnitRunner;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Collections;
import java.util.Date;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
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
    private Order order;
    private Person person;

    @Before
    public void setup() {
        String statusName = "new";
        OrderStatus status = OrderStatus.builder()
            .name(statusName)
            .id(1L)
            .build();

        person = new Person();
        person.setId(1L);

        restaurantTable = new RestaurantTable();
        restaurantTable.setId(1L);
        restaurantTable.setCapacity(4);

        when(orderStatusService.getOrderStatusByName(statusName)).thenReturn(Optional.of(status));
    }

    @Test
    public void personCanMakeOrderInSpecificTimeIfRestaurantTableIsAvailable() {
        LocalDateTime start = LocalDateTime.now().plusDays(2);
        LocalDateTime finish = LocalDateTime.now().plusMinutes(40).plusDays(2);
        Date startDate = Date.from(start.atZone(ZoneId.systemDefault()).toInstant());
        Date finishDate = Date.from(finish.atZone(ZoneId.systemDefault()).toInstant());

        order = Order.builder()
            .table(restaurantTable)
            .person(person)
            .startTime(startDate)
            .finishTime(finishDate)
            .visitors(3)
            .build();

        when(orderRepository.findAllOrdersByTableInTime(order.getTable().getId(), startDate, finishDate))
            .thenReturn(Collections.emptyList());
        when(personService.getPersonById(order.getPerson().getId())).thenReturn(Optional.of(person));
        when(restaurantTableService.getTableById(order.getTable().getId())).thenReturn(Optional.of(restaurantTable));
        when(orderRepository.save(order)).thenReturn(order);

        Order createdOrder = orderServiceImpl.saveOrder(order);

        assertNotNull(createdOrder);
        assertEquals(order, createdOrder);
    }
}
