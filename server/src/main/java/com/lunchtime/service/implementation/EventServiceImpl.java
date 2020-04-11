package com.lunchtime.service.implementation;

import com.lunchtime.models.Event;
import com.lunchtime.repository.EventRepository;
import com.lunchtime.service.EventService;
import com.lunchtime.util.Validator;
import org.springframework.stereotype.Service;

import java.time.Month;
import java.util.*;
import java.util.concurrent.TimeUnit;

@Service
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;

    public EventServiceImpl(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<Event> getEventList() {
        return eventRepository.findAll(new Date());
    }

    public List<Event> getEventListByCategory(String[] category) {
        return eventRepository.findAllByCategory(new Date(), category);
    }

    public List<Event> getEventListByDay(Date date) {
        Date end = new Date(date.getTime() + TimeUnit.DAYS.toMillis(1));
        return eventRepository.findAllByDateBetween(date, end);
    }

    public List<Event> getEventListByDateBetween(Date startDate, Date endDate) {
        Date end = new Date(endDate.getTime() + TimeUnit.DAYS.toMillis(1));
        return eventRepository.findAllByDateBetween(startDate, end);
    }

    public List<Event> getEventListByMonth(String month) throws IllegalArgumentException {
        int monthOrdinal = Month.valueOf(month.toUpperCase()).ordinal();
        int currentYear = Calendar.getInstance().get(Calendar.YEAR);
        int currentMonth = Calendar.getInstance().get(Calendar.MONTH);
        if (monthOrdinal < currentMonth) {
            currentYear++;
        }
        Date start = new GregorianCalendar(currentYear, monthOrdinal, 1).getTime();
        Date end = new GregorianCalendar(currentYear, monthOrdinal + 1, 1).getTime();
        return eventRepository.findAllByDateBetween(start, end);
    }

    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }

    public Optional<Event> deleteEventById(Long id) {
        Optional<Event> result = getEventById(id);
        if (result.isPresent()) {
            Event event = result.get();
            event.setDeleted(true);
            saveEvent(event);
            return Optional.of(event);
        }
        return Optional.empty();
    }

    public void saveEvent(Event event) throws IllegalArgumentException {
        String category = event.getCategory();
        if (Validator.checkCategory(category)) {
            eventRepository.save(event);
        } else {
            throw new IllegalArgumentException();
        }
    }
}
