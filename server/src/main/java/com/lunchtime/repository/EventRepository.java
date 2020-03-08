package com.lunchtime.repository;

import com.lunchtime.entity.Event;

import java.sql.DatabaseMetaData;
import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.repository.CrudRepository;



public interface EventRepository extends CrudRepository<Event, Long> {

  @Override
  List<Event> findAll();

  List<Event> findByCategory(String category);

  List<Event> findByDate(Date data);

  List<Event> findByDateBetween(Date startDate, Date endDate);


}
