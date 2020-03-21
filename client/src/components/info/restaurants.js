const sortBy = ['Relevance', 'Distance', 'Your match'];
const city = ['Вінницька область', 'Волинська область', 'Дніпропетровська область', 'Донецька область',
  'Житомирська область', 'Закарпатська область', 'Запорізька область', 'Івано-Франківська область',
  'Київська область', 'Кіровоградська область', 'Луганська область', 'Львівська область', 'Миколаївська область',
  'Одеська область', 'Полтавська область', 'Рівненська область', 'Сумська область', 'Тернопільська область',
  'Харківська область', 'Херсонська область', 'Хмельницька область', 'Черкаська область', 'Чернівецька область',
  'Чернігівська область'];
const rating = ['Any', '3,5 star', '4 star', '4,5 star'];
const hours = ['Any', 'Open now', 'Custom'];
const yourPastVisits = ['Any', 'Visited', 'Haven`t visited'];
const types = ['Restaurants', 'Cafes', 'Bars'];

const info = [
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
export const placeHolder = 'Search events';

export default info;
