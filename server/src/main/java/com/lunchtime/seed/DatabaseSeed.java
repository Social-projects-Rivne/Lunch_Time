package com.lunchtime.seed;

import com.lunchtime.models.Feedback;
import com.lunchtime.models.Restaurant;
import com.lunchtime.repository.FeedbackRepository;
import com.lunchtime.repository.RestaurantRepository;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.persistence.EntityManager;
import java.sql.Date;
import java.time.Instant;
import java.util.List;


@Component
public class DatabaseSeed {

    String[] restaurantName = new String[] {"Avocado", "Masuri", "Gavana", "Cake", "Green", "Nuts"};
    String[] userName = new String[] {"Bob", "Devid", "Tom", "Alan", "Leo", "Fred"};

    private final RestaurantRepository restaurantRepository;
    private final FeedbackRepository feedbackRepository;
    private JdbcTemplate jdbcTemplate;

    public DatabaseSeed(RestaurantRepository restaurantRepository, FeedbackRepository feedbackRepository) {
        this.restaurantRepository = restaurantRepository;
        this.feedbackRepository = feedbackRepository;
    }

    @EventListener
    public void seed(ContextRefreshedEvent event) {
        seedRestaurant();
        seedFeedback();
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
            rest.setLatitude(Float.valueOf("2"));
            rest.setLongitude(Float.valueOf("2"));
            rest.setOwnerId(Long.valueOf("1"));
            rest.setMenuId(Long.valueOf("1"));
            rest.setTables(Integer.valueOf(2));
            rest.setCreatedAt(Instant.now());
            rest.setCreatedBy(Long.valueOf("1"));
            rest.setModifyAt(Instant.now());
            rest.setModifyBy(Long.valueOf("1"));

            restaurantRepository.save(rest);
        }

    }

    public void seedFeedback() {

        for (Long i = Long.valueOf(1); i < restaurantName.length; i++) {

            Feedback feedback = new Feedback();
            Restaurant res = restaurantRepository.getOne(i);

            feedback.setId(i);
            feedback.setCounterDislike(22);
            feedback.setCounterLike(3);
            feedback.setDate(new Date(System.currentTimeMillis()));
            feedback.setUserName(userName[i.intValue()]);
            feedback.setDescription("User ".concat(userName[i.intValue()]).concat(" write comment to restaurant"));
            feedback.setIsActive(true);
            feedback.setRestId(res);

            feedbackRepository.save(feedback);
        }

    }

}
