import axios from 'axios';
import iconv from 'iconv-lite';
import { Buffer } from 'buffer';
import { countryXML } from '../helpers/weatherFilesAndCodes';
import { FETCH_COUNTRY_START,
  FETCH_COUNTRY_SUCCESS, FETCH_COUNTRY_ERROR } from './types';

const parseString = require('react-native-xml2js').parseString;

export const fetchCountry = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_COUNTRY_START });

    axios({
      method: 'get',
      url: countryXML,
      responseType: 'arraybuffer'
    }).then((response) => {
      const result = iconv.decode(new Buffer(response.data), 'HEBREW');
      parseString(result, function(err, data) {
        fetchCountrySuccess(dispatch, data);
      });
    }).catch((err) => {
      fetchCountryError(dispatch, err);
    });
  };
};

const fetchCountrySuccess = (dispatch, result) => {
  dispatch({ type: FETCH_COUNTRY_SUCCESS, payload: result });
};

const fetchCountryError = (dispatch, err) => {
  dispatch({ type: FETCH_COUNTRY_ERROR, error: err });
};
