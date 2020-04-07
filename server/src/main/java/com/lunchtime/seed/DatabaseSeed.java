package com.lunchtime.seed;

import com.lunchtime.models.Event;
import com.lunchtime.models.Feedback;
import com.lunchtime.models.Person;
import com.lunchtime.models.Restaurant;
import com.lunchtime.repository.EventRepository;
import com.lunchtime.repository.FeedbackRepository;
import com.lunchtime.repository.PersonRepository;
import com.lunchtime.repository.RestaurantRepository;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.net.URISyntaxException;
import java.sql.Date;
import java.time.Instant;
import java.util.List;

@Component
public class DatabaseSeed {
    String[] restaurantName = new String[]{"Celentano", "Manhattan", "CasaNuova", "LaRiva", "PuriRivne"};
    String[] userName = new String[]{"Bob", "Devid", "Andriy", "Yura", "Roma"};
    String[] eventName = new String[]{"Party", "Karaoke", "Concert", "Party", "Tasting"};
    String[] eventDate = new String[]{"2020-03-25 10:20", "2020-03-26 17:05",
        "2020-04-05 12:00", "2020-12-31 15:00", "2021-01-20 22:00"};
    Float[] cordLatitude = new Float[]{50.616294f, 50.618261f, 50.620219f, 50.616146f, 50.618318f};
    Float[] cordLongitude = new Float[]{26.275728f, 26.260064f, 26.241863f, 26.253994f, 26.252249f};

    private final RestaurantRepository restaurantRepository;
    private final FeedbackRepository feedbackRepository;
    private final PersonRepository personRepository;
    private final EventRepository eventRepository;

    public DatabaseSeed(RestaurantRepository restaurantRepository,
                        FeedbackRepository feedbackRepository,
                        PersonRepository personRepository,
                        EventRepository eventRepository) {
        this.restaurantRepository = restaurantRepository;
        this.feedbackRepository = feedbackRepository;
        this.personRepository = personRepository;
        this.eventRepository = eventRepository;
    }

    @EventListener
    public void seed(ContextRefreshedEvent event) {
        if (personRepository.count() == 0L) {
            seedPerson();
        }
        if (restaurantRepository.count() == 0L) {
            seedRestaurant();
        }
        if (feedbackRepository.count() == 0L) {
            seedFeedback();
        }
        if (eventRepository.count() == 0L) {
            try {
                seedEvent();
            } catch (URISyntaxException e) {
                e.printStackTrace();
            }
        }
    }

    public void seedRestaurant() {
        for (Long i = Long.valueOf(0); i < restaurantName.length; i++) {
            Restaurant rest = new Restaurant(
                restaurantName[i.intValue()],
                restaurantName[i.intValue()].concat("@gmail.com").toLowerCase(),
                "Rivne, street ".concat("1" + i.toString()),
                "www.".concat(restaurantName[i.intValue()]).concat(".ua").toLowerCase(),
                "A short description about restaurant "
                    .concat(restaurantName[i.intValue()])
                    .concat(", and some other info."),
                "12-24",
                false,
                i + 1L,
                getPersonList().get(i.intValue()),
                i.intValue() + 1,
                cordLongitude[i.intValue()],
                cordLatitude[i.intValue()],
                Instant.now(),
                i + 1L,
                Instant.now(),
                i + 1L);
            restaurantRepository.save(rest);
        }
    }

    public void seedFeedback() {
        for (Long i = Long.valueOf(0); i < restaurantName.length; i++) {
            Feedback feedback = new Feedback(
                "User ".concat(userName[i.intValue()]).concat(" write comment to restaurant"),
                true,
                new Date(System.currentTimeMillis()),
                getPersonList().get(i.intValue()),
                getRestaurantList().get(i.intValue()),
                3 + i.intValue(),
                12 + i.intValue());
            feedbackRepository.save(feedback);
        }
    }

    public void seedPerson() {
        for (Long i = 0L; i < userName.length; i++) {
            Person person = new Person(
                userName[i.intValue()],
                userName[i.intValue()].concat("@gmail.com").toLowerCase(),
                userName[i.intValue()],
                "096-77-77-77".concat(i.toString()));
            personRepository.save(person);
        }
    }

    public void seedEvent() throws URISyntaxException {
        for (int i = 0; i < eventName.length; i++) {
            Event event = new Event();
            event.setRestaurant(getRestaurantList().get(i));
            event.setDate(eventDate[i]);
            event.setImage(new URI("https://cdn.pixabay.com/photo/2015/07/30/17/24/audience-868074_1280.jpg"));
            event.setName("Event " + eventName[i]);
            event.setCategory(eventName[i].toLowerCase());
            event.setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do"
                + " eiusmod tempor incididunt ut labore et dolore magna aliqua " + eventName[i]);
            event.setIsActive(true);
            eventRepository.save(event);
        }
    }

    private List<Person> getPersonList() {
        return personRepository.findAll();
    }

    private List<Restaurant> getRestaurantList() {
        return restaurantRepository.findAll();
    }
}
