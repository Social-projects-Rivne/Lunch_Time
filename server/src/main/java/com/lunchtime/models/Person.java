package com.lunchtime.models;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.time.Instant;


@Entity
@Table(name = "person")
@Data

public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "username", unique = true)
    private String userName;

    @Column(name = "email", unique = true)
    @Email
    private String email;

    @Column(name = "phone_nomber")
    private Integer phone;

    @Column(name = "avatar_url")
    private String photoUrl;

    @Column(name = "password")
    private String password;

    @Column(name = "created_time")
    @CreationTimestamp
    private Instant createdTime;

    @Column(name = "created_by")
    private Long createdBy;

    @Column(name = "modify_time")
    @UpdateTimestamp
    private Instant modifyTime;

    @Column(name = "modify_by")
    private Long modifyBy;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", columnDefinition = "varchar(50) default 'ACTIVE'")
    private Status status;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles",
        joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "id")},
        inverseJoinColumns = {@JoinColumn(name = "role_id", referencedColumnName = "id")})

    private Role role;

    public String getRole() {
        return role.getName();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getPhone() {
        return phone;
    }

    public void setPhone(Integer phone) {
        this.phone = phone;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Instant getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(Instant createdTime) {
        this.createdTime = createdTime;
    }

    public Long getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }

    public Instant getModifyTime() {
        return modifyTime;
    }


    public Long getModifyBy() {
        return modifyBy;
    }

    public void setModifyBy(Long modifyBy) {
        this.modifyBy = modifyBy;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Person() {
    }
}

