package com.lunchtime.service;

import com.lunchtime.models.Feedback;
import com.lunchtime.service.dto.FeedbackDto;

import java.util.List;

public interface FeedbackService {
    List<Feedback> getFeedbackListByRestaurantId(Long id);

    FeedbackDto saveFeedback(FeedbackDto feedbackDto);
}
