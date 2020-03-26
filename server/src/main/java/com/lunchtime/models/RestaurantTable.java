package com.lunchtime.models;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.Instant;

@Entity
@Data
public class RestaurantTable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(name = "number")
    private Integer number;

    @NotNull
    @Column(name = "capacity")
    private Integer capacity;

    @Column(name = "is_available")
    private Boolean isAvailable;

    @Column(name = "description")
    private String description;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "restaurant_id", referencedColumnName = "id")
    private Restaurant restaurant;

    @Column(name = "is_deleted")
    private Boolean isDeleted;

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

    public Boolean isAvailable() {
        if (isAvailable == null) {
            return false;
        }
        return isAvailable;
    }

    public void setAvailable(Boolean available) {
        isAvailable = available;
    }

    public Boolean isDeleted() {
        if (isDeleted == null) {
            return false;
        }
        return isDeleted;
    }

    public void setDeleted(Boolean deleted) {
        isDeleted = deleted;
    }
}
