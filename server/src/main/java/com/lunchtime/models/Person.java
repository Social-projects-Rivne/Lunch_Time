package com.lunchtime.models;

import com.lunchtime.enums.Status;
import lombok.Builder;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.time.Instant;

@Entity
@Table(name = "person")
@Builder
@Data
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "avatar_url")
    private String photoUrl;

    @NotBlank
    @Pattern(regexp = "^.{1,50}$")
    @Column(name = "name")
    private String name;

    @NotBlank
    @Email
    @Column(name = "email", unique = true)
    private String email;

    @NotBlank
    @Pattern(regexp = "^(?!(.)\\1+$).{8,40}$")
    @Column(name = "password")
    private String password;

    @NotBlank
    @Pattern(regexp = "^\\+[0-9]{7,16}$")
    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "is_deleted")
    private boolean isDeleted;

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
}
