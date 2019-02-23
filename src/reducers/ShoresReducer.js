import {
  FETCH_SHORES_START, FETCH_SHORES_SUCCESS, FETCH_SHORES_ERROR }
    from '../actions/types';

const INITIAL_STATE =
  { shoresData: {},   // See structure in the end of
                      //  ../helpers/shoresForecastHelpers
    partOfDay: '',
    loading: false,
    error: ''
  };

export default (state = INITIAL_STATE, action) => {
  let data, partOfDay;

  switch (action.type) {
    case FETCH_SHORES_START:
      return { ...state, loading: true, error: "" };

    case FETCH_SHORES_SUCCESS:

      data = action.payload;

      if (!data.IsraelSeaForecastMorning &&
        !data.IsraelSeaForecastEvening) {
        console.warn("Shores data not found");
        return { shoresData: {}, loading: false, error: "Did not find shores data" };
      } else {
        partOfDay = data.IsraelSeaForecastMorning ?
          "Morning" : "Evening";
        data = (partOfDay === "Morning" ) ?
          data.IsraelSeaForecastMorning :
          data.IsraelSeaForecastEvening;
      }

      return { shoresData: data, partOfDay: partOfDay,
        loading: false, error: '' };

    case FETCH_SHORES_ERROR:
      return { ...state, ...INITIAL_STATE, error: action.error };

    default:
      return state;
  }
};
