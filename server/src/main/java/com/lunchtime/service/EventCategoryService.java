package com.lunchtime.service;

import com.lunchtime.models.EventCategory;

import java.util.List;
import java.util.Optional;

public interface EventCategoryService {

    EventCategory save(EventCategory eventCategory);

    List<EventCategory> findAll();

    Optional<EventCategory> findById(Long id);
}
