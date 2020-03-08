package com.lunchtime.repository;

import com.lunchtime.entity.Event;
import org.springframework.data.repository.CrudRepository;

import java.sql.Date;
import java.util.List;


public interface EventRepository extends CrudRepository<Event, Long> {

    @Override
    List<Event> findAll();

    List<Event> findByCategory(String category);

    List<Event> findByDate(Date data);

    List<Event> findByDateBetween(Date startDate, Date endDate);

}
