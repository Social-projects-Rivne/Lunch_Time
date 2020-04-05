package com.lunchtime.implementation;

import com.lunchtime.dto.FeedbackDto;
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
import java.sql.Date;
import java.time.Instant;
import java.util.Calendar;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FeedbackServiceImplement implements FeedbackService {

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
            feedback.setDate(new Date(Calendar.getInstance().getTimeInMillis()));
            feedbackRepository.save(feedback);
            feedbackDto.setId(feedback.getId());
            feedbackDto.setActive(feedback.getIsActive());
            feedbackDto.setCounterDislike(feedback.getCounterDislike());
            feedbackDto.setCounterLike(feedback.getCounterLike());
            feedbackDto.setDate(new Date(Calendar.getInstance().getTimeInMillis()));
            System.out.println(1);
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
