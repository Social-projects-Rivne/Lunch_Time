package com.lunchtime.models;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.List;


@Entity
@Table(name = "users")
@Data
public class User extends BaseEntity {


    @Column(name = "username")
    private String userName;

    @Column(name = "email")
    private String email;

    @Column(name = "phone_nomber")
    private Integer phone;

    @Column(name = "avatar_url")
    private String photoURL;

    @Column(name = "password")
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles",
        joinColumns = {@JoinColumn(name ="user_id",referencedColumnName = "id")},
        inverseJoinColumns = {@JoinColumn(name="role_id",referencedColumnName = "id")})

    private List<Role> roles;
}

