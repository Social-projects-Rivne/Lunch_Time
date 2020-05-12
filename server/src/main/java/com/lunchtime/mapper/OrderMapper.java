package com.lunchtime.mapper;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lunchtime.models.MenuItemDish;
import com.lunchtime.models.Order;
import com.lunchtime.models.OrderDish;
import com.lunchtime.repository.MenuItemDishRepository;
import com.lunchtime.service.dto.OrderDto;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
@RequiredArgsConstructor
public class OrderMapper {
    private final MenuItemDishRepository menuItemDishRepository;

    public Order fromDtoToOrder(OrderDto orderDto) throws IOException {
        Order order = new Order();

        if (orderDto.getOrderedDishes() != null) {
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Integer> map = objectMapper.readValue(orderDto.getOrderedDishes().toString(), Map.class);

            for (Map.Entry<String, Integer> entry : map.entrySet()) {
                OrderDish orderDish = new OrderDish();
                MenuItemDish dish = menuItemDishRepository.findMenuItemDishById(Long.valueOf(entry.getKey()));
                Integer quantity = entry.getValue();
                orderDish.setMenuItemDish(dish);
                orderDish.setQuantity(quantity);
                order.addOrderDish(orderDish);
            }
        }

        order.setStartTime(orderDto.getStartTime());
        order.setFinishTime(orderDto.getFinishTime());
        order.setDescription(orderDto.getDescription());
        order.setVisitors(orderDto.getVisitors());
        ;

        return order;
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
