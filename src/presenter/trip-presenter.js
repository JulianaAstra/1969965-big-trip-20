import { render, replace, remove } from '../framework/render.js';
import TripItemView from '../view/trip-item-view.js';
import EventFormView from '../view/event-form-view.js';
import { UserAction, UpdateType } from '../constants.js';
import { isDatesEqual } from '../utils/trip.js';
import { findDifference } from '../utils/common.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class TripPresenter {
  #tripContainer;
  #tripComponent = null;
  #eventFormComponent = null;
  #trip;
  #offers;
  #destinations;
  #destinationsList;
  #handleDataChange;
  #handleModeChange;
  #mode = Mode.DEFAULT;

  constructor ({tripContainer, onDataChange, onModeChange}) {
    this.#tripContainer = tripContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init (trip, offers, destinations, destinationsList) {
    this.#trip = trip;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#destinationsList = destinationsList;
    const prevTripComponent = this.#tripComponent;
    const prevEventFormComponent = this.#eventFormComponent;

    this.#tripComponent = new TripItemView({trip: this.#trip, offers: this.#offers, destinations: this.#destinations, onEditClick: this.#handleEditClick, onFavoriteClick: this.#handleFavoriteClick});

    this.#eventFormComponent = new EventFormView({trip: this.#trip, offers: this.#offers, destinations: this.#destinations, destinationsList: this.#destinationsList, onRollUpBtnClick: this.#handleRollUpBtnClick, onFormSubmit: this.#handleFormSubmit, onDeleteClick: this.#handleDeleteClick});

    if (prevTripComponent === null || prevEventFormComponent === null) {
      render(this.#tripComponent, this.#tripContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#tripComponent, prevTripComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#eventFormComponent, prevEventFormComponent);
    }

    remove(prevTripComponent);
    remove(prevEventFormComponent);
  }

  destroy() {
    remove(this.#tripComponent);
    remove(this.#eventFormComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#eventFormComponent.reset(this.#trip);
      this.#replaceFormToTrip();
    }
  }

  #replaceTripToForm() {
    replace(this.#eventFormComponent, this.#tripComponent);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToTrip() {
    replace(this.#tripComponent, this.#eventFormComponent);
    this.#mode = Mode.DEFAULT;
  }

  #handleEditClick = () => {
    this.#replaceTripToForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleRollUpBtnClick = () => {
    this.#eventFormComponent.reset(this.#trip);
    this.#replaceFormToTrip();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#eventFormComponent.reset(this.#trip);
      this.#replaceFormToTrip();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(UserAction.UPDATE_TRIP, UpdateType.MINOR, {...this.#trip, isFavorite: !this.#trip.isFavorite}, this.#offers, this.#destinations, this.#destinationsList);
  };

  #handleFormSubmit = (trip, offers, destinations, destinationsList) => {
    const isMinorUpdate = !isDatesEqual(this.#trip.timeStart, trip.timeStart) && !isDatesEqual(this.#trip.timeEnd, trip.timeStart);

    const isMinorUpdate2 = findDifference(this.#trip.timeStart, this.#trip.timeEnd) !== findDifference(trip.timeStart, trip.timeEnd);

    const isMinorUpdate3 = this.#trip.price !== trip.price;

    const isMinorUpdateBig = isMinorUpdate || isMinorUpdate2 || isMinorUpdate3;

    this.#handleDataChange(UserAction.UPDATE_TRIP, isMinorUpdateBig ? UpdateType.MINOR : UpdateType.PATCH, trip, offers, destinations, destinationsList);
    this.#replaceFormToTrip();
  };

  #handleDeleteClick = (trip, offers, destinations, destinationsList) => {
    this.#handleDataChange(UserAction.DELETE_TRIP, UpdateType.MINOR, trip, offers, destinations, destinationsList);
  };
}
