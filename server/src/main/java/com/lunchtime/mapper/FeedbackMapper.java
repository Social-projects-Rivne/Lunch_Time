package com.lunchtime.mapper;

import com.lunchtime.models.Feedback;
import com.lunchtime.models.Person;
import com.lunchtime.models.Restaurant;
import com.lunchtime.repository.PersonRepository;
import com.lunchtime.repository.RestaurantRepository;
import com.lunchtime.service.dto.FeedbackDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
@RequiredArgsConstructor
public class FeedbackMapper {
    final PersonRepository personRepository;
    final RestaurantRepository restaurantRepository;

    public Feedback fromDtoToFeedback(FeedbackDto feedbackDto) {
        Feedback feedback = new Feedback();
        Person person = personRepository.getOne(feedbackDto.getPersonId());
        Restaurant restaurant = restaurantRepository.getOne(feedbackDto.getRestId());

        feedback.setIsActive(true);
        feedback.setDescription(feedbackDto.getDescription());
        feedback.setCounterDislike(0);
        feedback.setCounterLike(0);
        feedback.setPerson(person);
        feedback.setRestId(restaurant);
        feedback.setInstant(Instant.now());

        return feedback;
    }

    public FeedbackDto fromFeedbackToDto(Feedback feedback) {
        FeedbackDto feedbackDto = new FeedbackDto();
        Person person = personRepository.getOne(feedback.getPerson().getId());
        Restaurant restaurant = restaurantRepository.getOne(feedback.getRestId().getId());

        feedbackDto.setId(feedback.getId());
        feedbackDto.setActive(feedback.getIsActive());
        feedbackDto.setDescription(feedback.getDescription());
        feedbackDto.setCounterDislike(feedback.getCounterDislike());
        feedbackDto.setCounterLike(feedback.getCounterLike());
        feedbackDto.setPersonId(person.getId());
        feedbackDto.setRestId(restaurant.getId());
        feedbackDto.setInstant(feedback.getInstant());

        return feedbackDto;
    }
}
