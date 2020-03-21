const city = ['Вінницька область', 'Волинська область', 'Дніпропетровська область', 'Донецька область',
  'Житомирська область', 'Закарпатська область', 'Запорізька область', 'Івано-Франківська область',
  'Київська область', 'Кіровоградська область', 'Луганська область', 'Львівська область', 'Миколаївська область',
  'Одеська область', 'Полтавська область', 'Рівненська область', 'Сумська область', 'Тернопільська область',
  'Харківська область', 'Херсонська область', 'Хмельницька область', 'Черкаська область', 'Чернівецька область',
  'Чернігівська область'];
const rating = ['5 star', '4 star', '3 star', '2 star', '1 star'];
const types = ['cafe', 'bar', 'restaurant'];

const info = [
  {
    id: 'get-location-city',
    name: 'Location',
    values: city,
  },
  {
    id: 'sort-by-rating',
    name: 'By rating',
    values: rating,
  },
  {
    id: 'sort-by-types',
    name: 'By types',
    values: types,
  },
];

export const title = 'All list of restaurants';
export const placeHolder = 'Search events';

export default info;
