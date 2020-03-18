package com.lunchtime.implementation;

import com.lunchtime.models.Event;
import com.lunchtime.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class EventService implements com.lunchtime.service.EventService {


    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<Event> findAll(Date date) {
        return eventRepository.findAll(date);
    }

    public void save(Event event) {
        eventRepository.save(event);
    }
}
