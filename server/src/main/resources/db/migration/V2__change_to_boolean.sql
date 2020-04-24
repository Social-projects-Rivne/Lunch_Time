alter table menu_item_dish
    alter column is_deleted type boolean;

alter table menu_item_dish owner to "lunchTimeAppUser";
