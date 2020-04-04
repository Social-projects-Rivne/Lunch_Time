package com.lunchtime.controllers;

import com.lunchtime.models.Order;
import com.lunchtime.models.Restaurant;
import com.lunchtime.service.OrderService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(@Valid @RequestBody Order order) throws URISyntaxException {
        if (order.getId() != null) {
            return ResponseEntity.badRequest()
                .build();
        }

        Order result = orderService.save(order);
        if (result == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.created(new URI("/api/orders"))
            .body(result);
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders(Pageable pageable) {
        Page<Order> page = orderService.findAll(pageable);
        return ResponseEntity.ok()
            .body(page.getContent());
    }

    @GetMapping("{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        Optional<Order> optional = orderService.findById(id);
        return optional.map(order -> ResponseEntity.ok()
            .body(order)).orElseGet(() -> ResponseEntity.notFound()
            .build());
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        Order order = orderService.delete(id);
        if (order == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok()
            .build();
    }
}
