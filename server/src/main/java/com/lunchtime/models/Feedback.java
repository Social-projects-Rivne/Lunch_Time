package com.lunchtime.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(name = "description", length = 400)
    private String description;

    @ColumnDefault("true")
    @Column(name = "is_active")
    private Boolean isActive;

    @NotNull
    @Column(name = "date")
    private Date date;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "person",referencedColumnName = "id")
    private Person person;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "rest_id",referencedColumnName = "id")
    private Restaurant restId;

    @ColumnDefault("0")
    @Column(name = "counter_like")
    private Integer counterLike;

    @ColumnDefault("0")
    @Column(name = "counter_dislike")
    private Integer counterDislike;

    public Feedback() {   }

    public Feedback(String description, Boolean isActive, Date date,
                    Person person, Restaurant restId, Integer counterLike, Integer counterDislike) {
        this.description = description;
        this.isActive = isActive;
        this.date = date;
        this.person = person;
        this.restId = restId;
        this.counterLike = counterLike;
        this.counterDislike = counterDislike;
    }

}
