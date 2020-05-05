package com.lunchtime.service;

import com.lunchtime.models.Event;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface EventService {
    List<Event> getEventList();

    List<Event> getEventListByCategory(String[] category);

    List<Event> getEventListByDay(Date date);

    List<Event> getEventListByDateBetween(Date startDate, Date endDate);

    List<Event> getEventListByMonth(String month);

    List<Event> getEventByRestaurantId(Long id);

    Optional<Event> getEventById(Long id);

    Optional<Event> deleteEventById(Long id);

    void saveEvent(Event event);
}
