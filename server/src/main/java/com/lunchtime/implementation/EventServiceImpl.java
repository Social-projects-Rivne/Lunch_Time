package com.lunchtime.implementation;

import com.lunchtime.enums.Months;
import com.lunchtime.models.Event;
import com.lunchtime.repository.EventRepository;
import com.lunchtime.service.EventService;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.TimeUnit;

@Service
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;

    public EventServiceImpl(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<Event> findAll() {
        return eventRepository.findAll(new Date());
    }

    public List<Event> findByCategory(String[] category) {
        return eventRepository.findByCategory(new Date(), category);
    }

    public List<Event> findByDay(Date date) {
        Date endDate = new Date(date.getTime() + TimeUnit.DAYS.toMillis(1));
        return eventRepository.findByDateBetweenAndIsActiveTrueOrderByDateAsc(date, endDate);
    }

    public List<Event> findByDateBetween(Date startDate, Date endDate) {
        Date end = new Date(endDate.getTime() + TimeUnit.DAYS.toMillis(1));
        return eventRepository.findByDateBetweenAndIsActiveTrueOrderByDateAsc(startDate, end);
    }

    @SuppressWarnings("MagicConstant")
    public List<Event> findByMonth(String month) throws IllegalArgumentException {
        int monthOrdinal = Months.valueOf(month).ordinal();
        int year = Calendar.getInstance().get(Calendar.YEAR);
        Calendar start = new GregorianCalendar(year, monthOrdinal, 1);
        Calendar end = new GregorianCalendar(year, ++monthOrdinal, 1);
        Date startDate = new Date(start.getTimeInMillis());
        Date endDate = new Date(end.getTimeInMillis());
        return eventRepository.findByDateBetweenAndIsActiveTrueOrderByDateAsc(startDate, endDate);
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

    public void save(Event event) {
        eventRepository.save(event);
    }
}
