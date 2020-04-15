const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'];

const category = ['Party', 'Karaoke', 'Concert', 'For children',
  'Master class', 'Tasting', 'Sports broadcasting'];

const dishcategory = ['Pizza', 'Main course', 'Snacks', 'Dessert'];

const info = [
  {
    id: 'sort-by-category',
    name: 'By category',
    values: category,
  },
  {
    id: 'sort-by-month',
    name: 'By month',
    values: months,
  },
  {
    id: 'sort-by-dishcategory',
    name: 'By category',
    values: dishcategory,
  },
];

export const title = 'EVENTS';
export const placeHolder = 'Search events';

export default info;
