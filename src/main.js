import FiltersPresenter from './presenter/filters-presenter.js';
import TripListPresenter from './presenter/board-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import TripsModel from './modell/trips-model.js';

const infoHeaderElement = document.querySelector('.trip-main');
const filtersContainerElement = document.querySelector('.trip-controls__filters');
const mainSectionElement = document.querySelector('.trip-events');

const tripsModel = new TripsModel();

const filtersPresenter = new FiltersPresenter({filtersContainer: filtersContainerElement, tripsModel});
const tripListPresenter = new TripListPresenter({
  tripListContainer: mainSectionElement,
  tripsModel});
const tripInfoPresenter = new TripInfoPresenter({infoContainer: infoHeaderElement, tripsModel});

tripInfoPresenter.init();
filtersPresenter.init();
tripListPresenter.init();

