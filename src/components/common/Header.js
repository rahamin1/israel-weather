import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

const Header = (props) => {

  return (
    <View style={styles.viewStyle}>
      <Text style={styles.headerStyle}>
        {props.text}
      </Text>
    </View>
  );
};

const styles = {
  viewStyle: {
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    backgroundColor: "#f5f5f5",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    position: 'relative'
  },

  headerStyle: {
    fontSize: 20,
    fontWeight: "bold"
  }
};

Header.propTypes = {
  text: PropTypes.string.isRequired
};

export { Header };
