package com.lunchtime.service;

import com.lunchtime.models.Event;
import com.lunchtime.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class EventServiceImpl implements EventService {


    private final EventRepository eventRepository;

    public EventServiceImpl(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<Event> findAll(Date date) {
        return eventRepository.findAll(date);
    }

    public void save(Event event) {
        eventRepository.save(event);
    }
}
