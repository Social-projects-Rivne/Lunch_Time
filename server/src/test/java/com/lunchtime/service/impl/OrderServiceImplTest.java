package com.lunchtime.service.impl;

import com.lunchtime.mapper.OrderMapper;
import com.lunchtime.models.Order;
import com.lunchtime.models.OrderStatus;
import com.lunchtime.models.Person;
import com.lunchtime.models.RestaurantTable;
import com.lunchtime.repository.OrderRepository;
import com.lunchtime.service.OrderStatusService;
import com.lunchtime.service.PersonService;
import com.lunchtime.service.RestaurantTableService;
import com.lunchtime.service.dto.OrderDto;
import lombok.var;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
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
    @Mock
    private OrderMapper orderMapper;

    private RestaurantTable restaurantTable;
    private Person person;
    private Date startDate;
    private Date finishDate;
    private OrderDto orderDto;
    private Order order;
    private final Long personId = 1L;
    private final Long tableId = 1L;
    private final int tableCapacity = 4;

    @Before
    public void setup() throws IOException {
        LocalDateTime start = LocalDateTime.now().plusDays(2);
        LocalDateTime finish = LocalDateTime.now().plusMinutes(40).plusDays(2);
        startDate = Date.from(start.atZone(ZoneId.systemDefault()).toInstant());
        finishDate = Date.from(finish.atZone(ZoneId.systemDefault()).toInstant());

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

        orderDto = OrderDto.builder()
            .tableId(restaurantTable.getId())
            .personId(person.getId())
            .startTime(startDate)
            .finishTime(finishDate)
            .visitors(3)
            .build();

        when(orderStatusService.getOrderStatusByName(statusName)).thenReturn(Optional.of(status));
        when(personService.getPersonById(personId)).thenReturn(Optional.of(person));
        when(restaurantTableService.getTableById(tableId)).thenReturn(Optional.of(restaurantTable));
        when(orderRepository.findAllOrdersByTableInTime(tableId, startDate, finishDate))
            .thenReturn(Collections.emptyList());
        when(orderRepository.save(order)).thenReturn(order);

        var order = Mockito.mock(Order.class);
        when(orderMapper.fromDtoToOrder(any(OrderDto.class))).thenReturn(order);
        when(orderMapper.fromOrderToDto(order)).thenReturn(orderDto);
    }

    @After
    public void after() {
        startDate = null;
        finishDate = null;
        order = null;
        orderDto = null;
    }

    @Test
    public void personCanMakeOrderInSpecificTimeIfRestaurantTableIsAvailable() throws IOException {

        var order = Mockito.mock(Order.class);
        when(orderMapper.fromDtoToOrder(any(OrderDto.class))).thenReturn(order);
        when(orderMapper.fromOrderToDto(order)).thenReturn(orderDto);

        OrderDto createdOrder = orderServiceImpl.saveOrder(orderDto);

        assertNotNull(createdOrder);
        assertEquals(orderDto, createdOrder);
    }

    @Test
    public void personCanNotMakeOrderIfThereAreOtherOrdersInThatTimeInThatTableInThatRestaurant() throws IOException {
        List<Order> orders = new ArrayList<>();
        orders.add(Order.builder().build());

        when(orderRepository.findAllOrdersByTableInTime(orderDto.getTableId(), startDate, finishDate))
            .thenReturn(orders);

        OrderDto createdOrder = orderServiceImpl.saveOrder(orderDto);

        assertNull(createdOrder);
    }

    @Test
    public void personCanNotMakeOrderWhenNumberOfVisitorsMoreThanTableCapacity() throws IOException {

        Order newOrder = Order.builder()
            .table(restaurantTable)
            .person(person)
            .startTime(startDate)
            .finishTime(finishDate)
            .visitors(5)
            .build();

        var order = Mockito.mock(Order.class);
        when(orderMapper.fromDtoToOrder(any(OrderDto.class))).thenReturn(order);
        when(orderMapper.fromOrderToDto(newOrder)).thenReturn(orderDto);

        OrderDto newOrderDto = orderMapper.fromOrderToDto(newOrder);
        OrderDto createdOrder = orderServiceImpl.saveOrder(newOrderDto);
        when(orderRepository.save(newOrder)).thenReturn(newOrder);

        assertNull(createdOrder);
    }

    @Test
    public void personCanNotMakeOrderWhenStartTimeBiggerThanFinishTime() throws IOException {
        LocalDateTime start = LocalDateTime.now().plusDays(3);
        LocalDateTime finish = LocalDateTime.now().plusMinutes(40).plusDays(2);
        Date startDate = Date.from(start.atZone(ZoneId.systemDefault()).toInstant());
        Date finishDate = Date.from(finish.atZone(ZoneId.systemDefault()).toInstant());

        OrderDto orderDto = OrderDto.builder()
            .tableId(restaurantTable.getId())
            .personId(person.getId())
            .startTime(startDate)
            .finishTime(finishDate)
            .visitors(3)
            .build();

        Order newOrder = orderMapper.fromDtoToOrder(orderDto);

        when(orderRepository.findAllOrdersByTableInTime(orderDto.getTableId(), startDate, finishDate))
            .thenReturn(Collections.emptyList());
        when(orderRepository.save(newOrder)).thenReturn(newOrder);

        OrderDto createdOrder = orderServiceImpl.saveOrder(orderDto);

        assertNull(createdOrder);
    }

    @Test
    public void personCanNotMakeOrderWhenStartTimeLessThanCurrentTime() throws IOException {
        LocalDateTime start = LocalDateTime.now().minusDays(1);
        LocalDateTime finish = LocalDateTime.now().plusMinutes(40).plusDays(2);
        Date startDate = Date.from(start.atZone(ZoneId.systemDefault()).toInstant());
        Date finishDate = Date.from(finish.atZone(ZoneId.systemDefault()).toInstant());

        OrderDto orderDto = OrderDto.builder()
            .tableId(restaurantTable.getId())
            .personId(person.getId())
            .startTime(startDate)
            .finishTime(finishDate)
            .visitors(3)
            .build();

        Order newOrder = orderMapper.fromDtoToOrder(orderDto);

        when(orderRepository.findAllOrdersByTableInTime(orderDto.getTableId(), startDate, finishDate))
            .thenReturn(Collections.emptyList());
        when(orderRepository.save(newOrder)).thenReturn(newOrder);

        OrderDto createdOrder = orderServiceImpl.saveOrder(orderDto);

        assertNull(createdOrder);
    }

    @Test
    public void personCanNotMakeOrderWhenPersonDoesNotExist() throws IOException {
        Person anotherPerson = new Person();
        anotherPerson.setId(2L);

        OrderDto orderDto = OrderDto.builder()
            .tableId(restaurantTable.getId())
            .personId(anotherPerson.getId())
            .startTime(startDate)
            .finishTime(finishDate)
            .visitors(3)
            .build();

        Order newOrder = orderMapper.fromDtoToOrder(orderDto);

        when(orderRepository.save(newOrder)).thenReturn(newOrder);

        OrderDto createdOrder = orderServiceImpl.saveOrder(orderDto);

        assertNull(createdOrder);
    }
}
