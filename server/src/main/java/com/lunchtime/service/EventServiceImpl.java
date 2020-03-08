package com.lunchtime.service;

import com.lunchtime.entity.Event;
import com.lunchtime.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
public class EventServiceImpl implements EventService {


    @Autowired
    EventRepository eventRepository;

    public List<Event> findAll() {
        return eventRepository.findAll();
    }

    public List<Event> findByCategory(String category) {
        return eventRepository.findByCategory(category);
    }

    public List<Event> findByDate(Date data) {
        return eventRepository.findByDate(data);
    }

    public List<Event> findByDateBetween(Date startDate, Date endDate) {
        return eventRepository.findByDateBetween(startDate, endDate);
    }

    public void saveOrUpdateEvent(Event event) {
        eventRepository.save(event);
    }

    public void deleteEvent(long id) {
        eventRepository.deleteById(id);
    }
}
