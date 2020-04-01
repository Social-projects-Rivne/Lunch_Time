package com.lunchtime.controllers;

import com.lunchtime.models.OrderStatus;
import com.lunchtime.service.OrderStatusService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/order-status")
public class OrderStatusController {

    private final OrderStatusService orderStatusService;

    public OrderStatusController(OrderStatusService orderStatusService) {
        this.orderStatusService = orderStatusService;
    }

    @PostMapping
    public ResponseEntity<OrderStatus> create(
        @Valid @RequestBody OrderStatus orderStatus
    ) throws URISyntaxException {
        if (orderStatus.getId() != null) {
            return ResponseEntity.badRequest()
                .build();
        }

        OrderStatus result = orderStatusService.save(orderStatus);
        return ResponseEntity.created(new URI("/api/order-status"))
            .body(result);
    }

    @GetMapping
    public ResponseEntity<List<OrderStatus>> getAll() {
        List<OrderStatus> statuses = orderStatusService.findAll();
        return ResponseEntity.ok()
            .body(statuses);
    }

    @GetMapping("{id}")
    public ResponseEntity<OrderStatus> getOrderStatusById(@PathVariable Long id) {
        Optional<OrderStatus> statuses = orderStatusService.findById(id);
        return statuses.map(orderStatus -> ResponseEntity.ok()
            .body(orderStatus)).orElseGet(() -> ResponseEntity.notFound()
            .build());
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        OrderStatus status = orderStatusService.delete(id);
        if (status == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok()
            .build();
    }
}
