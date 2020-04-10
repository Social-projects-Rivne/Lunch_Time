package com.lunchtime.seed;

import com.lunchtime.models.*;
import com.lunchtime.repository.*;
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

    String[] dishesName = new String[] {"Salami", "Margarita", "Manhattan", "Soup", "Hamburger", "Ice"};
    String[] categoryFood = new String[] {"Pizza", "Pizza", "Pizza",
                                          "Main course", "Snacks", "Dessert"};
    String[] dishPortion = new String[] {"500 gr", "300 gr", "230 gr", "150 gr", "500 gr", "200 gr"};
    String[] dishUrl = new String[] { "pizza-salami.jpg",
                                      "pizza-margarita.jpg",
                                      "pizza-manhattan.jpg",
                                      "Soup_with_meatballs.jpg",
                                      "hamburger.jpg",
                                      "ice.jpg"};
    String[] restaurantName = new String[]{"Celentano", "Manhattan", "CasaNuova", "LaRiva", "PuriRivne"};
    String[] userName = new String[]{"Bob", "Devid", "Andriy", "Yura", "Roma"};
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
             + "The LaRiva Restaurant!",
        "Every Thursday from 19:00 sets from DJ from the best chillout venues in Rivne and not only will"
             + " be waiting for you! The best place to relax while waiting for the weekend!"};
    String[] eventDate = new String[] {"2020-12-31 23:00", "2020-05-09 17:00",
        "2020-11-28 20:00", "2020-05-21 15:00", "2020-05-23 22:00"};
    String[] eventType = new String[] {"party", "karaoke", "concert", "tasting", "party"};
    Float[] cordLatitude = new Float[]{50.616294f, 50.618261f, 50.620219f, 50.616146f, 50.618318f};
    Float[] cordLongitude = new Float[]{26.275728f, 26.260064f, 26.241863f, 26.253994f, 26.252249f};

    private final RestaurantRepository restaurantRepository;
    private final FeedbackRepository feedbackRepository;
    private final PersonRepository personRepository;
    private final DishRepository dishRepository;
    private final CategoryFoodRepository categoryFoodRepository;
    private final MenuItemDishRepository menuItemDishRepository;
    private final EventRepository eventRepository;


    public DatabaseSeed(RestaurantRepository restaurantRepository,
                        FeedbackRepository feedbackRepository,
                        PersonRepository personRepository,
                        DishRepository dishRepository,
                        CategoryFoodRepository categoryFoodRepository,
                        MenuItemDishRepository menuItemDishRepository,
                        EventRepository eventRepository) {
        this.restaurantRepository = restaurantRepository;
        this.feedbackRepository = feedbackRepository;
        this.personRepository = personRepository;
        this.dishRepository = dishRepository;
        this.categoryFoodRepository = categoryFoodRepository;
        this.menuItemDishRepository = menuItemDishRepository;
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
        if (categoryFoodRepository.count() == 0L) {
            seedCategoryFood();
        }
        if (dishRepository.count() == 0L) {
            seedDish();
        }

        if (menuItemDishRepository.count() == 0L) {
            seedMeuItemDish();
        }
        if (eventRepository.count() == 0) {
            try {
                seedEvent();
            } catch (URISyntaxException e) {
                e.printStackTrace();
            }

        }
    }

    private void seedMeuItemDish() {

        List<Dish> dishesList = dishRepository.findAll();

        for (Long j = 0L; j < getRestaurantList().size(); j++) {
            for (Long i = 0L; i < dishesList.size(); i++) {
                MenuItemDish menuItemDish = new MenuItemDish();
                menuItemDish.setPortionSize(dishPortion[i.intValue()]);
                menuItemDish.setPortionPrice(i + 10L);
                menuItemDish.setDish(dishesList.get(i.intValue()));
                menuItemDish.setPortionUnit(i.longValue() + 70L);
                menuItemDish.setImageUrl(dishUrl[i.intValue()]);
                menuItemDish.setRestaurant(getRestaurantList().get(j.intValue()));
                menuItemDishRepository.save(menuItemDish);
            }
        }
    }

    private void seedCategoryFood() {

        for (Long i = 0L; i < categoryFood.length; i++) {

            CategoryFood category = new CategoryFood();
            category.setName(categoryFood[i.intValue()]);
            categoryFoodRepository.save(category);
        }

    }

    private void seedDish() {

        List<CategoryFood> categoryFoodList = categoryFoodRepository.findAll();

        for (Long i = 0L; i < dishesName.length; i++) {
            Dish dish = new Dish();
            dish.setName(dishesName[i.intValue()]);
            dish.setIngredients(" first ingredient," + " second ingredient," + " third ingredient");
            dish.setCategoryfood(categoryFoodList.get(i.intValue()));
            dishRepository.save(dish);
        }
    }

    public void seedRestaurant() {

        for (int i = 0; i < restaurantName.length; i++) {
            Restaurant rest = new Restaurant(
                restaurantName[i],
                restaurantName[i].concat("@gmail.com").toLowerCase(),
                "Rivne, street ".concat("1" + i),
                "www.".concat(restaurantName[i]).concat(".ua").toLowerCase(),
                "A short description about restaurant "
                    .concat(restaurantName[i])
                    .concat(", and some other info."),
                "12-24",
                false,
                getPersonList().get(i),
                i + 1,
                cordLongitude[i],
                cordLatitude[i],
                Instant.now(),
                i + 1L,
                Instant.now(),
                i + 1L);
            restaurantRepository.save(rest);
        }
    }

    public void seedFeedback() {
        for (int i = 0; i < restaurantName.length; i++) {
            Feedback feedback = new Feedback(
                "User ".concat(userName[i].concat(" write comment to restaurant")),
                true,
                new Date(System.currentTimeMillis()),
                getPersonList().get(i),
                getRestaurantList().get(i),
                3 + i,
                12 + i);
            feedbackRepository.save(feedback);
        }
    }

    public void seedPerson() {
        for (int i = 0; i < userName.length; i++) {
            Person person = new Person(
                userName[i],
                userName[i].concat("@gmail.com").toLowerCase(),
                userName[i],
                "096-77-77-77".concat(String.valueOf(i)));
            personRepository.save(person);
        }
    }

    public void seedEvent() throws URISyntaxException {
        for (int i = 0; i < eventName.length; i++) {
            Event event = new Event();
            event.setRestaurant(getRestaurantList().get(i));
            event.setDate(eventDate[i]);
            event.setImage(new URI(eventImage[i]));
            event.setName(eventName[i]);
            event.setCategory(eventType[i]);
            event.setDescription(eventDesc[i]);
            event.setIsDeleted(false);
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
