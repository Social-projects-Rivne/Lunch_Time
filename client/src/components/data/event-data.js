const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'];

const eventType = ['Party', 'Karaoke', 'Concert', 'For children',
  'Master class', 'Tasting', 'Sports broadcasting'];

const eventData = [
  {
    id: 'sort-by-month',
    name: 'By month',
    values: months,
  },
  {
    id: 'sort-by-category',
    name: 'By category',
    values: eventType,
  },
];

export default eventData;
