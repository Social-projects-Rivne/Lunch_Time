package com.lunchtime.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.net.URI;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@ToString
@Setter
@Getter
@Entity
@Table(name = "event")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "restaurant",referencedColumnName = "id")
    private Restaurant restaurant;

    @NotNull
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "date")
    private Date date;

    @NotNull
    @Column(name = "image")
    private URI image;

    @NotBlank
    @Size(min = 6, max = 255)
    @Column(name = "name")
    private String name;

    @NotBlank
    @Column(name = "category")
    private String category;

    @NotBlank
    @Size(min = 6, max = 999)
    @Column(name = "description")
    private String description;

    @NotNull
    @Column(name = "is_active")
    private Boolean isActive;

    public void setDate(String date) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        format.setLenient(false);
        try {
            this.date = format.parse(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }
}
