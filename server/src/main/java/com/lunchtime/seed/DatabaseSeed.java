package com.lunchtime.seed;

import com.lunchtime.models.*;
import com.lunchtime.repository.*;
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
    String[] dishesName = new String[] {"Pizza(salami)", "Soup", "Hamburger", "Potato with meet", "Stake"};
    String[] categoryFood = new String[] {"Drinks", "Snacks", "Main cource", "Dessert"};
    String[] dishPortion = new String[] {"500 gr", "300 gr", "230 gr", "150 gr", "400 gr"};
    Float[] cordLatitude = new Float[] { 50.616294f, 50.618261f, 50.620219f, 50.616146f, 50.618318f, 50.624449f };
    Float[] cordLongitude = new Float[] { 26.275728f, 26.260064f, 26.241863f, 26.253994f, 26.252249f, 26.249677f };


    private final RestaurantRepository restaurantRepository;
    private final FeedbackRepository feedbackRepository;
    private final PersonRepository personRepository;
    private final DishRepository dishRepository;
    private final CategoryFoodRepository categoryFoodRepository;
    private final MenuItemDishRepository menuItemDishRepository;

    public DatabaseSeed(RestaurantRepository restaurantRepository,
                        FeedbackRepository feedbackRepository,
                        PersonRepository personRepository,
                        DishRepository dishRepository,
                        CategoryFoodRepository categoryFoodRepository,
                        MenuItemDishRepository menuItemDishRepository) {
        this.restaurantRepository = restaurantRepository;
        this.feedbackRepository = feedbackRepository;
        this.personRepository = personRepository;
        this.dishRepository = dishRepository;
        this.categoryFoodRepository = categoryFoodRepository;
        this.menuItemDishRepository = menuItemDishRepository;
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
            seedCategoryFoodRepository();
        }

        if (dishRepository.count() == 0L) {
            seedDish();
        }

        if (menuItemDishRepository.count() == 0L) {
            seedMeuItemDishRepository();
        }

    }

    private void seedMeuItemDishRepository() {

        List<Dish> dishesList = dishRepository.findAll();
        List<Restaurant> restaurantList = restaurantRepository.findAll();
        for (Long i = 0L; i < dishesList.size(); i++) {
            MenuItemDish menuItemDish = new MenuItemDish();
            menuItemDish.setPortionSize(dishPortion[i.intValue()]);
            menuItemDish.setPortionPrice(i.toString() + "00 grn");
            menuItemDish.setDish(dishesList.get(i.intValue()));
            menuItemDish.setPortionUnit(i.longValue() + 70L);
            menuItemDish.setImageUrl("https://www.allstar-pizza.com/images/Pizza.jpg");
            menuItemDish.setRestaurant(restaurantList);
            menuItemDishRepository.save(menuItemDish);
        }
    }

    private void seedCategoryFoodRepository() {


        for (Long i = 0L; i < categoryFood.length; i++) {

            CategoryFood category = new CategoryFood();
            category.setName(categoryFood[i.intValue()]);
            categoryFoodRepository.save(category);
        }

    }

    private void seedDish() {

        for (Long i = 0L; i < dishesName.length; i++) {
            Dish dish = new Dish();
            dish.setName(dishesName[i.intValue()]);
            dish.setIngredients(i.toString() + " example," + " example second," + " third ingr ");
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

}
