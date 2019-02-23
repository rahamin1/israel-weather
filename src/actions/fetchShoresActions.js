import axios from 'axios';
import iconv from 'iconv-lite';
import { Buffer } from 'buffer';
import { FETCH_SHORES_START,
  FETCH_SHORES_SUCCESS, FETCH_SHORES_ERROR } from './types';
import { shoresXML } from '../helpers/weatherFilesAndCodes';

const parseString = require('react-native-xml2js').parseString;

export const fetchShores = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_SHORES_START });

    axios({
      method: 'get',
      url: shoresXML,
      responseType: 'arraybuffer'
    }).then((response) => {
      const result = iconv.decode(new Buffer(response.data), 'HEBREW');
      parseString(result, function(err, data) {
        fetchShoresSuccess(dispatch, data);
      });
    }).catch((err) => {
      fetchShoresError(dispatch, err);
    });
  };
};

const fetchShoresSuccess = (dispatch, result) => {
  dispatch({ type: FETCH_SHORES_SUCCESS, payload: result });
};

const fetchShoresError = (dispatch, err) => {
  dispatch({ type: FETCH_SHORES_ERROR, error: err });
};
