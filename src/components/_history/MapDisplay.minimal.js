import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppState, Dimensions, View, Text, ActivityIndicator, Image } from 'react-native';
import { MapView } from 'expo';
import _ from 'lodash';
import { CardSection, MyButton } from './common';
import { fetchCountry } from '../actions';
import { PORTRAIT, LANDSCAPE, ACTIVE, INACTIVE } from '../helpers/constants';
import { getCountryInfo } from '../helpers/countryForecastHelpers';
import { israelRegionPortrait, israelRegionLandscape } from '../helpers/mapsHelpers';

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
    this.initRegion = this.initRegion.bind(this);
    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.handleDimensionsChange = this.handleDimensionsChange.bind(this);
    this.setDimensionsAndOrientation =
      this.setDimensionsAndOrientation.bind(this);
  }

  componentDidMount() {
    const initialDim = Dimensions.get('window');
    this.setDimensionsAndOrientation(initialDim);

    this.addListeners();
    this.props.fetchCountry();
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  onMapLayout() {
    this.setState({ isMapReady: true });
  }

  render() {

    const countryInfo = getCountryInfo(this.props.country);
    if (!countryInfo) { // loading of data is not done yet
      if (!this.props.country.error)
        return this.renderLoading();
      else
        return this.renderLoadingError();
    } else {

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
          </MapView>
          {this.renderButtons()}
        </View>
      );
    }
  }

  renderButtons() {
    return (
      <CardSection>
        <MyButton text="help" fontSize={14} padding={5}
          backgroundColor="#fff"
          onPress={() => {}}/>
        <MyButton text="refresh" fontSize={14} padding={5}
          backgroundColor="#fff"
          onPress={() => {}} />
        <MyButton text="about" fontSize={14} padding={5}
          backgroundColor="#fff"
          onPress={() => {}}/>
      </CardSection>
    );
  }

  renderLoading() {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator
          size={"large"}
          color={"#00f"}
          style = {{ padding: 10, flex: 3  }}/>
        <Text style={{ flex: 2, paddingLeft: 10, paddingRight: 10,
          fontSize: 28, fontWeight: 'bold', textAlign: 'center'  }}>
          Loading...
        </Text>
      </View>
    );
  }

  renderLoadingError() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{ flex: 1, justifyContent: 'center',
            paddingLeft: 10, paddingRight: 10 }}>
          <Text style=
            {{ fontSize: 28, fontWeight: 'bold', textAlign: 'center' }}>
            Error loading data. Please check the internet connection.
          </Text>
          <Text style=
            {{ fontSize: 28, fontWeight: 'bold', textAlign: 'center' }}>
            {' '}
          </Text>
          <Text style=
            {{ fontSize: 28, fontWeight: 'bold', textAlign: 'center' }}>
            If everything is OK, please try later.
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

  initData() {
    this.props.fetchCountry();
    this.setState({ region: this.state.resetRegion,
      zoomed: false, isMapReady: true });
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
    country: state.country
  };
}

export default connect(mapStateToProps,
  { fetchCountry })(MapDisplay);
