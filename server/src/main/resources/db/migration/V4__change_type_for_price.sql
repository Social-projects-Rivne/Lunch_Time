alter table menu_item_dish
    alter column portion_price type double precision,
    add currency varchar (3) default 'UAH';
