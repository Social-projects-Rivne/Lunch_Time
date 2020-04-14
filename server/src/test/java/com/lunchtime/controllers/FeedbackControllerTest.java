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

        final ResponseEntity<FeedbackDto> feedbackDto1 = feedbackControllerUnderTest.saveFeedback(feedbackDto);

        verify(mockFeedbackService).saveFeedback(feedbackDto);
        verifyNoMoreInteractions(mockFeedbackService);

        Assertions.assertNotNull(feedbackDto1);
    }

    @Test
    public void testGetAllByRestaurantId() throws Exception {
        final List<Feedback> feedback = Collections.singletonList(initFeedback());

        when(mockFeedbackService.getFeedbackListByRestaurantId(0L)).thenReturn(feedback);
        feedbackControllerUnderTest.getAllByRestaurantId(0L);

        verify(mockFeedbackService, times(1)).getFeedbackListByRestaurantId(0L);
        verifyNoMoreInteractions(mockFeedbackService);
    }

    private Feedback initFeedback() {
        Feedback feedback = new Feedback();
        feedback.setDescription("description");
        feedback.setActive(false);
        feedback.setDate(Instant.ofEpochSecond(0L));
        feedback.setPerson(initPerson());
        feedback.setRestaurant(initRestaurant());
        feedback.setCounterLike(0);
        feedback.setCounterDislike(0);
        return feedback;
    }

    private Restaurant initRestaurant() {
        Restaurant restaurant = new Restaurant();
        restaurant.setName("name");
        restaurant.setEmail("email");
        restaurant.setTextAddress("textAddress");
        restaurant.setWebsite("website");
        restaurant.setDescription("description");
        restaurant.setWorkingTime("workingTime");
        restaurant.setDeleted(false);
        restaurant.setMenuId(0L);
        restaurant.setPerson(initPerson());
        restaurant.setTables(0);
        restaurant.setLongitude(0.0f);
        restaurant.setLatitude(0.0f);
        restaurant.setCreatedAt(Instant.ofEpochSecond(0L));
        restaurant.setCreatedBy(0L);
        restaurant.setModifyAt(Instant.ofEpochSecond(0L));
        restaurant.setModifyBy(0L);
        return restaurant;
    }

    private Person initPerson() {
        Person person = new Person();
        person.setName("name");
        person.setEmail("email");
        person.setPassword("password");
        person.setPhoneNumber("phoneNumber");
        return person;
    }
}
