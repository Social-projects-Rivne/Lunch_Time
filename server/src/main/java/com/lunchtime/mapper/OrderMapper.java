package com.lunchtime.mapper;

import com.lunchtime.models.Order;
import com.lunchtime.models.Person;
import com.lunchtime.models.RestaurantTable;
import com.lunchtime.service.dto.OrderDto;
import org.springframework.stereotype.Component;

@Component
public class OrderMapper {

    public Order fromDtoToOrder(OrderDto orderDto) {
        Person person = Person.builder()
            .id(orderDto.getPersonId()).build();
        RestaurantTable table = new RestaurantTable();
        table.setId(orderDto.getTableId());

        return Order.builder()
            .person(person)
            .startTime(orderDto.getStartTime())
            .finishTime(orderDto.getFinishTime())
            .description(orderDto.getDescription())
            .table(table)
            .visitors(orderDto.getVisitors())
            .orderDishList(orderDto.getOrderedDishes())
            .build();
    }

    public OrderDto fromOrderToDto(Order order) {

        return OrderDto.builder()
            .id(order.getId())
            .personId(order.getPerson().getId())
            .startTime(order.getStartTime())
            .finishTime(order.getFinishTime())
            .status(order.getStatus())
            .orderedDishes(order.getOrderDishList())
            .description(order.getDescription())
            .visitors(order.getVisitors())
            .tableId(order.getTable().getId())
            .isDeleted(order.isDeleted())
            .createdAt(order.getCreatedAt().toString())
            .createdBy(order.getPerson().getId())
            .build();
    }
}
