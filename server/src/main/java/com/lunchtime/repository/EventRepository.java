package com.lunchtime.repository;

import com.lunchtime.entity.Event;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;


public interface EventRepository extends CrudRepository<Event, Long> {

    List<Event> findByDateGreaterThanAndIsActiveTrueOrderByDateAsc(Date date);
}
