package com.lunchtime.service.dto;

import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import com.lunchtime.models.OrderStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.json.JSONObject;

import javax.validation.constraints.NotNull;
import java.util.Date;

@TypeDef(
    name = "jsonb",
    typeClass = JsonBinaryType.class
)
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

    @Type(type = "jsonb")
    private JSONObject orderedDishes;

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
