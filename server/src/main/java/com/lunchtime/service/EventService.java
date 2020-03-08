package com.lunchtime.service;

import com.lunchtime.entity.Event;

import java.util.List;

public interface EventService {

    List<Event> findAll();

    List<Event> findByCategory(String category);

    void saveOrUpdateEvent(Event event);

    void deleteEvent(long id);

}
