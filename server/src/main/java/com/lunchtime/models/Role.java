package com.lunchtime.models;


import lombok.Data;

import javax.persistence.*;
import java.util.List;


@Entity
@Table(name = "role")
@Data
public class Role  {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "name")
    private String name;



}
