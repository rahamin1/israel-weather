import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

const MyText = (props) => {
  return (
    <Text
      numberOfLines={props.numberOfLines}
      style={styles.textStyle}>
      {props.children}
    </Text>
  );
};

const styles = {
  textStyle: {
    color: '#000',
    fontSize: 17,
    padding: 5
  }
};

MyText.propTypes = {
	numberOfLines: PropTypes.number
};

export { MyText };
