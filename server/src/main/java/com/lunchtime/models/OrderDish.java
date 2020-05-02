package com.lunchtime.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "order_dish")
public class OrderDish {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToMany(mappedBy = "orderDishList")
    private List<Order> order = new ArrayList<>();

    @OneToOne(optional = false)
    @JoinColumn(name = "menu_item_dish_id", referencedColumnName = "id")
    private MenuItemDish menuItemDish;

    @NotNull
    @Column(name = "quantity")
    private Integer quantity;

//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (!(o instanceof OrderDish )) return false;
//        return id != null && id.equals(((OrderDish) o).getId());
//    }
//
//    @Override
//    public int hashCode() {
//        return 31;
//    }
}
