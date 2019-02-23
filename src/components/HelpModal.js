import React from 'react';
import { Modal, View, Text, ScrollView } from 'react-native';
import { MyButton } from './common';
import GS from '../styles/GeneralStyles';

const HelpModal = (props) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.visible}
      onRequestClose={() => {
        props.setHelpModal(false);
        props.callBack();
      }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={GS.containerViewStyle}>
          <View style={GS.modalViewStyle}>
            {renderHelpText()}
            <Text style={GS.taglineSmallStyle}>
              שיהיה אחלה מזג אוויר!
            </Text>

            <View style={{ height: 40, margin: 5 }}>
              <MyButton text={"OK"}
                onPress={() => {
                props.setHelpModal(false);
              }} />
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

const renderHelpText = () => {
  return (
    <View>
      <Text style={GS.taglineSmallStyle}>
        איך להשתמש באפליקציה:
      </Text>
      <View style={{ margin: 10 }}>
        <Text style={GS.smallTextStyle}>
        (1) קליק על שם יישוב או על סמל של תחזית יציג את התחזית לאותו יישוב (בחלק מהמקרים מוצג רק סמל בלי שם היישוב והטמפרטורות, מחוסר מקום).
        </Text>
        <Text style={GS.smallTextStyle}>
        (2) קליק על סמל של תחזית עבור אחד החופים יציג את התחזית לאותו חוף.
        </Text>
        <Text style={GS.smallTextStyle}>
        (3) קליק על הדגל יציג את התחזית הארצית;
        קליק על לוח השנה יציג את התחזית הארצית לימים הקרובים.
        </Text>
        <Text style={GS.smallTextStyle}>
        (4) כדי להסיר את התחזית המוצגת ולהחזיר את המפה לתצוגה המקורית,
        יש להקליק על התחזית המוצגת או מחוצה לה
        (קליק על סמל של יישוב אחר יציג את התחזית לאותו יישוב).
        </Text>
        <Text style={GS.smallTextStyle}>
          (5) באופן דומה, אם הזזתם את המפה לטימבוקטו או שהגדלתם אותה כדי לראות את המקדש באמריצר (ובצדק), קליק על המפה יחזיר אותה הביתה.
        </Text>
      </View>
    </View>
  );
};

export default HelpModal;
