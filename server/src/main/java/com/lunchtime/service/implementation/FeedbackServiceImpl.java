package com.lunchtime.service.implementation;

import com.lunchtime.models.Feedback;
import com.lunchtime.repository.FeedbackRepository;
import com.lunchtime.service.FeedbackService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackServiceImpl implements FeedbackService {
    private final FeedbackRepository feedbackRepository;

    public FeedbackServiceImpl(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    public List<Feedback> getFeedbackListByRestaurantId(Long id) {
        return feedbackRepository.findByRestaurantId(id);
    }
}