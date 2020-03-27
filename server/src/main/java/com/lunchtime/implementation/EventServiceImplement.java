package com.lunchtime.implementation; //TODO should be in service package

import com.lunchtime.models.Event;
import com.lunchtime.repository.EventRepository;
import com.lunchtime.service.EventService;
import com.lunchtime.util.Validator;
import org.springframework.stereotype.Service;

import java.time.Month;
import java.util.*;
import java.util.concurrent.TimeUnit;

@Service
public class EventServiceImplement implements EventService {

    private final EventRepository eventRepository;

    public EventServiceImplement(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<Event> findAll() {
        return eventRepository.findAll(new Date());
    }

    public List<Event> findByCategory(String[] category) {
        return eventRepository.findByCategory(new Date(), category);
    }

    public List<Event> findByDay(Date date) {
        Date end = new Date(date.getTime() + TimeUnit.DAYS.toMillis(1));
        return eventRepository.findByDateBetweenAndIsActiveTrueOrderByDateAsc(date, end);
    }

    public List<Event> findByDateBetween(Date startDate, Date endDate) {
        Date end = new Date(endDate.getTime() + TimeUnit.DAYS.toMillis(1));
        return eventRepository.findByDateBetweenAndIsActiveTrueOrderByDateAsc(startDate, end);
    }

    public List<Event> findByMonth(String month) throws IllegalArgumentException {
        int monthOrdinal = Month.valueOf(month.toUpperCase()).ordinal();
        int currentYear = Calendar.getInstance().get(Calendar.YEAR);
        int currentMonth = Calendar.getInstance().get(Calendar.MONTH);
        if (monthOrdinal < currentMonth) {
            currentYear++;
        }
        Date start = new GregorianCalendar(currentYear, monthOrdinal, 1).getTime();
        Date end = new GregorianCalendar(currentYear, monthOrdinal + 1, 1).getTime();
        return eventRepository.findByDateBetweenAndIsActiveTrueOrderByDateAsc(start, end);
    }

    public Optional<Event> findById(Long id) {
        return eventRepository.findById(id);
    }

    public Optional<Event> deleteById(Long id) {
        Optional<Event> result = findById(id);
        if (result.isPresent()) {
            Event event = result.get();
            event.setIsActive(false);
            save(event);
            return Optional.of(event);
        }
        return Optional.empty();
    }

    public void save(Event event) throws IllegalArgumentException {
        String category = event.getCategory();
        if (Validator.checkCategory(category)) {
            eventRepository.save(event);
        } else {
            throw new IllegalArgumentException();
        }
    }
}
