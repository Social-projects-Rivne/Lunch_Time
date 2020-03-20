package com.lunchtime.seed;

import com.lunchtime.models.Feedback;
import com.lunchtime.models.Restaurant;
import com.lunchtime.repository.FeedbackRepository;
import com.lunchtime.repository.RestaurantRepository;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.time.Instant;
import java.util.List;


@Component
public class DatabaseSeed {

    String[] restaurantName = new String[] {"Avocado", "Masuri", "Gavana", "Cake", "Green", "Nuts"};
    String[] userName = new String[] {"Bob", "Devid", "Tom", "Alan", "Leo", "Fred"};
    Float[] cordLatitude = new Float[] { 50.616294f, 50.618261f, 50.620219f, 50.616146f, 50.618318f, 50.624449f };
    Float[] cordLongitude = new Float[] { 26.275728f, 26.260064f, 26.241863f, 26.253994f, 26.252249f, 26.249677f };

    private final RestaurantRepository restaurantRepository;
    private final FeedbackRepository feedbackRepository;

    public DatabaseSeed(RestaurantRepository restaurantRepository, FeedbackRepository feedbackRepository) {
        this.restaurantRepository = restaurantRepository;
        this.feedbackRepository = feedbackRepository;
    }

    @EventListener
    public void seed(ContextRefreshedEvent event) {
        if (restaurantRepository.count() == 0L) {
            seedRestaurant();
        }

        if (feedbackRepository.count() == 0L) {
            seedFeedback();
        }

    }

    public void seedRestaurant() {

        for (Long i = Long.valueOf(0); i < restaurantName.length; i++) {

            Restaurant rest = new Restaurant(restaurantName[i.intValue()],
                restaurantName[i.intValue()].concat("@gmail.com").toLowerCase(),
                "Rivne, street ".concat("1" + i.toString()),
                "www.".concat(restaurantName[i.intValue()]).concat(".ua").toLowerCase(),
                "Description for restaurant ".concat(restaurantName[i.intValue()]),
                "12-24", false,
                i + 1L, i + 1L, i.intValue() + 1, cordLongitude[i.intValue()],
                cordLatitude[i.intValue()], Instant.now(),
                i + 1L, Instant.now(), i + 1L);

            restaurantRepository.save(rest);
        }

    }

    public void seedFeedback() {

        List<Restaurant> res = restaurantRepository.findAll();

        for (Long i = Long.valueOf(0); i < restaurantName.length; i++) {

            Feedback feedback = new Feedback(
                "User ".concat(userName[i.intValue()]).concat(" write comment to restaurant"),
                true,
                new Date(System.currentTimeMillis()),
                userName[i.intValue()],
                res.get(i.intValue()),
                3 + i.intValue(),
                12 + i.intValue());

            feedbackRepository.save(feedback);
        }

    }

}
