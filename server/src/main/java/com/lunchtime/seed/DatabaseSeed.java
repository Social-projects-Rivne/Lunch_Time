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

    String[] dishesName = new String[] {"Salami", "Soup", "Hamburger", "Ice"};
    String[] categoryFood = new String[] {"Pizza", "Main cource", "Snacks", "Dessert"};
    String[] dishPortion = new String[] {"500 gr", "300 gr", "230 gr", "150 gr"};
    String[] dishUrl = new String[] { "https://www.allstar-pizza.com/images/Pizza.jpg",
                                      "https://art-lunch.ru/wp-content/uploads/2017/12/Soup_with_meatballs_001.jpg",
                                      "https://apelsinka-rezept.ru/wp-content/uploads/domachniy-gamburger.jpg",
                                      "https://ukr.media/static/ba/aimg/3/0/3/303704_1.jpg"};
    String[] restaurantName = new String[] {"Celentano", "Manhattan", "Egoista", "CasaNuova", "LaRiva",
        "TrattoriaDaVentotto", "Father", "Avocado", "PuriRivne", "Brooklyn", "Masuri",
        "Melrose", "Valenca", "Marlow&Sons", "BonefishGrill", "Rubirosa", "LunaStella", "Beso", "Burgerclub",
        "Gavana", "Amadeus", "Semifreddo", "Bigoli", "RedLobster", "Semifreddo", "Chachapuri", "Citronelle"};
    String[] userName = new String[] {"Bob", "Devid", "Tania", "Pleasure", "Kruz", "Tom", "Alan", "Oksana",
        "Leo", "Fred", "Olena", "Andriy", "Tania", "Pleasure", "Kruz", "Tom", "Alan", "Bob", "Yura", "Roma",
        "Oleg", "Nazar", "Kolia", "David", "Olia", "Sasha", "Yulia", "Ivan", "Vova"};
    String[] eventName = new String[] {"Party", "Karaoke", "Concert", "Party", "Tasting"};
    String[] eventDate = new String[] {"2020-03-25 10:20", "2020-03-26 17:05",
        "2020-04-05 12:00", "2020-12-31 15:00", "2021-01-20 22:00"};
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

        if (personRepository.count() == 0L) {
            seedPerson();
        }

        if (restaurantRepository.count() == 0L) {
            seedRestaurant();
        }

        if (feedbackRepository.count() == 0L) {
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

        if (eventRepository.count() == 0L) {
            try {
                seedEvent();
            } catch (URISyntaxException e) {
                e.printStackTrace();
            }

        }

    }

    private void seedMeuItemDish() {

        List<Dish> dishesList = dishRepository.findAll();
        List<Restaurant> restaurantList = restaurantRepository.findAll();

        for (Long j = 0L; j < restaurantList.size(); j++) {
            for (Long i = 0L; i < dishesList.size(); i++) {
                MenuItemDish menuItemDish = new MenuItemDish();
                menuItemDish.setPortionSize(dishPortion[i.intValue()]);
                menuItemDish.setPortionPrice(i.toString() + "10 grn");
                menuItemDish.setDish(dishesList.get(i.intValue()));
                menuItemDish.setPortionUnit(i.longValue() + 70L);
                menuItemDish.setImageUrl(dishUrl[i.intValue()]);
                menuItemDish.setRestaurant(restaurantList.get(j.intValue()));
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

        List<Person> person = personRepository.findAll();

        for (Long i = Long.valueOf(0); i < restaurantName.length; i++) {

            Restaurant rest = new Restaurant(restaurantName[i.intValue()],
                restaurantName[i.intValue()].concat("@gmail.com").toLowerCase(),
                "Rivne, street ".concat("1" + i.toString()),
                "www.".concat(restaurantName[i.intValue()]).concat(".ua").toLowerCase(),
                "Description for restaurant ".concat(restaurantName[i.intValue()]),
                "12-24", false,
                 person.get(i.intValue()), i.intValue() + 1, cordLongitude[i.intValue()],
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

    public void  seedEvent() throws URISyntaxException {
        List<Restaurant> restaurantList = restaurantRepository.findAll();
        for (int i = 0; i < eventName.length; i++) {
            Event event = new Event();
            event.setRestaurant(restaurantList.get(i));
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

}
