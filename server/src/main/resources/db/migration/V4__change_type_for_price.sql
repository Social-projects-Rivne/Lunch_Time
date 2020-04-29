alter table menu_item_dish
    add currency varchar (3) default 'UAH',
    alter column portion_price type numeric(6,2);
