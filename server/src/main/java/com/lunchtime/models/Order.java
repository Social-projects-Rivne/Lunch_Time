package com.lunchtime.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.*;

import javax.persistence.*;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.Instant;
import java.util.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Data
@Table(name = "ordering")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "person_id", referencedColumnName = "id")
    private Person person;

    @Column(name = "waiter_id")
    private Long waiter;

    @NotNull
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "start_time")
    private Date startTime;

    @NotNull
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "finish_time")
    private Date finishTime;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "status_id", referencedColumnName = "id")
    private OrderStatus status;

    @OneToMany(
        mappedBy = "order",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<OrderDish> orderDishList = new ArrayList<>();

    @Size(max = 999)
    @Column(name = "description")
    private String description;

    @NotNull
    @Column(name = "visitors")
    private Integer visitors;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "table_id", referencedColumnName = "id")
    private RestaurantTable table;

    @ColumnDefault("false")
    @Column(name = "is_deleted")
    private boolean isDeleted;

    @Column(name = "created_at")
    @CreationTimestamp
    private Instant createdAt;

    @Column(name = "created_by")
    private Long createdBy;

    @Column(name = "modify_at")
    @UpdateTimestamp
    private Instant modifyAt;

    @Column(name = "modify_by")
    private Long modifyBy;

    public void addOrderDish(OrderDish orderDish) {
        orderDishList.add(orderDish);
        orderDish.setOrder(this);
    }

    public void removeOrderDish(OrderDish orderDish) {
        orderDishList.remove(orderDish);
        orderDish.setOrder(null);
    }
}
