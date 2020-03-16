package com.lunchtime.service;

import com.lunchtime.models.Event;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface EventService {

    List<Event> findAll(Date date);

    List<Event> findByCategory(Date date, String category);

    List<Event> findByDate(Date startDate, Date endDate);

    Optional<Event> findById(Long id);

    void save(Event event);
}
