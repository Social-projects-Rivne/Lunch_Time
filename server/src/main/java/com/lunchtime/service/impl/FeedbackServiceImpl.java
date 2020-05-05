package com.lunchtime.service.impl;

import com.lunchtime.mapper.FeedbackMapper;
import com.lunchtime.models.Person;
import com.lunchtime.repository.PersonRepository;
import com.lunchtime.service.dto.FeedbackDto;
import com.lunchtime.models.Feedback;
import com.lunchtime.repository.FeedbackRepository;
import com.lunchtime.service.FeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import javax.validation.Valid;
import java.util.List;

@Service
@RequiredArgsConstructor
class FeedbackServiceImpl implements FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final FeedbackMapper feedbackMapper;
    private final PersonRepository personRepository;

    public FeedbackDto saveFeedback(@Valid FeedbackDto feedbackDto) {
        Feedback feedback = feedbackMapper.fromDtoToFeedback(feedbackDto);
        feedbackRepository.save(feedback);
        return feedbackMapper.fromFeedbackToDto(feedback);
    }

    public List<Feedback> getFeedbackListByRestaurantId(Long id) {
        return feedbackRepository.findByRestaurantId(id);
    }

    @Override
    public FeedbackDto likeFeedback(Long feedbackId, Long personId) {
        Feedback feedback = feedbackRepository.getOne(feedbackId);
        Person person = personRepository.findPersonById(personId);
        if (!feedback.getLikes().contains(person)) {
            feedback.getLikes().add(person);
        } else {
            feedback.getLikes().remove(person);
        }
        feedbackRepository.save(feedback);
        return feedbackMapper.fromFeedbackToDto(feedback);
    }
}
