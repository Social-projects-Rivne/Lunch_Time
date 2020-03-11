package com.lunchtime.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity

public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @NotBlank
    @Column(name = "name", length = 50)
    private String nameRestaurant;
    
    @NotBlank
    @Column(name = "text_adress", length = 100)
        private String textAdress;
    
    @NotBlank
    @Email
    @Column(name = "email", length = 100)
        private String email;
    
    @NotBlank
    @Column(name = "website_url", length = 255)
        private String websiteUrl;
    
    @NotBlank
    @Column(name = "description", length = 300)
        private String description;
    
    @Column(name = "table_count")
        private Long tableCount;
    
    @Column(name = "working_time", length = 100)
        private String workingTime;
    
    @Column(name = "longtitude", length = 100)
        private String longtitude;
    
    @Column(name = "latitude", length = 100)
        private String latitude;
}


