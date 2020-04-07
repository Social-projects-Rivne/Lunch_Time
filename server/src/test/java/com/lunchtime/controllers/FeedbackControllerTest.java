package com.lunchtime.controllers;

import com.lunchtime.models.Feedback;
import com.lunchtime.models.Person;
import com.lunchtime.models.Restaurant;
import com.lunchtime.service.dto.FeedbackDto;
import com.lunchtime.service.FeedbackService;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.time.Instant;
import java.util.Collections;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.mockito.MockitoAnnotations.initMocks;

@RunWith(SpringJUnit4ClassRunner.class)
public class FeedbackControllerTest {

    @Mock
    private FeedbackService mockFeedbackService;

    private FeedbackController feedbackControllerUnderTest;

    @Before
    public void setUp() {
        initMocks(this);
        feedbackControllerUnderTest = new FeedbackController(mockFeedbackService);
    }

    // Testing FeedbackControllers create() method.
    @Test
    public void testCreate() throws Exception {
        final FeedbackDto feedbackDto = new FeedbackDto();
        feedbackDto.setId(0L);
        feedbackDto.setDescription("description");
        feedbackDto.setRestId(0L);
        feedbackDto.setActive(false);
        feedbackDto.setDate(Instant.ofEpochSecond(0L));
        feedbackDto.setPersonId(0);
        feedbackDto.setCounterLike(0);
        feedbackDto.setCounterDislike(0);

        final ResponseEntity<FeedbackDto> feedbackDto1 = feedbackControllerUnderTest.create(feedbackDto);

        verify(mockFeedbackService).save(feedbackDto);
        verifyNoMoreInteractions(mockFeedbackService);

        Assertions.assertNotNull(feedbackDto1);
    }


    @Test
    public void testGetAllByRestaurantId() throws Exception {
        final List<Feedback> feedback = Collections.singletonList(
            new Feedback("description", false, Instant.ofEpochSecond(0L),
                new Person("name", "email", "password", "phoneNumber"),
                new Restaurant("name", "email", "textAddress", "website", "description", "workingTime", false, 0L,
                    new Person("name", "email", "password", "phoneNumber"),
                    0, 0.0f, 0.0f,
                    Instant.ofEpochSecond(0L), 0L, Instant.ofEpochSecond(0L),
                    0L), 0, 0));

        when(mockFeedbackService.findByRestId_Id(0L)).thenReturn(feedback);
        feedbackControllerUnderTest.getAllByRestaurantId(0L);

        verify(mockFeedbackService, times(1)).findByRestId_Id(0L);
        verifyNoMoreInteractions(mockFeedbackService);
    }
}
