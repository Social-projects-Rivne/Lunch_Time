package com.lunchtime.service;

import com.lunchtime.entity.Event;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

public interface EventService {

    List<Event> findByActiveTrue();

    Optional<Event> findById(Long id);

    List<Event> findByCategory(String category);

    List<Event> findByDate(Date data);

    List<Event> findByDateBetween(Date startDate, Date endDate);

    void save(Event event);

    void deleteById(Long id);

    boolean existsById(Long id);
}
