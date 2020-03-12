package com.lunchtime.service;

import com.lunchtime.entity.Event;
import com.lunchtime.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class EventServiceImpl implements EventService {


    @Autowired
    EventRepository eventRepository;

    public List<Event> findAll(Date date) {
        return eventRepository.findByDateGreaterThanAndIsActiveTrueOrderByDateAsc(date);
    }

    public void save(Event event) {
        eventRepository.save(event);
    }
}
