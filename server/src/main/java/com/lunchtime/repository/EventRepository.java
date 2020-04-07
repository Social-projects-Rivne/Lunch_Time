package com.lunchtime.repository;

import com.lunchtime.models.Event;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;

public interface EventRepository extends CrudRepository<Event, Long> {

    //TODO Add more simple method name and provide it with more specific javaDoc
    List<Event> findByDateGreaterThanAndIsDeletedFalseOrderByDateAsc(Date date);

    List<Event> findByDateGreaterThanAndCategoryInAndIsDeletedFalse(Date date, String[] category);

    List<Event> findByDateBetweenAndIsDeletedFalseOrderByDateAsc(Date startDate, Date endDate);
}
