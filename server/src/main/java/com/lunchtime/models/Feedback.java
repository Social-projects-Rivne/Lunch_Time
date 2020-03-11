package com.lunchtime.models;

import lombok.Setter;
import lombok.Getter;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Getter @Setter
public class Feedback {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column(name="description", columnDefinition="TEXT")
  private String description;

  @Column(name = "is_active")
  private Boolean isActive;

  @Column(name = "date")
  private Date date;

  @Column(name = "user_name")
  private String userName;

  @Column(name = "rest_id")
  private Long restId;

  @Column(name = "counter_like")
  private Integer counterLike;

  @Column(name = "counter_dislike")
  private Integer counterDislike;

  Feedback(){ }

}
