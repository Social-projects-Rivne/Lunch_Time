package com.lunchtime.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.net.URI;
import java.sql.Date;

@ToString
@Setter
@Getter
@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private long restaurantId;
    private Date date;
    private URI eventImage;
    private String eventName;
    private String category;
    private String description;

    /**
     * An empty constructor is needed to create a new instance via
     * reflection by persistence framework.
     */
    public Event() {
    }

}
