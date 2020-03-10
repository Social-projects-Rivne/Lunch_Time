package com.lunchtime.service;

import com.lunchtime.entity.Event;

import java.util.Date;
import java.util.List;

public interface EventService {

    List<Event> findAll(Date date);

    void save(Event event);
}
