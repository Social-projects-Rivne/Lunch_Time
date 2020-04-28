package com.lunchtime.models;

import java.time.Instant;
import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Setter
@Getter
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(min = 1, max = 100)
    @Column(name = "name", length = 100)
    private String name;

    @NotBlank
    @Email
    @Column(name = "email")
    private String email;

    @NotBlank
    @Size(min = 1, max = 255)
    @Column(name = "text_address")
    private String textAddress;

    @Size(max = 255)
    @Column(name = "website")
    private String website;

    @NotBlank
    @Size(min = 1, max = 255)
    @Column(name = "description")
    private String description;

    @NotBlank
    @Size(min = 1, max = 255)
    @Column(name = "working_time")
    private String workingTime;

    @Column(name = "is_deleted")
    private boolean isDeleted;

    @NotNull
    @Column(name = "person_id")
    private Long personId;

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

    public Restaurant() {

    }

}





