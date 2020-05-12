package com.lunchtime.service.impl;

import com.lunchtime.models.EventCategory;
import com.lunchtime.repository.EventCategoryRepository;
import com.lunchtime.service.EventCategoryService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventCategoryServiceImpl implements EventCategoryService {

    private final EventCategoryRepository eventCategoryRepository;

    public EventCategoryServiceImpl(EventCategoryRepository eventCategoryRepository) {
        this.eventCategoryRepository = eventCategoryRepository;
    }

    @Override
    public EventCategory save(EventCategory eventCategory) {
        return eventCategoryRepository.save(eventCategory);
    }

    @Override
    public List<EventCategory> findAll() {
        return eventCategoryRepository.findAll();
    }

    @Override
    public Optional<EventCategory> findById(Long id) {
        return eventCategoryRepository.findById(id);
    }
}


