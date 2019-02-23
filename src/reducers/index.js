import { combineReducers } from 'redux';
import GlobalStateReducer from './GlobalStateReducer';
import CitiesReducer from './CitiesReducer';
import CountryReducer from './CountryReducer';
import ShoresReducer from './ShoresReducer';

export default combineReducers({

// globalState not used right now.
  globalState: GlobalStateReducer,
  cities: CitiesReducer,
  country: CountryReducer,
  shores: ShoresReducer
});
