import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

const MySpinner = (props) => {
  const { size, color } = props;

  return (
    <View style={ styles.spinnerStyle }>
      <ActivityIndicator
        size={size || "large"}
        color={color || "#00f"}
        style = {{ padding: 10 }}/>
    </View>
  );
};

const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
};

MySpinner.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string
};

export { MySpinner };
