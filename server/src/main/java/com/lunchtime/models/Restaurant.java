package com.lunchtime.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.Instant;

@Entity
@Where(clause = "is_deleted = false or is_deleted is NULL")
@Setter
@Getter
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    @Column(name = "name")
    private String name;

    @NotBlank
    @Email
    @Column(name = "email")
    private String email;

    @NotBlank
    @Column(name = "text_address")
    private String textAddress;

    @Column(name = "website")
    private String website;

    @NotBlank
    @Column(name = "description")
    private String description;

    @NotBlank
    @Column(name = "working_time")
    private String workingTime;

    @Column(name = "is_deleted")
    private Boolean isDeleted;

    @Column(name = "menu_id")
    private Long menuId;

    @ManyToOne
    @NotNull
    @JsonIgnore
    @JoinColumn(name = "person_id")
    private Person person;

    @Column(name = "tables")
    private Integer tables;

    @Column(name = "longitude")
    private Float longitude;

    @Column(name = "latitude")
    private Float latitude;

    @Column(name = "created_at")
    @CreationTimestamp
    private Instant createdAt;

    @Column(name = "created_by")
    private Long createdBy;

    @Column(name = "modify_at")
    @UpdateTimestamp
    private Instant modifyAt;

    @Column(name = "modify_by")
    private Long modifyBy;

    public Boolean isDeleted() {
        if (isDeleted == null) {
            return false;
        }
        return isDeleted;
    }

    public void setDeleted(Boolean deleted) {
        isDeleted = deleted;
    }

    public Restaurant() {    }

    public Restaurant(String name,
                      String email, String textAddress,
                      String website, String description,
                      String workingTime, Boolean isDeleted,
                      Long menuId, Person person,
                      Integer tables, Float longitude,
                      Float latitude, Instant createdAt,
                      Long createdBy, Instant modifyAt,
                      Long modifyBy) {

        this.name = name;
        this.email = email;
        this.textAddress = textAddress;
        this.website = website;
        this.description = description;
        this.workingTime = workingTime;
        this.isDeleted = isDeleted;
        this.menuId = menuId;
        this.person = person;
        this.tables = tables;
        this.longitude = longitude;
        this.latitude = latitude;
        this.createdAt = createdAt;
        this.createdBy = createdBy;
        this.modifyAt = modifyAt;
        this.modifyBy = modifyBy;
    }
}
