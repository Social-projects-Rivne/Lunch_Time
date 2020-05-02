package com.lunchtime.service.dto;

import com.lunchtime.models.OrderDish;
import com.lunchtime.models.OrderStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
public class OrderDto {

    private Long id;

    @NotNull
    private Long personId;

    private Long waiterId;

    @NotNull
    private Date startTime;

    @NotNull
    private Date finishTime;

    private OrderStatus status;

    private List<OrderDish> orderedDishes;

    private String description;

    @NotNull
    private Integer visitors;

    @NotNull
    private Long tableId;

    private boolean isDeleted;

    private String createdAt;

    private Long createdBy;

    private String modifyAt;

    private Long modifyBy;

}
