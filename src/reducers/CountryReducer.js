import { FETCH_COUNTRY_START,
  FETCH_COUNTRY_SUCCESS, FETCH_COUNTRY_ERROR } from '../actions/types';

const INITIAL_STATE =
  { countryData: {},   // See structure in the end of
                      //  ../helpers/countryForecastHelpers
    partOfDay: '',
    loading: false,
    error: ''
  };

export default (state = INITIAL_STATE, action) => {
  let data, partOfDay;

  switch (action.type) {
    case FETCH_COUNTRY_START:
      return { ...state, loading: true, error: "" };

    case FETCH_COUNTRY_SUCCESS:
      data = action.payload;
      if (!data.IsraelWeatherForecastMorning &&
        !data.IsraelWeatherForecastEvening) {
        console.warn("Country data not found");
        return { countryData: {}, loading: false, error: "Did not find Country data" };
      } else {
        partOfDay = data.IsraelWeatherForecastMorning ?
          "Morning" : "Evening";
        data = (partOfDay === "Morning" ) ?
          data.IsraelWeatherForecastMorning :
          data.IsraelWeatherForecastEvening;
      }
      return { countryData: data, partOfDay: partOfDay,
        loading: false, error: '' };

    case FETCH_COUNTRY_ERROR:
      return { ...state, ...INITIAL_STATE, error: action.error };

    default:
      return state;
  }
};
