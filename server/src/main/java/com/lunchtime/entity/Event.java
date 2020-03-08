package com.lunchtime.entity;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.net.URI;
import java.sql.Date;

@Setter
@Getter
@Entity
@Table(name = "events")
public class Event {


  @Id
  @GeneratedValue(strategy= GenerationType.AUTO)
  private long id;
  private long restaurantId;
  private Date date;
  private URI eventImage;
  private String eventName;
  private String category;
  private String description;

  public Event(){}

  @Override
  public String toString() {
    return "Event{" +
      "id=" + id +
      ", restaurantId=" + restaurantId +
      ", date=" + date +
      ", eventImage=" + eventImage +
      ", eventName='" + eventName + '\'' +
      ", category='" + category + '\'' +
      ", description='" + description + '\'' +
      '}';
  }
}
