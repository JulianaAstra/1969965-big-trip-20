const tripTypes = ['taxi', 'bus','train', 'ship', 'drive', 'flight','check-in', 'sightseeing', 'restaurant'];

const DateFormats = {
  DAY_MONTH : 'MMM D',
  HOUR_MINUTES: 'H:mm',
  YEAR_MONTH_DAY: 'YY-MM-DD',
  YEAR_MONTH_DAY_TIME: 'YYYY-MM-DDTHH:mm',
  DAY_MONTH_YEAR_TIME_SLASHED: 'DD/MM/YY HH:mm',
  MONTH_DAY: 'MMM D',
  DAY: 'D'
};

const TRIP_COUNT = 3;

const FavoriteBtnStateClasses = {
  ACTIVE: 'event__favorite-btn event__favorite-btn--active',
  INACTIVE: 'event__favorite-btn'
};

const RANDOM_NUM_RANGE = 300;

const BLANK_EVENT_FORM_DATA = {
  type: 'taxi',
  name: '',
  timeStart: '',
  timeEnd: '',
  price: '',
  offers: [],
  description: '',
  isArchive: false,
  isFavorite: false,
  id: '',
  title: ''
};

function getBlankEventFormData() {
  return BLANK_EVENT_FORM_DATA;
}

export { tripTypes, DateFormats, TRIP_COUNT, FavoriteBtnStateClasses, RANDOM_NUM_RANGE, getBlankEventFormData };