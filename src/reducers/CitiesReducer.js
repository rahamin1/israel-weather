import {
  FETCH_CITIES_START, FETCH_CITIES_SUCCESS, FETCH_CITIES_ERROR }
    from '../actions/types';

const INITIAL_STATE =
  { citiesData: {},   // See structure in the end of
                      //  ../helpers/citiesForecastHelpers
    partOfDay: '',
    loading: false,
    error: ''
  };

export default (state = INITIAL_STATE, action) => {
  let data, partOfDay;

  switch (action.type) {
    case FETCH_CITIES_START:
      return { ...state, loading: true, error: "" };

    case FETCH_CITIES_SUCCESS:

      data = action.payload;
      if (!data.IsraelCitiesWeatherForecastMorning &&
        !data.IsraelCitiesWeatherForecastEvening) {
        console.warn("Cities data not found");
        return { citiesData: {}, loading: false, error: "Did not find cities data" };
      } else {
        partOfDay = data.IsraelCitiesWeatherForecastMorning ?
          "Morning" : "Evening";
        data = (partOfDay === "Morning" ) ?
          data.IsraelCitiesWeatherForecastMorning :
          data.IsraelCitiesWeatherForecastEvening;
      }

      return { citiesData: data, partOfDay: partOfDay,
        loading: false, error: '' };

    case FETCH_CITIES_ERROR:
      return { ...state, ...INITIAL_STATE, error: action.error };

    default:
      return state;
  }
};
