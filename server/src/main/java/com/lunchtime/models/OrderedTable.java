package com.lunchtime.models;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.Instant;
import java.util.Date;

@Entity
@Data
public class OrderedTable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "status_id", referencedColumnName = "id")
    private OrderedTableStatus status;

    @NotNull
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "start_time")
    private Date startTime;

    @NotNull
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "finish_time")
    private Date finishTime;

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
}
