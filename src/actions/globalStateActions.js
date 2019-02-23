import { DangerZone } from 'expo';
const { Localization } = DangerZone;
import { SET_GLOBAL_STATE } from './types';

export const setGlobalState = () => {

  return (dispatch) => {
    Localization.getCurrentLocaleAsync()
    .then((currentLocale) => {
      dispatch({ type: SET_GLOBAL_STATE, payload: currentLocale });
    })
    .catch((err) => {
      console.log("Error getting locale: ", err);
    });
  };
};
