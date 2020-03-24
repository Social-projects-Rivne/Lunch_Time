const sortBy = ['Relevance', 'Distance', 'Your match'];
const city = ['Cherkasy', 'Chernihiv', 'Chernivtsi', 'Dnipropetrovsk', 'Donetsk', 'Ivano-Frankivsk',
  'Kharkiv', 'Kherson', 'Khmelnytskyi', 'Kiev', 'Kirovohrad', 'Luhansk', 'Lviv', 'Mykolaiv', 'Odessa',
  'Poltava', 'Rivne', 'Sumy', 'Ternopil', 'Vinnytsia', 'Volyn', 'Zakarpattia', 'Zaporizhia', 'Zhytomyr'];
const rating = ['Any', '3,5 star', '4 star', '4,5 star'];
const hours = ['Any', 'Open now', 'Custom'];
const yourPastVisits = ['Any', 'Visited', 'Haven`t visited'];
const types = ['Restaurants', 'Cafes', 'Bars'];

export const info = [
  {
    id: 'sort-by',
    name: 'Sort by',
    values: sortBy,
  },
  {
    id: 'choose-city',
    name: 'City',
    values: city,
  },
  {
    id: 'choose-rating',
    name: 'Rating',
    values: rating,
  },
  {
    id: 'choose-hours',
    name: 'Hours',
    values: hours,
  },
  {
    id: 'choose-visits',
    name: 'Your past visits',
    values: yourPastVisits,
  },
  {
    id: 'choose-type',
    name: 'Food & drinks',
    values: types,
  },
];

export const title = 'All list of restaurants';
export const placeHolder = 'Search Restaurants, food & drinks';
