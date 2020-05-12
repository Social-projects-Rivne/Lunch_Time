package com.lunchtime.service;

import com.lunchtime.service.dto.FeedbackDto;

import java.util.List;

public interface FeedbackService {
    List<FeedbackDto> getFeedbackListByRestaurantId(Long id);

    FeedbackDto saveFeedback(FeedbackDto feedbackDto);

    FeedbackDto likeFeedback(Long feedbackId, Long personId);

    FeedbackDto dislikeFeedback(Long feedbackId, Long personId);
}
