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

    String[] restaurantName = new String[] {"Avocado", "Masuri", "Gavana", "Cake", "Green", "Nuts"};
    String[] userName = new String[] {"Bob", "Devid", "Tom", "Alan", "Leo", "Fred"};
    String[] eventName = new String[] {"New Year Party", "Karaoke evening", "Concert Mikhail Poplavskiy",
        "CAKE DEGUSTATION", "Chillout every Thursday!"};
    String[] eventImage = new String[] {
        "https://cdn.pixabay.com/photo/2019/12/26/09/13/glasses-4720011_1280.jpg",
        "https://cdn.pixabay.com/photo/2019/11/23/17/24/video-4647668_1280.jpg",
        "https://cdn.pixabay.com/photo/2015/07/30/17/24/audience-868074_1280.jpg",
        "https://cdn.pixabay.com/photo/2015/03/26/09/39/cupcakes-690040_1280.jpg",
        "https://cdn.pixabay.com/photo/2014/05/03/01/02/concert-336695_1280.jpg"};
    String[] eventDesc = new String[]{
        "Bring in 2020 with style and panache at the most famous and exquisite party in town. Cruise into the New Year"
            + " with delicacies crafted to perfection by The Café’s culinary team and enjoy refreshing drinks as"
            + " you gear up to welcome the new year.",
        "Do you like to sing? Come have a great evening and perform your favorite songs!",
        "November 28 at 8:00 pm - Mikhail Poplavskiy with a concert \"Birthday with Friends\"",
        "Coconut candies, strawberry cake, and matcha-mint dessert - ALL THIS you can try on Sunday in "
             + "The Cake Restaurant!",
        "Every Thursday from 19:00 in \"Green\" sets from DJ from the best chillout venues in Rivne and not only will"
             + " be waiting for you! The best place to relax while waiting for the weekend!"};
    String[] eventDate = new String[] {"2020-12-31 23:00", "2020-05-09 17:00",
        "2020-11-28 20:00", "2020-05-21 15:00", "2021-05-23 22:00"};
    String[] eventType = new String[] {"party", "karaoke", "concert", "tasting", "party"};
    Float[] cordLatitude = new Float[] { 50.616294f, 50.618261f, 50.620219f, 50.616146f, 50.618318f, 50.624449f };
    Float[] cordLongitude = new Float[] { 26.275728f, 26.260064f, 26.241863f, 26.253994f, 26.252249f, 26.249677f };

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
        if (personRepository.count() == 0) {
            seedPerson();
        }
        if (restaurantRepository.count() == 0) {
            seedRestaurant();
        }
        if (feedbackRepository.count() == 0) {
            seedFeedback();
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
        List<Person> person = personRepository.findAll();
        for (int i = 0; i < restaurantName.length; i++) {
            Restaurant rest = new Restaurant(restaurantName[i],
                restaurantName[i].concat("@gmail.com").toLowerCase(),
                "Rivne, street ".concat("1" + i),
                "www.".concat(restaurantName[i]).concat(".ua").toLowerCase(),
                "Description for restaurant ".concat(restaurantName[i]),
                "12-24", false,
                i + 1L, person.get(i), i + 1, cordLongitude[i],
                cordLatitude[i], Instant.now(),
                i + 1L, Instant.now(), i + 1L);
            restaurantRepository.save(rest);
        }
    }

    public void seedFeedback() {
        List<Restaurant> restaurants = restaurantRepository.findAll();
        List<Person> person = personRepository.findAll();
        for (int i = 0; i < restaurantName.length; i++) {
            Feedback feedback = new Feedback(
                "User ".concat(userName[i].concat(" write comment to restaurant")),
                true,
                new Date(System.currentTimeMillis()),
                person.get(i),
                restaurants.get(i),
                3 + i,
                12 + i);
            feedbackRepository.save(feedback);
        }
    }

    public void  seedPerson() {
        for (int i = 0; i < userName.length; i++) {
            Person person = new Person(
                userName[i],
                userName[i].concat("@gmail.com").toLowerCase(),
                userName[i],
                "096-77-77-77".concat(String.valueOf(i))
            );
            personRepository.save(person);
        }
    }

    public void  seedEvent() throws URISyntaxException {
        List<Restaurant> restaurantList = restaurantRepository.findAll();
        for (int i = 0; i < eventName.length; i++) {
            Event event = new Event();
            event.setRestaurant(restaurantList.get(i));
            event.setDate(eventDate[i]);
            event.setImage(new URI(eventImage[i]));
            event.setName(eventName[i]);
            event.setCategory(eventType[i]);
            event.setDescription(eventDesc[i]);
            event.setActive(true);
            eventRepository.save(event);
        }
    }
}
