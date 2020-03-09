package com.lunchtime.service;

import com.lunchtime.entity.Event;
import com.lunchtime.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Service
public class EventServiceImpl implements EventService {


    @Autowired
    EventRepository eventRepository;

    public List<Event> findByActiveTrue() {
        return eventRepository.findByActiveTrue();
    }

    public Optional<Event> findById(Long id) { return eventRepository.findById(id); }

    public List<Event> findByCategory(String category) {
        return eventRepository.findByCategory(category);
    }

    public List<Event> findByDate(Date data) {
        return eventRepository.findByDate(data);
    }

    public List<Event> findByDateBetween(Date startDate, Date endDate) {
        return eventRepository.findByDateBetween(startDate, endDate);
    }

    public void save(Event event) {
        eventRepository.save(event);
    }

    public void deleteById(Long id) {
        eventRepository.deleteById(id);
    }

    public boolean existsById(Long id) {
        return eventRepository.existsById(id);
    }

}
