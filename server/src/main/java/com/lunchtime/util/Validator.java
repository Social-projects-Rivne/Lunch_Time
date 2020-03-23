package com.lunchtime.util;

import com.lunchtime.enums.Category;

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
