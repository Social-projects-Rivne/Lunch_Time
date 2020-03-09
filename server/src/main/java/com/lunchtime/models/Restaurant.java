package com.lunchtime.models;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Where;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

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

    @Column(name = "owner_id")
    private Long ownerId;

    @Column(name = "tables")
    private Integer tables;

    @Column(name = "longitude")
    private Float longitude;

    @Column(name = "latitude")
    private Float latitude;

    public Boolean getIsDeleted() {
        if (isDeleted == null) {
            return false;
        }
        return isDeleted;
    }
}
