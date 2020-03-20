package com.lunchtime.models;


import java.time.Instant;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.Where;


@Entity
@Where(clause = "is_deleted = false or is_deleted is NULL")
@Setter
@Getter
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    @Column(name = "name", length = 100)
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
    @Column(name = "description", length = 255)
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
    @JoinColumn(name = "person_id", nullable = false)
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


    @ManyToMany(fetch = FetchType.EAGER, mappedBy = "restaurant")
    private Set<MenuItemDish> menuItemDish;

    public Set<MenuItemDish> getMenuItemDish() {
        return menuItemDish;
    }

    public void setUsers(Set<MenuItemDish> users) {
        this.menuItemDish = users;
    }

    public Restaurant getPerson() {

        return this.getPerson();
    }

    public void setPerson(Person person2) {
        this.person = person2;

    }

}





