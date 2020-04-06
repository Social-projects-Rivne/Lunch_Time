package com.lunchtime.service;

import com.lunchtime.models.Feedback;
import com.lunchtime.service.dto.FeedbackDto;

import java.util.List;

public interface FeedbackService {

    //TODO incorrect method name. Use Java Convention. You can use IDE refactor->rename to simplify :)
    List<Feedback> findByRestId_Id(Long id);

    FeedbackDto save(FeedbackDto feedbackDto);
}
