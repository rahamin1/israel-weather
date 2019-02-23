import React from 'react';
import { Image, Linking, TouchableOpacity } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import MapDisplay from './components/MapDisplay';

const RouterComponent = () => {
  return (
    <Router navigationBarStyle={{ backgroundColor: '#A5BDF6' }}>
      <Scene key="root" hideNavBar>
        <Scene key="main" initial>
          <Scene key="MapDisplay" component={MapDisplay}
            titleStyle={{ alignSelf: 'center', paddingTop: 20 }}
            title="תחזית מזג האוויר בישראל"
            backTitle=""
            renderLeftButton={renderLeftButton}
            rightTitle="" />
        </Scene>
      </Scene>
    </Router>
  );
};

const rateTheApp = () => {
  console.log('pressed');
  Linking.openURL('https://play.google.com/store/apps/details?id=com.yossiglass.israelWeather&hl=en');
};

const renderLeftButton = () => {
  return (
    <TouchableOpacity onPress={rateTheApp} style={{ marginTop: 25, marginLeft: 20 }}>
    <Image onPress={rateTheApp}
      source={require('./images/star.png')}
      style={{ height: 25, width: 25 }}/>
    </TouchableOpacity>
  );
};

export default RouterComponent;
