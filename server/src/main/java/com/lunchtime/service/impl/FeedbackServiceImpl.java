package com.lunchtime.service.impl;

import com.lunchtime.service.dto.FeedbackDto;
import com.lunchtime.models.Feedback;
import com.lunchtime.models.Person;
import com.lunchtime.models.Restaurant;
import com.lunchtime.repository.FeedbackRepository;
import com.lunchtime.repository.PersonRepository;
import com.lunchtime.repository.RestaurantRepository;
import com.lunchtime.service.FeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FeedbackServiceImpl implements FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final PersonRepository personRepository;
    private final RestaurantRepository restaurantRepository;

    public FeedbackDto save(@Valid FeedbackDto feedbackDto) {
        try {
            Feedback feedback = new Feedback();
            Person person = personRepository.getOne(feedbackDto.getPersonId());
            Restaurant restaurant = restaurantRepository.getOne(feedbackDto.getRestId());
            feedback.setIsActive(true);
            feedback.setCounterDislike(0);
            feedback.setCounterLike(0);
            feedback.setPerson(person);
            feedback.setRestId(restaurant);
            feedback.setDescription(feedbackDto.getDescription());
            feedback.setInstant(Instant.now());
            feedbackRepository.save(feedback);
            feedbackDto.setId(feedback.getId());
            feedbackDto.setActive(feedback.getIsActive());
            feedbackDto.setCounterDislike(feedback.getCounterDislike());
            feedbackDto.setCounterLike(feedback.getCounterLike());
            feedbackDto.setInstant(feedback.getInstant());
            return feedbackDto;
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<Feedback> findByRestId_Id(Long id) {
        return feedbackRepository.findByRestId_Id(id);
    }
}
