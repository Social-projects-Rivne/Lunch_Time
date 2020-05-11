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
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class FeedbackMapper {
    final PersonRepository personRepository;
    final RestaurantRepository restaurantRepository;

    public Feedback fromDtoToFeedback(FeedbackDto feedbackDto) {
        Feedback feedback = new Feedback();

        //TODO (from narek developer)
        // There is no necessary to make a request to DB here
        // We just need to set POJO objects with only 'id' and it should work
        // BUT: due to this, we need also another DTOs
        // https://stackoverflow.com/a/6229149/11699467

        Person person = personRepository.getOne((long) feedbackDto.getPersonId());
        Restaurant restaurant = restaurantRepository.getOne(feedbackDto.getRestId());

        feedback.setDescription(feedbackDto.getDescription());
        feedback.setPerson(person);
        feedback.setRestaurant(restaurant);
        feedback.setRestaurant(restaurant);
        feedback.setCounterDislike(0);
        feedback.setDate(Instant.now());

        return feedback;
    }

    public FeedbackDto fromFeedbackToDto(Feedback feedback) {
        FeedbackDto feedbackDto = new FeedbackDto();
        Person person = personRepository.getOne(feedback.getPerson().getId());
        Restaurant restaurant = restaurantRepository.getOne(feedback.getRestaurant().getId());

        feedbackDto.setId(feedback.getId());
        feedbackDto.setDescription(feedback.getDescription());
        feedbackDto.setPersonId(person.getId());
        feedbackDto.setPersonName(person.getName());
        feedbackDto.setRestId(restaurant.getId());
        if (feedback.getLikes() != null) {
            feedbackDto.setLikes(feedback.getLikes().stream()
                .map(Person::getId)
                .collect(Collectors.toSet()));
        }
        if (feedback.getDislikes() != null) {
            feedbackDto.setDislikes(feedback.getDislikes().stream()
                .map(Person::getId)
                .collect(Collectors.toSet()));
        }
        feedbackDto.setDate(feedback.getDate());

        return feedbackDto;
    }
}
