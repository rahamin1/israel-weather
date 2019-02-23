import { SET_GLOBAL_STATE } from '../actions/types';

const INITIAL_STATE =
  {
    locale: "en_US"   // Israel locale is iw_IL
  };

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case SET_GLOBAL_STATE:
      return { ...state, locale: action.payload };

    default:
      return state;
  }
};
