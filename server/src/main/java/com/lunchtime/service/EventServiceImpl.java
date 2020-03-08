package com.lunchtime.service;

import com.lunchtime.entity.Event;
import com.lunchtime.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventServiceImpl implements EventService {


  @Autowired
  EventRepository eventRepository;

  public List<Event> findAll(){
    return eventRepository.findAll();
  }

  public List<Event> findByCategory(String category) {
    return eventRepository.findByCategory(category);
  }

  public void saveOrUpdateEvent(Event event){
    eventRepository.save(event);
  }

  public void deleteEvent(long id){
    eventRepository.deleteById(id);
  }
}
