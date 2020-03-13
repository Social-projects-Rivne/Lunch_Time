package com.lunchtime.repository;

import com.lunchtime.models.Event;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;


public interface EventRepository extends CrudRepository<Event, Long> {

    default List<Event> findAll(Date date) {
        return findByDateGreaterThanAndIsActiveTrueOrderByDateAsc(date);
    }

    List<Event> findByDateGreaterThanAndIsActiveTrueOrderByDateAsc(Date date);
}
