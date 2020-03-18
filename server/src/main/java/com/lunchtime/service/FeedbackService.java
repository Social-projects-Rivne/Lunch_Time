package com.lunchtime.service;

import com.lunchtime.models.Feedback;
import java.util.List;

public interface FeedbackService {
    List<Feedback> findByRestId_Id(Long id);
}
