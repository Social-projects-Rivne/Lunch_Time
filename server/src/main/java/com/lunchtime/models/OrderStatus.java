package com.lunchtime.models;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.Instant;

@NoArgsConstructor
@Entity
@Data
public class OrderStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 32)
    @Column(name = "name")
    private String name;

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

    private OrderStatus(OrderStatusBuilder builder) {
        this.id = builder.id;
        this.name = builder.name;
        this.isDeleted = builder.isDeleted;
        this.createdAt = builder.createdAt;
        this.createdBy = builder.createdBy;
        this.modifyAt = builder.modifyAt;
        this.modifyBy = builder.modifyBy;
    }

    public static class OrderStatusBuilder {
        private Long id;
        private String name;
        private boolean isDeleted;
        private Instant createdAt;
        private Long createdBy;
        private Instant modifyAt;
        private Long modifyBy;

        public OrderStatusBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public OrderStatusBuilder name(String name) {
            this.name = name;
            return this;
        }

        public OrderStatusBuilder deleted(boolean deleted) {
            isDeleted = deleted;
            return this;
        }

        public OrderStatusBuilder createdAt(Instant createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public OrderStatusBuilder createdBy(Long createdBy) {
            this.createdBy = createdBy;
            return this;
        }

        public OrderStatusBuilder modifyAt(Instant modifyAt) {
            this.modifyAt = modifyAt;
            return this;
        }

        public OrderStatusBuilder modifyBy(Long modifyBy) {
            this.modifyBy = modifyBy;
            return this;
        }

        public OrderStatus build() {
            return new OrderStatus(this);
        }
    }
}
