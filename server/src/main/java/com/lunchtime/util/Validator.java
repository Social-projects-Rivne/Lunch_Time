package com.lunchtime.util;

import com.lunchtime.enums.Category;

//TODO this class is not needed. Re-read how enums work. You can put this method in directly enum.
// It is not a good practice to have some logic in enum, but if you want to have such sort of a method,
// you should add it in enum. see also comment
// in Category enum.
public class Validator {

    public static boolean checkCategory(String category) {
        for (Category c : Category.values()) {
            if (c.name().equals(category)) {
                return true;
            }
        }
        return false;
    }

}
