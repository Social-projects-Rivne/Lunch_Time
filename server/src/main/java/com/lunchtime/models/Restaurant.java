package com.lunchtime.models;

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
//TODO It is a bad idea to add this stuff here. You should use it in repository.
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
    private boolean isDeleted;

    @Column(name = "menu_id")
    private Long menuId;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "person_id", referencedColumnName = "id")
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

    public Restaurant() {
    }
}
