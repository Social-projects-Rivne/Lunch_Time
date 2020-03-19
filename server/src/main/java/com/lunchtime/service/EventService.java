package com.lunchtime.service;

import com.lunchtime.models.Event;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface EventService {

    List<Event> findAll();

    List<Event> findByCategory(String[] category);

    List<Event> findByDay(Date date);

    List<Event> findByDateBetween(Date startDate, Date endDate);

    List<Event> findByMonth(String month);

    Optional<Event> findById(Long id);

    Optional<Event> deleteById(Long id);

    void save(Event event);
}
