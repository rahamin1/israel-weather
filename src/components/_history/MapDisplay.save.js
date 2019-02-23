import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppState, Dimensions, View, Text, ActivityIndicator, Image } from 'react-native';
import { MapView } from 'expo';
import _ from 'lodash';
import { CardSection, MyButton } from './common';
import CountryMarker from './CountryMarker';
import CityMarker from './CityMarker';
import ShoreMarker from './ShoreMarker';
import AboutModal from './AboutModal';
import HelpModal from './HelpModal';
import { fetchCities, fetchCountry, fetchShores, setGlobalState } from '../actions';
import { getCitiesArray, cityDisplayedMode,
    getCitiesForecastTitle } from '../helpers/citiesForecastHelpers';
import { getShoresArray, shoreDisplayedMode,
    getShoresForecastTitle } from '../helpers/shoresForecastHelpers';
import { PORTRAIT, LANDSCAPE, ACTIVE, INACTIVE } from '../helpers/constants';
import { nextHebDays, sleep } from '../helpers/helpers';
import { weatherCodes, weatherCodesA7 } from '../helpers/weatherFilesAndCodes';
import { shoreCodes, shoreCodesA7 } from '../helpers/shoresFilesAndCodes';
import { getCountryInfo,
    getCountryForecastTitle } from '../helpers/countryForecastHelpers';
import { israelRegionPortrait, israelRegionLandscape } from '../helpers/mapsHelpers';
import { israelFlag, israelFlag7,
    calendarImage, calendarImage7 } from '../helpers/weatherFilesAndCodes';

class MapDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMapReady: false,
      aboutModalVisible: false,
      helpModalVisible: false,
      region: israelRegionPortrait,
      zoomed: false,
      resetRegion: israelRegionPortrait,
      dim: {},   // { width: , hight: }
      appState: INACTIVE
    };
    this.renderAboutModal = this.renderAboutModal.bind(this);
    this.setAboutModal = this.setAboutModal.bind(this);
    this.renderHelpModal = this.renderHelpModal.bind(this);
    this.setHelpModal = this.setHelpModal.bind(this);
    this.renderCities = this.renderCities.bind(this);
    this.renderShores = this.renderShores.bind(this);
    this.refresh = this.refresh.bind(this);
    this.initRegion = this.initRegion.bind(this);
    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.handleDimensionsChange = this.handleDimensionsChange.bind(this);
    this.setDimensionsAndOrientation =
      this.setDimensionsAndOrientation.bind(this);
  }

/*
  componentWillMount() {
    const initialDim = Dimensions.get('window');
    this.setDimensionsAndOrientation(initialDim);
  }
*/

  componentDidMount() {

    const initialDim = Dimensions.get('window');
    this.setDimensionsAndOrientation(initialDim);

    this.addListeners();
    //this.props.setGlobalState();  // used for setting locale, not needed now

    // a 2 seconds timeout in order to allow loading of images
    // which is done in renderLoading()
    // Not needed when images are displayed within markers
    // (needed when displayed as a seperate <Image />)
    /*
    setTimeout(this.props.fetchCities, 2000);
    setTimeout(this.props.fetchCountry, 2000);
    setTimeout(this.props.fetchShores, 2000);
    */

    this.props.fetchCities();
    this.props.fetchCountry();
    this.props.fetchShores();

    // The following line has been commented out since there is a warning
    // regarding using long timers in Adndroid
    // Maybe it is worth exploring react-native-background-timer
    //setInterval(this.props.fetchCities, 3600000);
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  onMapLayout() {
    this.setState({ isMapReady: true });
  }

  render() {

    const citiesArray = getCitiesArray(this.props.cities);
    const shoresArray = getShoresArray(this.props.shores);
    const countryInfo = getCountryInfo(this.props.country);
    if (!citiesArray || !shoresArray || !countryInfo) { // loading of data is not done yet
      if (!this.props.cities.error && !this.props.shores.error && !this.props.country.error)
        return this.renderLoading();
      else
        return this.renderLoadingError();
    } else {
      const partOfDay = this.props.country.partOfDay;
      const shoresPartOfDay = this.props.shores.partOfDay;
      const citiesForecastTitle = getCitiesForecastTitle(partOfDay);
      const shoresForecastTitle = getShoresForecastTitle(shoresPartOfDay);
      const countryForecastTitle = getCountryForecastTitle(partOfDay);
      const nextDaysArray = nextHebDays(partOfDay);

      return (
        <View style={{ flex: 1 }}>
          <MapView
            style={{ flex: 1 }}
            zoomEnabled = {true}
            rotateEnabled = {true}
            scrollEnabled = {true}
            loadingEnabled={true}
            mapType = 'satellite'
            region={this.state.region}
            onLayout={this.onMapLayout.bind(this)}
            onPress={(e) => this.onMapPress.bind(this)(e)}
            onRegionChangeComplete={(region) =>
              this.onRegionChangeComplete(region)}
            >
            <View>
              <View>
                {this.state.isMapReady &&
                  this.renderCities(citiesArray, citiesForecastTitle, nextDaysArray)}
              </View>
              <View>
                {this.state.isMapReady &&
                  this.renderShores(shoresArray, shoresForecastTitle, shoresPartOfDay)}
              </View>
              <View>
                {this.state.isMapReady &&
                  <View>
                    <CountryMarker
                      data={countryInfo}
                      forecastTitle={countryForecastTitle}
                      nextDays={false}
                      nextDaysArray = {nextDaysArray}
                      callBack={this.initRegion} />
                    <CountryMarker
                      data={countryInfo}
                      forecastTitle={countryForecastTitle}
                      nextDays={true}
                      nextDaysArray = {nextDaysArray}
                      callBack={this.initRegion} />
                  </View> }
              </View>
            </View>
          </MapView>
          {this.renderButtons()}
          <AboutModal
            visible={this.state.aboutModalVisible}
            setAboutModal={this.setAboutModal} />
          <HelpModal
            visible={this.state.helpModalVisible}
            setHelpModal={this.setHelpModal} />
        </View>
      );
    }
  }

  renderButtons() {
    return (
      <CardSection>
        <MyButton text="עזרה" fontSize={14} padding={5}
          backgroundColor="#fff"
          onPress={() => {
            this.setHelpModal(true);
          }}/>
        <MyButton text="ריענון" fontSize={14} padding={5}
          backgroundColor="#fff"
          onPress={this.refresh} />
        <MyButton text="אודות" fontSize={14} padding={5}
          backgroundColor="#fff"
          onPress={() => {
            this.setAboutModal(true);
          }}/>
      </CardSection>
    );
  }

  renderCities(citiesArray, citiesForecastTitle, nextDays) {
    return (
      citiesArray.map((city) => {
        const cityDisplayMode = cityDisplayedMode(city);
        if (this.state.zoomed || cityDisplayMode !== 'NONE') {
          return (
            <CityMarker key={city.LocationMetaData[0].LocationId[0]}
               cityData={city} forecastTitle={citiesForecastTitle}
               cityDisplayMode={cityDisplayMode}
               nextDays = {nextDays}
               callBack={this.initRegion}
               zoomed = {this.state.zoomed} />
          );
        }
      })
    );
  }

  renderShores(shoresArray, shoresForecastTitle, partOfDay) {
    return (
      shoresArray.map((shore) => {
        const shoreDisplayMode = shoreDisplayedMode(shore);
        if (this.state.zoomed || shoreDisplayMode !== 'NONE') {
          return (
            <ShoreMarker key={shore.LocationMetaData[0].LocationId[0]}
               shoreData={shore} forecastTitle={shoresForecastTitle}
               shoreDisplayMode={shoreDisplayMode}
               callBack={this.initRegion}
               zoomed = {this.state.zoomed}
               partOfDay = {partOfDay} />
          );
        }
      })
    );
  }

  renderLoading() {
    /*
    {this.renderWeatherImages(weatherCodes)}
    {this.renderWeatherImages(weatherCodesA7)}
    {this.renderShoreImages(shoreCodes)}
    {this.renderShoreImages(shoreCodesA7)}
    <Image
      source={israelFlag}
      style={{ width: 0, height: 0 }}
    />
    <Image
      source={israelFlag7}
      style={{ width: 0, height: 0 }}
    />
    <Image
      source={calendarImage}
      style={{ width: 0, height: 0 }}
    />
    <Image
      source={calendarImage7}
      style={{ width: 0, height: 0 }}
    />
    */
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator
          size={"large"}
          color={"#00f"}
          style = {{ padding: 10, flex: 3  }}/>
        <Text style={{ flex: 2, paddingLeft: 10, paddingRight: 10,
          fontSize: 28, fontWeight: 'bold', textAlign: 'center'  }}>
          הנתונים נטענים...
          (בדרך כלל כדאי לקחת כובע וקרם הגנה תמיד מומלץ)
        </Text>
      </View>
    );
  }

  renderWeatherImages(weatherCodes) {
    const arr = _.values(weatherCodes);

    return arr.map((code, index) => {
      return (
        <Image
          key={index}
          source={code.imageName}
          style={{ width: 0, height: 0 }}
        />
      );
    });
  }

  renderShoreImages(shoreCodes) {
    const arr = _.values(shoreCodes);

    return arr.map((code, index) => {
      return (
        <Image
          key={index}
          source={code.imageName}
          style={{ width: 0, height: 0 }}
        />
      );
    });
  }

  renderLoadingError() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{ flex: 1, justifyContent: 'center',
            paddingLeft: 10, paddingRight: 10 }}>
          <Text style=
            {{ fontSize: 28, fontWeight: 'bold', textAlign: 'center' }}>
            תקלה בטעינת הנתונים.
            אולי האינטרנט נפל?
            נסי/ה לבדוק וללחוץ "ריענון".
          </Text>
          <Text style=
            {{ fontSize: 28, fontWeight: 'bold', textAlign: 'center' }}>
            {' '}
          </Text>
          <Text style=
            {{ fontSize: 28, fontWeight: 'bold', textAlign: 'center' }}>
            אם הכל בסדר אצלך,
            אנחנו מבטיחים לתקן.
            אנא נסי/ה שוב אחר כך :)
          </Text>
        </View>
        <View>
          {this.renderButtons()}
        </View>
      </View>
    );

  }

  onMapPress(e) {

    //console.log("In onMapPress. coordinate: ", e.nativeEvent.coordinate);
    this.initRegion();
  }

  initRegion() {
    this.setState({ region: this.state.resetRegion, zoomed: false });
  }

  renderAboutModal() {
    this.setState({ aboutModalVisible: true });
  }

  setAboutModal(modalState) {
    this.setState({ aboutModalVisible: modalState });
  }

  renderHelpModal() {
    this.setState({ helpModalVisible: true });
  }

  setHelpModal(modalState) {
    this.setState({ helpModalVisible: modalState });
  }

  initData() {

    //this.props.setGlobalState();  // used for setting locale, not needed now
    this.props.fetchCities();
    this.props.fetchCountry();
    this.props.fetchShores();

    this.setState({ region: this.state.resetRegion,
      zoomed: false, isMapReady: true });
  }

  refresh() {

    //this.props.setGlobalState();  // used for setting locale, not needed now
    this.initData();
    sleep(1); // sleep 1 second in order to give the user a feeling
              // that refresh is being done
              // otherwise, refresh is too fast and user cannot be sure
              // that it was done.
  }

  onRegionChangeComplete(region) {
    const delta = (this.state.orientation === PORTRAIT) ?
      region.latitudeDelta : region.longitudeDelta;
    const zoomed = (delta < 2) ? true : false;

    if (zoomed !== this.state.zoomed)
      this.setState({ region: region, zoomed: zoomed });
  }

  addListeners() {
    AppState.addEventListener('change', this.handleAppStateChange);
    Dimensions.addEventListener('change', this.handleDimensionsChange);
  }

  removeListeners() {
    AppState.removeEventListener('change', this.handleAppStateChange);
    Dimensions.removeEventListener('change', this.handleDimensionsChange);
  }

  handleAppStateChange(nextAppState) {
    if (this.state.appState.match(/inactive|background/) &&
      nextAppState === ACTIVE) {
      this.initData();
    }
    this.setState({ appState: nextAppState });
  }

  handleDimensionsChange(windowAndScreen) {
    const { height, width } = windowAndScreen.window;
    this.setDimensionsAndOrientation({ height, width });
  }

  setDimensionsAndOrientation(dimensions) {
    const orientation =  (dimensions.height > dimensions.width) ?
      PORTRAIT : LANDSCAPE;

    const resetRegion = (orientation === PORTRAIT) ?
      israelRegionPortrait : israelRegionLandscape;

    this.setState({ dim: dimensions, orientation: orientation,
      resetRegion: resetRegion, region: resetRegion });
  }

  regionsEqual(region1, region2) {
    return (
      (Math.abs(region1.latitude - region2.latitude) < 0.1) &&
      (Math.abs(region1.longitude - region2.longitude) < 0.1) &&
      (Math.abs(region1.latitudeDelta - region2.latitudeDelta) < 0.1) &&
      (Math.abs(region1.longitudeDelta - region2.longitudeDelta) < 0.1)
    );
  }
}

function mapStateToProps(state) {
  return {
    cities: state.cities,
    country: state.country,
    shores: state.shores,
    globalState: state.globalState
  };
}

export default connect(mapStateToProps,
  { fetchCities, fetchCountry, fetchShores, setGlobalState })(MapDisplay);
