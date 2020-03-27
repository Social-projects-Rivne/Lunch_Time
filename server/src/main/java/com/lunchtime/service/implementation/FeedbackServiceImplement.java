package com.lunchtime.service.implementation;

import com.lunchtime.models.Feedback;
import com.lunchtime.repository.FeedbackRepository;
import com.lunchtime.service.FeedbackService;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FeedbackServiceImplement implements FeedbackService {

    private final FeedbackRepository feedbackRepository;

    public FeedbackServiceImplement(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    public List<Feedback> findByRestId_Id(Long id) {
        return feedbackRepository.findByRestId_Id(id);
    }

}
