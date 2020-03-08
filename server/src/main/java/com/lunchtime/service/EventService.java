package com.lunchtime.service;

import com.lunchtime.entity.Event;

import java.sql.Date;
import java.util.List;

public interface EventService {

    List<Event> findAll();

    List<Event> findByCategory(String category);

    List<Event> findByDate(Date data);

    List<Event> findByDateBetween(Date startDate, Date endDate);

    void saveOrUpdateEvent(Event event);

    void deleteEvent(long id);

}
