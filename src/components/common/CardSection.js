import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
  return (
    <View style={[styles.cardSectionStyle, props.style]}>
      {props.children}
    </View>
  );
};

const styles = {
  cardSectionStyle: {
    padding: 5,
    backgroundColor: "#fff",
    flexDirection: 'row',
    justifyContent: "flex-start",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    position: "relative"
  }
};

export { CardSection };
