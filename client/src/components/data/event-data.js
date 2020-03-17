const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'];

const eventType = ['Party', 'Karaoke', 'Concert', 'For children',
  'Master class', 'Tasting', 'Sports broadcasting'];

const monthObject = [
  { id: 'sort-by-month' },
  { name: 'By month' },
  { values: months },
];

const eventObject = [
  { id: 'sort-by-category' },
  { name: 'By category' },
  { values: eventType },
];

const eventData = { monthObject, eventObject };

export default eventData;
