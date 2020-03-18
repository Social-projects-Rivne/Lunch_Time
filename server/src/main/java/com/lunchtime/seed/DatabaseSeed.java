package com.lunchtime.seed;

import com.lunchtime.models.Feedback;
import com.lunchtime.models.Restaurant;
import com.lunchtime.repository.FeedbackRepository;
import com.lunchtime.repository.RestaurantRepository;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.data.jpa.repository.Query;
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

        for (Long i = Long.valueOf(1); i < restaurantName.length; i++) {

            Restaurant rest = new Restaurant();

            rest.setId(i);
            rest.setName(restaurantName[i.intValue()]);
            rest.setDescription("Description for restaurant ".concat(restaurantName[i.intValue()]));
            rest.setTextAddress("Rivne, street ".concat(i.toString()));
            rest.setEmail(restaurantName[i.intValue()].concat("@gmail.com"));
            rest.setWebsite("www.".concat(restaurantName[i.intValue()]).concat(".ua"));
            rest.setWorkingTime("12-24");
            rest.setIsDeleted(false);
            rest.setLatitude(cordLatitude[i.intValue()]);
            rest.setLongitude(cordLongitude[i.intValue()]);
            rest.setOwnerId(i);
            rest.setMenuId(i);
            rest.setTables(Integer.valueOf(i.intValue()));
            rest.setCreatedAt(Instant.now());
            rest.setCreatedBy(i);
            rest.setModifyAt(Instant.now());
            rest.setModifyBy(i);

            restaurantRepository.save(rest);
        }

    }

    public void seedFeedback() {

        List<Restaurant> res = restaurantRepository.findAll();

        for (Long i = Long.valueOf(1); i < restaurantName.length; i++) {

            Feedback feedback = new Feedback();

            feedback.setId(i);
            feedback.setCounterDislike(22 + i.intValue());
            feedback.setCounterLike(3 + i.intValue());
            feedback.setDate(new Date(System.currentTimeMillis()));
            feedback.setUserName(userName[i.intValue()]);
            feedback.setDescription("User ".concat(userName[i.intValue()]).concat(" write comment to restaurant"));
            feedback.setIsActive(true);
            feedback.setRestId(res.get(i.intValue() - 1));

            feedbackRepository.save(feedback);
        }

    }

}
