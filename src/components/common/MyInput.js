import React from 'react';
import { View, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';

const MyInput = (props) => {
  const { keyboardType, placeholder, onChangeText, autoCorrect,
    secureTextEntry, value } = props;
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.labelStyle}>{props.label}</Text>
      <TextInput style={styles.inputStyle}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        placeholder={placeholder}
        autoCorrect={autoCorrect}
        secureTextEntry={secureTextEntry}
        value= {value} />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

MyInput.propTypes = {
  label: PropTypes.string.isRequired,
	onChangeText: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
  keyboardType: PropTypes.oneOf(['default',
    'numeric', 'email-address', 'phone-pad']),
  autoCorrect: PropTypes.bool,
  placeholder: PropTypes.string,
  secureTextEntry: PropTypes.bool
};

export { MyInput };
