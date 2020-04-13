package com.lunchtime.service.impl;

import com.lunchtime.mapper.FeedbackMapper;
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

    public FeedbackDto save(@Valid FeedbackDto feedbackDto) {
        Feedback feedback = feedbackMapper.fromDtoToFeedback(feedbackDto);
        feedbackRepository.save(feedback);
        return feedbackMapper.fromFeedbackToDto(feedback);
    }

    public List<Feedback> findByRestId_Id(Long id) {
        return feedbackRepository.findByRestId_Id(id);
    }
}
