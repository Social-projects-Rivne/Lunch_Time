package com.lunchtime.controllers;

import com.lunchtime.service.dto.FeedbackDto;
import com.lunchtime.service.impl.FeedbackServiceImpl;
import com.lunchtime.models.Feedback;
import com.lunchtime.models.Person;
import com.lunchtime.models.Restaurant;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.time.Instant;
import java.util.Collections;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.MockitoAnnotations.initMocks;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@RunWith(SpringJUnit4ClassRunner.class)
public class FeedbackControllerTest {

    @Mock
    private FeedbackServiceImpl mockFeedbackServiceImpl;

    private FeedbackController feedbackControllerUnderTest;

    @Before
    public void setUp() {
        initMocks(this);
        feedbackControllerUnderTest = new FeedbackController(mockFeedbackServiceImpl);
    }

    @Test
    public void testCreate() throws Exception {
        final FeedbackDto feedbackDto = new FeedbackDto();
        feedbackDto.setId(0L);
        feedbackDto.setDescription("description");
        feedbackDto.setRestId(0L);
        feedbackDto.setActive(false);
        feedbackDto.setInstant(Instant.ofEpochSecond(0L));
        feedbackDto.setPersonId(0L);
        feedbackDto.setCounterLike(0);
        feedbackDto.setCounterDislike(0);

        final ResponseEntity<FeedbackDto> result = feedbackControllerUnderTest.create(feedbackDto);

        if(result != null) {
            verify(mockFeedbackServiceImpl, times(1)).save(feedbackDto);
            verifyNoMoreInteractions(mockFeedbackServiceImpl);
        } else {
            throw new Exception();
        }
    }

    @Test
    public void testGetAllByRestaurantId() throws Exception {
        final List<Feedback> feedback = Collections.singletonList(
            new Feedback("description",false, Instant.ofEpochSecond(0L),
                new Person("name", "email", "password", "phoneNumber"),
                new Restaurant("name", "email", "textAddress", "website", "description", "workingTime", false, 0L,
                    new Person("name", "email", "password","phoneNumber"),
                    0, 0.0f, 0.0f,
                    Instant.ofEpochSecond(0L), 0L, Instant.ofEpochSecond(0L),
                    0L), 0, 0));
        when(mockFeedbackServiceImpl.findByRestId_Id(0L)).thenReturn(feedback);

        final ResponseEntity<List<Feedback>> result = feedbackControllerUnderTest.getAllByRestaurantId(0L);

        if(result != null) {
            verify(mockFeedbackServiceImpl, times(1)).findByRestId_Id(0L);
            verifyNoMoreInteractions(mockFeedbackServiceImpl);
        } else {
            throw new Exception();
        }
    }
}
