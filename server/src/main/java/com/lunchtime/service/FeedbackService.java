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

    public List<Feedback> findByRestId_Id(Long id) {
        return feedbackRepository.findByRestId_Id(id);
    }

}
