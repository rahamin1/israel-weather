import React from 'react';
import { Modal, View, Text, Linking, ScrollView } from 'react-native';
import Expo from 'expo';
import { MyButton } from './common';
import GS from '../styles/GeneralStyles';

const AboutModal = (props) => {

  const { version } = Expo.Constants.manifest;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.visible}
      onRequestClose={() => {
        props.setAboutModal(false);
        props.callBack();
      }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={GS.containerViewStyle}>
          <View style={GS.modalViewStyle}>
            <Text style={GS.taglineSmallStyle}>
              על אפליקציית מזג האוויר בישראל:
            </Text>
            <View>
              <Text style={GS.taglineVerySmallStyle}>
              (גירסה {version})
              </Text>
              <Text style={GS.taglineVerySmallStyle}>
                נתוני מזג האוויר נלקחים מאתר השרות המטאורולוגי הישראלי.
              </Text>

              <Text style={GS.smallTextStyle}
                onPress={() => Linking.openURL('https://www.flaticon.com/authors/smashicons')}>
                Most of the weather icons, the calendar icon and the wave icons were designed by{' '}
                  <Text style={GS.smallBlueTextStyle}>Smashicons </Text>
                 and downloaded from{' '}
                 <Text style={GS.smallBlueTextStyle}
                   onPress={() => Linking.openURL('https://www.flaticon.com')}>
                     www.flaticon.com.
                 </Text>
              </Text>

              <Text style={GS.smallTextStyle}>
                <Text style={GS.smallTextStyle}>
                  Some of the weather icons were designed by{' '}
                </Text>
                <Text style={GS.smallTextStyle} onPress={() => Linking.openURL('https://www.flaticon.com/authors/linector')}>
                  <Text style={GS.smallBlueTextStyle}>Linector, </Text>
                </Text>
                <Text style={GS.smallTextStyle}
                  onPress={() => Linking.openURL('https://www.flaticon.com/authors/zlatko-najdenovski')}>
                  <Text style={GS.smallBlueTextStyle}>Zlatko Najdenovski, </Text>
                </Text>
                <Text style={GS.smallTextStyle}
                  onPress={() => Linking.openURL('https://www.flaticon.com/authors/pixel-perfect')}>
                  <Text style={GS.smallBlueTextStyle}>and Dam, </Text>
                </Text>
                <Text style={GS.smallTextStyle}>
                  and downloaded from{' '}
                  <Text style={GS.smallBlueTextStyle}
                    onPress={() => Linking.openURL('https://www.flaticon.com')}>
                      www.flaticon.com.
                  </Text>
                </Text>
              </Text>

              <Text style={GS.smallTextStyle}>
                All the above icons are licensed by{' '}
                 <Text style={GS.smallBlueTextStyle}
                   onPress={() => Linking.openURL('http://creativecommons.org/licenses/by/3.0/')}>
                     Creative Commons BY 3.0.
                 </Text>
              </Text>

              <Text style={GS.smallTextStyle}>
                <Text style={GS.smallTextStyle}>
                  The Israeli flag image was created by{' '}
                </Text>
                <Text style={GS.smallBlueTextStyle}
                  onPress={() => Linking.openURL('https://www.freeimages.com/photographer/Boooyaka-53500')}>
                  Amos Chris{' '}
                </Text>
                <Text style={GS.smallTextStyle}>
                  and downloaded from{' '}
                </Text>
                <Text style={GS.smallBlueTextStyle}
                  onPress={() => Linking.openURL('https://www.freeimages.com')}>
                   www.freeimages.com.
                </Text>
              </Text>

              <Text style={GS.taglineVerySmallStyle}
                onPress={() => Linking.openURL('https://www.upwork.com/freelancers/~01c55c0e7cd70bece4')}>
                האפליקציה פותחה על ידי
                <Text style={GS.
                  blueTextStyle}> יוסי גלס</Text>.
              </Text>
              <Text style={GS.taglineVerySmallStyle}
                onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.yossiglass.israelWeather&hl=en')}>
                  אוהבים את האפליקציה? הקליקו
                <Text style={GS.
                  blueTextStyle}>{' '}כאן</Text>.
              </Text>
            </View>
            <View style={{ height: 40, margin: 5 }}>
              <MyButton text={"OK"}
                onPress={() => {
                props.setAboutModal(false);
              }} />
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default AboutModal;
