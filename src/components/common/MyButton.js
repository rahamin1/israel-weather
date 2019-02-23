import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const MyButton = (props) => {

  const color = props.color ? props.color : "#08f";
  const backgroundColor = props.backgroundColor ? props.backgroundColor : "#fff";
  const fontSize = props.fontSize ? props.fontSize : 20;
  const padding = props.padding ? props.padding : 10;

  const styles = {
    buttonStyle: {
      flex: 1,
      alignSelf: 'stretch',
      justifyContent: 'center',
      backgroundColor: backgroundColor,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: color,
      marginLeft: 5,
      marginRight: 5,
      marginTop: 5
    },
    textStyle: {
      alignSelf: 'center',
      color: color,
      fontSize: fontSize,
      fontWeight: 'bold',
      paddingTop: padding,
      paddingBottom: padding
    }
  };

  return (
    <TouchableOpacity style={styles.buttonStyle}
      onPress={props.onPress}>
      <Text style={styles.textStyle}>
        {props.text}</Text>
    </TouchableOpacity>
  );
};

MyButton.propTypes = {
  text: PropTypes.string.isRequired,
	onPress: PropTypes.func.isRequired,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  fontSize: PropTypes.number,
  padding: PropTypes.number
};

export { MyButton };
