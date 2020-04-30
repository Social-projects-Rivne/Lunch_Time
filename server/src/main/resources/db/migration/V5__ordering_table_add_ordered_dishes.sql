alter table ordering
    drop column if exists dish_details_id;

alter table ordering
    add column ordered_dishes jsonb;
