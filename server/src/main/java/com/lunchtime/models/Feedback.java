package com.lunchtime.models;

import javax.persistence.*;
import java.sql.Date;

@Entity
public class Feedback {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column(name="description", columnDefinition="TEXT")
  private String description;
  private Boolean isActive;
  private Date date;
  private String userName;
  private Long restId;
  private Integer counterLike;
  private Integer counterDislike;

  public Boolean getActive() {
    return isActive;
  }

  public void setActive(Boolean active) {
    isActive = active;
  }

  public String getUserName() {
    return userName;
  }

  public void setUserName(String userName) {
    this.userName = userName;
  }

  public Long getRestId() {
    return restId;
  }

  public void setRestId(Long restId) {
    this.restId = restId;
  }

  public Integer getCounterLike() {
    return counterLike;
  }

  public void setCounterLike(Integer counterLike) {
    this.counterLike = counterLike;
  }

  public Integer getCounterDislike() {
    return counterDislike;
  }

  public void setCounterDislike(Integer counterDislike) {
    this.counterDislike = counterDislike;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Date getDate() {
    return date;
  }

  public void setDate(Date date) {
    this.date = date;
  }

  Feedback(){ }



}
