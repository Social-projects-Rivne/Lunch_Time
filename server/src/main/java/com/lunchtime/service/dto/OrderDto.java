package com.lunchtime.service.dto;

import com.lunchtime.models.OrderStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;
import org.json.JSONObject;

import javax.validation.constraints.NotNull;
import java.util.Date;

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

    private Object orderedDishes;

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
