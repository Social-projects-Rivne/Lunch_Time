package com.lunchtime.repository;

import com.lunchtime.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("select o from Order o where (o.table.restaurant.id = :id) and "
        + "((o.startTime Between :start and :finish) or (o.finishTime Between :start and :finish))")
    List<Order> findAllOrdersByRestaurantIdInTime(
        @Param("id") Long id, @Param("start") Date start, @Param("finish") Date finish);
}