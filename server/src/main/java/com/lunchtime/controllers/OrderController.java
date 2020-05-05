package com.lunchtime.controllers;

import com.lunchtime.models.Order;
import com.lunchtime.service.OrderService;
import com.lunchtime.service.dto.OrderDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<OrderDto> createOrder(
        @Valid @RequestBody OrderDto orderDto) throws URISyntaxException, IOException {
        if (orderDto.getId() != null) {
            return ResponseEntity.badRequest()
                .build();
        }

        OrderDto result = orderService.saveOrder(orderDto);
        if (result == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.created(new URI("/api/orders"))
            .body(result);
    }

    @GetMapping
    public ResponseEntity<Page<Order>> getAllOrders(Pageable pageable) {
        Page<Order> page = orderService.getAllOrders(pageable);
        return ResponseEntity.ok()
            .body(page);
    }

    @GetMapping("{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        Optional<Order> optional = orderService.getOrderById(id);
        return optional.map(order -> ResponseEntity.ok()
            .body(order)).orElseGet(() -> ResponseEntity.notFound()
            .build());
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        Order order = orderService.deleteOrder(id);
        if (order == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok()
            .build();
    }
}
