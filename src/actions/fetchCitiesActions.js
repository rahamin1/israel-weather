import axios from 'axios';
import iconv from 'iconv-lite';
import { Buffer } from 'buffer';
import { FETCH_CITIES_START,
  FETCH_CITIES_SUCCESS, FETCH_CITIES_ERROR } from './types';
import { citiesXML } from '../helpers/weatherFilesAndCodes';

const parseString = require('react-native-xml2js').parseString;

export const fetchCities = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_CITIES_START });

    axios({
      method: 'get',
      url: citiesXML,
      responseType: 'arraybuffer'
    }).then((response) => {
      const result = iconv.decode(new Buffer(response.data), 'HEBREW');
      parseString(result, function(err, data) {
        fetchCitiesSuccess(dispatch, data);
      });
    }).catch((err) => {
      fetchCitiesError(dispatch, err);
    });
  };
};

const fetchCitiesSuccess = (dispatch, result) => {
  dispatch({ type: FETCH_CITIES_SUCCESS, payload: result });
};

const fetchCitiesError = (dispatch, err) => {
  dispatch({ type: FETCH_CITIES_ERROR, error: err });
};
