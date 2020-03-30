package com.lunchtime.controllers;

import com.lunchtime.models.OrderedTableStatus;
import com.lunchtime.service.OrderedTableStatusService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/table-status")
public class OrderedTableStatusController {

    private final OrderedTableStatusService orderedTableStatusService;

    public OrderedTableStatusController(OrderedTableStatusService orderedTableStatusService) {
        this.orderedTableStatusService = orderedTableStatusService;
    }

    @PostMapping
    public ResponseEntity<OrderedTableStatus> create(
        @Valid @RequestBody OrderedTableStatus orderedTableStatus
    ) throws URISyntaxException {
        if (orderedTableStatus.getId() != null) {
            return ResponseEntity.badRequest()
                .build();
        }

        OrderedTableStatus result = orderedTableStatusService.save(orderedTableStatus);
        return ResponseEntity.created(new URI("/api/table-status"))
            .body(result);
    }

    @GetMapping
    public ResponseEntity<List<OrderedTableStatus>> getAll() {
        List<OrderedTableStatus> statuses = orderedTableStatusService.findAll();
        return ResponseEntity.ok()
            .body(statuses);
    }

    @GetMapping("{id}")
    public ResponseEntity<OrderedTableStatus> getOrderedTableStatusById(@PathVariable Long id) {
        Optional<OrderedTableStatus> statuses = orderedTableStatusService.findById(id);
        return statuses.map(orderedTableStatus -> ResponseEntity.ok()
            .body(orderedTableStatus)).orElseGet(() -> ResponseEntity.notFound()
            .build());
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        OrderedTableStatus status = orderedTableStatusService.delete(id);
        if (status == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok()
            .build();
    }
}
