package com.lunchtime.seed;

import com.lunchtime.models.Feedback;
import com.lunchtime.models.Person;
import com.lunchtime.models.Restaurant;
import com.lunchtime.repository.FeedbackRepository;
import com.lunchtime.repository.PersonRepository;
import com.lunchtime.repository.RestaurantRepository;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.time.Instant;
import java.util.List;


@Component
public class DatabaseSeed {

    String[] restaurantName = new String[] {"Celentano", "Manhattan", "Egoista", "CasaNuova", "LaRiva",
        "TrattoriaDaVentotto", "Father", "Avocado", "PuriRivne", "Brooklyn", "Masuri",
        "Melrose", "Valenca", "Marlow&Sons", "BonefishGrill", "Rubirosa", "LunaStella", "Beso", "Burgerclub",
        "Gavana", "Amadeus", "Semifreddo", "Bigoli", "RedLobster", "Semifreddo", "Chachapuri", "Citronelle"};
    String[] userName = new String[] {"Bob", "Devid", "Tania", "Pleasure", "Kruz", "Tom", "Alan", "Oksana",
        "Leo", "Fred", "Olena", "Andriy", "Tania", "Pleasure", "Kruz", "Tom", "Alan", "Bob", "Yura", "Roma",
        "Oleg", "Nazar", "Kolia", "David", "Olia", "Sasha", "Yulia", "Ivan", "Vova"};
    Float[] cordLatitude = new Float[] { 50.616294f, 50.618261f, 50.620219f, 50.616146f, 50.618318f,
        50.624449f, 50.616294f, 50.618261f, 50.620219f, 50.616146f, 50.618318f, 50.624449f, 50.616294f,
        50.618261f, 50.620219f, 50.616146f, 50.618318f, 50.624449f, 50.616294f, 50.618261f, 50.620219f,
        50.616146f, 50.618318f, 50.624449f, 50.616294f, 50.618261f, 50.620219f, 50.616146f, 50.618318f,
        50.624449f };
    Float[] cordLongitude = new Float[] { 26.275728f, 26.260064f, 26.241863f, 26.253994f, 26.252249f,
        26.249677f, 26.275728f, 26.260064f, 26.241863f, 26.253994f, 26.252249f, 26.249677f, 26.275728f,
        26.260064f, 26.241863f, 26.253994f, 26.252249f, 26.249677f, 26.275728f, 26.260064f, 26.241863f,
        26.253994f, 26.252249f, 26.249677f, 26.275728f, 26.260064f, 26.241863f, 26.253994f, 26.252249f,
        26.249677f };

    private final RestaurantRepository restaurantRepository;
    private final FeedbackRepository feedbackRepository;
    private final PersonRepository personRepository;

    public DatabaseSeed(RestaurantRepository restaurantRepository,
                        FeedbackRepository feedbackRepository,
                        PersonRepository personRepository) {
        this.restaurantRepository = restaurantRepository;
        this.feedbackRepository = feedbackRepository;
        this.personRepository = personRepository;
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

    }

    public void seedRestaurant() {

        List<Person> person = personRepository.findAll();

        for (Long i = Long.valueOf(0); i < restaurantName.length; i++) {

            Restaurant rest = new Restaurant(restaurantName[i.intValue()],
                restaurantName[i.intValue()].concat("@gmail.com").toLowerCase(),
                "Rivne, street ".concat("1" + i.toString()),
                "www.".concat(restaurantName[i.intValue()]).concat(".ua").toLowerCase(),
                "A short description about restaurant ".concat(restaurantName[i.intValue()])
                    .concat(", and some other info."),
                "12-24", false,
                i + 1L, person.get(i.intValue()), i.intValue() + 1, cordLongitude[i.intValue()],
                cordLatitude[i.intValue()], Instant.now(),
                i + 1L, Instant.now(), i + 1L);

            restaurantRepository.save(rest);
        }

    }

    public void seedFeedback() {

        List<Restaurant> restaurants = restaurantRepository.findAll();
        List<Person> person = personRepository.findAll();

        for (Long i = Long.valueOf(0); i < restaurantName.length; i++) {

            Feedback feedback = new Feedback(
                "User ".concat(userName[i.intValue()]).concat(" write comment to restaurant"),
                true,
                new Date(System.currentTimeMillis()),
                person.get(i.intValue()),
                restaurants.get(i.intValue()),
                3 + i.intValue(),
                12 + i.intValue());

            feedbackRepository.save(feedback);
        }

    }

    public void  seedPerson() {

        for (Long i = 0L; i < userName.length; i++) {

            Person person = new Person(
                userName[i.intValue()],
                userName[i.intValue()].concat("@gmail.com").toLowerCase(),
                userName[i.intValue()],
                "096-77-77-77".concat(i.toString())
            );

            personRepository.save(person);
        }



    }

}
