package com.lunchtime.seed;

import com.lunchtime.models.*;
import com.lunchtime.repository.*;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.net.URISyntaxException;
import java.time.Instant;
import java.util.List;

@Component
public class DatabaseSeed {
    String[] restaurantName = new String[]{"Celentano", "Manhattan", "CasaNuova", "LaRiva", "PuriRivne"};
    String[] userName = new String[]{"Bob", "Devid", "Andriy", "Yura", "Roma"};
    String[] eventCategoryName = new String[]{"party", "karaoke", "concert", "for_children",
        "master_class", "tasting", "sports_broadcasting"};
    String[] eventName = new String[]{"New Year Party", "Karaoke evening", "Concert Mikhail Poplavskiy",
        "CAKE DEGUSTATION", "Chillout every Thursday!"};
    String[] eventImage = new String[] {
        "glasses-4720011_640.jpg", "video-4647668_640.jpg", "audience-868074_640.jpg",
        "cupcakes-690040_640.jpg", "concert-336695_640.jpg"};
    String[] eventDesc = new String[]{
        "Bring in 2020 with style and panache at the most famous and exquisite party in town. Cruise into the New Year"
            + " with delicacies crafted to perfection by The Café’s culinary team and enjoy refreshing drinks as"
            + " you gear up to welcome the new year.",
        "Do you like to sing? Come have a great evening and perform your favorite songs!",
        "November 28 at 8:00 pm - Mikhail Poplavskiy with a concert \"Birthday with Friends\"",
        "Coconut candies, strawberry cake, and matcha-mint dessert - ALL THIS you can try on Sunday in "
            + "The LaRiva Restaurant!",
        "Every Thursday from 19:00 sets from DJ from the best chillout venues in Rivne and not only will"
            + " be waiting for you! The best place to relax while waiting for the weekend!"};
    String[] eventDate = new String[]{"2020-12-31 23:00", "2020-05-09 17:00",
        "2020-11-28 20:00", "2020-05-21 15:00", "2020-05-23 22:00"};
    int[] eventType = {0, 1, 2, 5, 0};
    Float[] cordLatitude = new Float[]{50.616294f, 50.618261f, 50.620219f, 50.616146f, 50.618318f};
    Float[] cordLongitude = new Float[]{26.275728f, 26.260064f, 26.241863f, 26.253994f, 26.252249f};

    private final RestaurantRepository restaurantRepository;
    private final FeedbackRepository feedbackRepository;
    private final PersonRepository personRepository;
    private final EventCategoryRepository eventCategoryRepository;
    private final EventRepository eventRepository;

    public DatabaseSeed(RestaurantRepository restaurantRepository,
                        FeedbackRepository feedbackRepository,
                        PersonRepository personRepository,
                        EventCategoryRepository eventCategoryRepository,
                        EventRepository eventRepository) {
        this.restaurantRepository = restaurantRepository;
        this.feedbackRepository = feedbackRepository;
        this.personRepository = personRepository;
        this.eventCategoryRepository = eventCategoryRepository;
        this.eventRepository = eventRepository;
    }

    @EventListener
    public void seed(ContextRefreshedEvent event) {
        if (personRepository.count() == 0) {
            seedPerson();
        }
        if (restaurantRepository.count() == 0) {
            seedRestaurant();
        }
        if (feedbackRepository.count() == 0) {
            seedFeedback();
        }
        if (eventCategoryRepository.count() == 0) {
            seedEventCategory();
        }
        if (eventRepository.count() == 0) {
            try {
                seedEvent();
            } catch (URISyntaxException e) {
                e.printStackTrace();
            }
        }
    }

    public void seedRestaurant() {
        for (int i = 0; i < restaurantName.length; i++) {
            restaurantRepository.save(createRestaurant(i));
        }
    }

    private Restaurant createRestaurant(int i) {
        Restaurant restaurant = new Restaurant();
        restaurant.setName(restaurantName[i]);
        restaurant.setEmail(restaurantName[i].concat("@gmail.com").toLowerCase());
        restaurant.setTextAddress("Rivne, street ".concat("1" + i));
        restaurant.setWebsite("www.".concat(restaurantName[i]).concat(".ua").toLowerCase());
        restaurant.setDescription("A short description about restaurant "
            .concat(restaurantName[i])
            .concat(", and some other info."));
        restaurant.setWorkingTime("12-24");
        restaurant.setDeleted(false);
        restaurant.setMenuId(i + 1L);
        restaurant.setPerson(getPersonList().get(i));
        restaurant.setTables(i + 1);
        restaurant.setLongitude(cordLongitude[i]);
        restaurant.setLatitude(cordLatitude[i]);
        restaurant.setCreatedAt(Instant.now());
        restaurant.setCreatedBy(i + 1L);
        restaurant.setModifyAt(Instant.now());
        restaurant.setModifyBy(i + 1L);
        return restaurant;
    }

    public void seedFeedback() {
        for (int i = 0; i < restaurantName.length; i++) {
            feedbackRepository.save(createFeedback(i));
        }
    }

    private Feedback createFeedback(int i) {
        Feedback feedback = new Feedback();
        feedback.setDescription("User ".concat(userName[i].concat(" write comment to restaurant")));
        feedback.setActive(true);
        feedback.setDate(Instant.now());
        feedback.setPerson(getPersonList().get(i));
        feedback.setRestaurant(getRestaurantList().get(i));
        feedback.setCounterLike(3 + i);
        feedback.setCounterDislike(12 + i);
        return feedback;
    }

    public void seedPerson() {
        for (int i = 0; i < userName.length; i++) {
            personRepository.save(createPerson(i));
        }
    }

    private Person createPerson(int i) {
        Person person = new Person();
        person.setName(userName[i]);
        person.setEmail(userName[i].concat("@gmail.com").toLowerCase());
        person.setPassword(userName[i].concat("password").toLowerCase());
        person.setPhoneNumber("096-77-77-77".concat(String.valueOf(i)));
        return person;
    }

    public void seedEventCategory() {
        for (int i = 0; i < eventCategoryName.length; i++) {
            eventCategoryRepository.save(createEventCategory(i));
        }
    }

    private EventCategory createEventCategory(int i) {
        EventCategory eventCategory = new EventCategory();
        eventCategory.setCategory(eventCategoryName[i]);
        return eventCategory;
    }

    public void seedEvent() throws URISyntaxException {
        for (int i = 0; i < eventName.length; i++) {
            eventRepository.save(createEvent(i));
        }
    }

    private Event createEvent(int i) throws URISyntaxException {
        Event event = new Event();
        event.setRestaurant(getRestaurantList().get(i));
        event.setDate(eventDate[i]);
        event.setImage(eventImage[i]);
        event.setName(eventName[i]);
        event.setEventCategory(getEventCategoryList().get(eventType[i]));
        event.setDescription(eventDesc[i]);
        event.setDeleted(false);
        return event;
    }

    private List<Person> getPersonList() {
        return personRepository.findAll();
    }

    private List<Restaurant> getRestaurantList() {
        return restaurantRepository.findAll();
    }

    private List<EventCategory> getEventCategoryList() {
        return eventCategoryRepository.findAll();
    }
}
