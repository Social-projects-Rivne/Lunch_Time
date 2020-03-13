package com.lunchtime.service;

import com.lunchtime.models.Feedback;
import com.lunchtime.repository.FeedbackRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;

    public FeedbackService(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    public List<Feedback> findByRestIdOrderByDateDesc(Long id) {
        return feedbackRepository.findByRestIdOrderByDateDesc(id);
    }

}
