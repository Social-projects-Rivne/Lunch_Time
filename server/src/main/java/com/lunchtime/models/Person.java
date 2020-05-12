package com.lunchtime.models;

import com.lunchtime.enums.Status;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.Instant;

@Entity
@Table(name = "person")
@Builder
@AllArgsConstructor
@Getter
@Setter
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 255)
    @Column(name = "avatar_url")
    private String photoUrl;

    @NotBlank
    @Size(min = 1, max = 255)
    @Pattern(regexp = "^.{1,50}$")
    @Column(name = "name")
    private String name;

    @NotBlank
    @Email
    @Column(name = "email", unique = true)
    private String email;

    @NotBlank
    @Size(min = 1, max = 255)
    @Column(name = "password")
    private String password;

    @NotBlank
    @Size(min = 1, max = 255)
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

    public Person() {
    }
}
