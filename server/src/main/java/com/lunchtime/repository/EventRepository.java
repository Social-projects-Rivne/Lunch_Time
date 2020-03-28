package com.lunchtime.repository;

import com.lunchtime.models.Event;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;
//TODO remove redundant empty lines

public interface EventRepository extends CrudRepository<Event, Long> {

    //TODO you not need the default methods. Add more simple method name and provide it with more specific javaDoc
    default List<Event> findAll(Date date) {
        return findByDateGreaterThanAndIsActiveTrueOrderByDateAsc(date);
    }

    List<Event> findByDateGreaterThanAndIsActiveTrueOrderByDateAsc(Date date);

    default List<Event> findByCategory(Date date, String[] category) {

        return findByDateGreaterThanAndCategoryInAndIsActiveTrue(date, category);
    }

    List<Event> findByDateGreaterThanAndCategoryInAndIsActiveTrue(Date date, String[] category);

    List<Event> findByDateBetweenAndIsActiveTrueOrderByDateAsc(Date startDate, Date endDate);

    //TODO unused method. Remove
    List<Event> findByDateAndIsActiveTrueOrderByDateAsc(Date date);

}
