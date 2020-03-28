package com.lunchtime.enums; //TODO enums should be in models package

//TODO All enums should be written with Caps Lock in UPPER CASE.
// Also, I am not sure that you need this enum. It can create a lot of problems in future if you will try to modify
// it in the future,
// because it is some sort of integer and if you will add something between existing categories it will corrupt some
// logic. You will need to
// add them only after the last element.
// Possible solution: use table in DB for this purpose (for example:id: long, category: string).
// You will able to add new categories using ssh to DB in runtime. Re-write all the logic connected to this enum.
public enum Category {
    party,
    karaoke,
    concert,
    for_children,
    master_class,
    tasting,
    sports_broadcasting
}
