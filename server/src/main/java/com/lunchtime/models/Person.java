package com.lunchtime.models;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import javax.validation.constraints.NotBlank;
import java.time.Instant;
import javax.persistence.*;
import javax.validation.constraints.Email;



@Entity
@Data
@Table(name = "person")
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    @NotBlank
    @Column(name = "username", unique = true)
    private String userName;
    @NotBlank
    @Email
    @Column(name = "email", unique = true)
    private String email;
    @NotBlank
    @Column(name = "phone_nomber")
    private Integer phone;

    @Column(name = "avatar_url")
    private String photoUrl;
    @NotBlank
    @Column(name = "password")
    private String password;


    @Column(name = "is_deleted")
    private Boolean isDeleted;

    @Column(name = "role_id")
    private Long roleId;

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


    @Enumerated(EnumType.STRING)
    @Column(name = "status", columnDefinition = "varchar(50) default 'ACTIVE'")
    private Status status;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles",
        joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "id")},
        inverseJoinColumns = {@JoinColumn(name = "role_id", referencedColumnName = "id")})

    private Role role;

    public Person() {
    }
  
    public Boolean isDeleted() {
        if (isDeleted == null) {
            return false;
        }
        return isDeleted;
    }

    public void setDeleted(Boolean deleted) {
        isDeleted = deleted;
    }
}

