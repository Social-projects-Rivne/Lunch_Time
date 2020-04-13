package com.lunchtime.models;

import lombok.Setter;
import lombok.Getter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Date;

@Entity
@Setter
@Getter
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "description", length = 400)
    private String description;

    @ColumnDefault("true")
    @Column(name = "is_active")
    private boolean isActive;

    @NotNull
    @Column(name = "date")
    private Date date;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "person_id", referencedColumnName = "id")
    private Person person;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "restaurant_id", referencedColumnName = "id")
    private Restaurant restaurant;

    @ColumnDefault("0")
    @Column(name = "counter_like")
    private Integer counterLike;

    @ColumnDefault("0")
    @Column(name = "counter_dislike")
    private Integer counterDislike;

    public Feedback() {
    }
}
