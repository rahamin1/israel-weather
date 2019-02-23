import React from 'react';
import { Text, View, Modal } from 'react-native';
import { CardSection } from './CardSection';
import { MyButton } from './MyButton';

const ConfirmModal = ({ children, visible, onAccept, onDecline }) => {

  const { containerStyle, textStyle, cardSectionStyle } = styles;
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {}}>
      <View style={containerStyle}>
        <CardSection style={cardSectionStyle}>
          <Text style={textStyle}>
            {children}
          </Text>
        </CardSection>
        <CardSection>
          <MyButton text="Yes" onPress={onAccept} />
          <MyButton text="No" onPress={onDecline} />
        </CardSection>
      </View>
    </Modal>
  );
};

const styles = {
  cardSectionStyle: {
    justifyContent: 'center'
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)', // 0.75 opacity
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  }
};

export { ConfirmModal };
