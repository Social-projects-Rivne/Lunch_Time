package com.lunchtime.service;

import com.lunchtime.models.Event;
import com.lunchtime.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class EventServiceImpl implements EventService {


    private final EventRepository eventRepository;

    public EventServiceImpl(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<Event> findAll(Date date) {
        return eventRepository.findAll(date);
    }

    public List<Event> findByCategory(Date date, String category) {
        return eventRepository.findByCategory(date, category);
    }

    public List<Event> findByDate(Date startDate, Date endDate){
        return eventRepository.findByDateBetweenAndIsActiveTrueOrderByDateAsc(startDate , endDate);
    }

    public Optional<Event> findById(Long id) {
        return eventRepository.findById(id);
    }

    public void save(Event event) {
        eventRepository.save(event);
    }
}
