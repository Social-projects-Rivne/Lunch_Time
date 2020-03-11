package com.lunchtime.models;

import lombok.Setter;
import lombok.Getter;

import javax.persistence.*;
import java.sql.Date;

@Entity
public class Feedback {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Getter @Setter
  private Long id;

  @Column(name="description", columnDefinition="TEXT")
  @Getter @Setter
  private String description;

  @Getter @Setter
  private Boolean isActive;

  @Getter @Setter
  private Date date;

  @Getter @Setter
  private String userName;

  @Getter @Setter
  private Long restId;

  @Getter @Setter
  private Integer counterLike;

  @Getter @Setter
  private Integer counterDislike;


  Feedback(){ }



}
