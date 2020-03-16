package com.lunchtime.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Setter;
import lombok.Getter;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.hibernate.engine.profile.Fetch;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Setter
@Getter
public class Feedback {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "date")
    private Date date;

    @Column(name = "user_name")
    private String userName;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    @JoinColumn(name = "rest_id",referencedColumnName = "id")
    private Restaurant restId;

    @Column(name = "counter_like")
    private Integer counterLike;

    @Column(name = "counter_dislike")
    private Integer counterDislike;

    Feedback() {   }

}
