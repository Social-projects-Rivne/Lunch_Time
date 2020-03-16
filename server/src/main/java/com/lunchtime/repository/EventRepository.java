package com.lunchtime.repository;

import com.lunchtime.models.Event;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;


public interface EventRepository extends CrudRepository<Event, Long> {

    default List<Event> findAll(Date date) { return findByDateGreaterThanAndIsActiveTrueOrderByDateAsc(date);
    }

    List<Event> findByDateGreaterThanAndIsActiveTrueOrderByDateAsc(Date date);

    default List<Event> findByCategory(Date date, String category) {

        return findByDateGreaterThanAndCategoryAndIsActiveTrue(date, category);
    }

    List<Event> findByDateGreaterThanAndCategoryAndIsActiveTrue(Date date, String category);

    List<Event> findByDateBetweenAndIsActiveTrueOrderByDateAsc(Date startDate, Date endDate);

}
