package com.lunchtime.models;

import lombok.Setter;
import lombok.Getter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.Instant;
import java.util.Set;

@Entity
@Setter
@Getter
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "description")
    @Size(min = 10, max = 1000)
    private String description;

    @ColumnDefault("true")
    @Column(name = "is_active")
    private boolean isActive;

    @NotNull
    @Column(name = "date")
    private Instant date;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "person_id", referencedColumnName = "id")
    private Person person;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "restaurant_id", referencedColumnName = "id")
    private Restaurant restaurant;

    @ManyToMany
    @ColumnDefault("0")
    @JoinTable(
        name = "feedback_like",
        joinColumns = @JoinColumn(name = "feedback_id"),
        inverseJoinColumns = @JoinColumn(name = "person_id"))
    private Set<Person> likes;

    @ManyToMany
    @ColumnDefault("0")
    @JoinTable(
        name = "feedback_dislike",
        joinColumns = @JoinColumn(name = "feedback_id"),
        inverseJoinColumns = @JoinColumn(name = "person_id"))
    private Set<Person> dislikes;

    @ColumnDefault("0")
    @Column(name = "counter_dislike")
    private Integer counterDislike;

    public Feedback() {
    }
}
