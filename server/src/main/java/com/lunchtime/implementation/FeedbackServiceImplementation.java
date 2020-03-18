package com.lunchtime.implementation;

import com.lunchtime.models.Feedback;
import com.lunchtime.repository.FeedbackRepository;
import com.lunchtime.service.FeedbackService;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FeedbackServiceImplementation implements FeedbackService {

    private final FeedbackRepository feedbackRepository;

    public FeedbackServiceImplementation(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    public List<Feedback> findByRestId_Id(Long id) {
        return feedbackRepository.findByRestId_Id(id);
    }

}
