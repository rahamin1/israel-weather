// NOTE:
// Two markers are rendered and not one, since
// it is impossible to display the image and text positioned
// correctly in two cases:
// (1) in  different locales (one correct, another incorrect)
// (2) When using image props (and not <Image />)

import React, { Component } from 'react';
import { View, Text, Image, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { MapView } from 'expo';
import { AndroidBugVersion } from '../helpers/constants';
import { CardSection } from './common';
import GS from '../styles/GeneralStyles';
import { getWeatherImage, getWeatherImageA7, findHebCityName,
  getCityCoordinate, getCityForecast, getNextDaysForecast }
  from '../helpers/citiesForecastHelpers';

const centerOffset = { x: 0, y: 0 };
const anchor = { x: 0.125, y: 0.1 };

class CityMarker extends Component {

  constructor(props) {
    super(props);
    this.renderCallout = this.renderCallout.bind(this);
  }

  render() {
    const { cityData, forecastTitle, cityDisplayMode, nextDays, callBack, zoomed } =
      this.props;
    const fcst = getCityForecast(cityData);

    /* returned value:
      { forecast title: getForecastDescription(fcst[4].ElementValue[0]) },
      { max: "טמפ. המקסימום ביום: " + fcst[1].ElementValue[0] },
      { min: "טמפ. המינימום בלילה:" + fcst[0].ElementValue[0] },
      { humidity: "לחות יחסית בצהריים:" + fcst[2].ElementValue[0] },
      { windTypical: "מהירות הרוח השכיחה" },
      { windMax: "מהירות הרוח המירבית" }
    ];
    */

    const hebName = findHebCityName(cityData);
    const nextDaysForecast = getNextDaysForecast(cityData, nextDays);
    const cityCoordinates = getCityCoordinate(cityData);

    // https://github.com/react-community/react-native-maps/issues/1870
    // if (Platform.OS === 'android' && Platform.Version >= AndroidBugVersion) {
    if (Platform.Version >= 0) {
      const weatherImageName = getWeatherImageA7(cityData);
      return (
        <View>
          <MapView.Marker
            coordinate={cityCoordinates}
            centerOffset={centerOffset}
            anchor={anchor}
            calloutAnchor={{ x: 0, y: 0 }}

            image={weatherImageName}

            ref={'marker1'}
            onPress={() => {}}
            onCalloutPress={() => {
              this.refs.marker1.hideCallout();
              callBack();
            }}>
            {this.renderCallout(forecastTitle, hebName, fcst, nextDaysForecast)}
          </MapView.Marker>
          <MapView.Marker
            coordinate={cityCoordinates}
            centerOffset={centerOffset}
            anchor={anchor}
            calloutAnchor={{ x: 0, y: 0 }}
            ref={'marker2'}
            onPress={() => {}}
            onCalloutPress={() => {
              this.refs.marker2.hideCallout();
              callBack();
            }}>
            <Text>{" "}</Text>
            {this.renderCityDetails(cityDisplayMode, hebName, fcst, zoomed)}
            {this.renderCallout(forecastTitle, hebName, fcst, nextDaysForecast)}
          </MapView.Marker>
        </View>
      );
    } else {
      const weatherImageName = getWeatherImage(cityData);
      return (
        <View>
          <MapView.Marker
            coordinate={cityCoordinates}
            centerOffset={centerOffset}
            anchor={anchor}
            calloutAnchor={{ x: 0, y: 0 }}
            ref={'marker1'}
            onPress={() => {}}
            onCalloutPress={() => {
              this.refs.marker1.hideCallout();
              callBack();
            }}>
            <Image
              source={weatherImageName}
              style={{ width: 25, height: 25 }}
            />
            {this.renderCallout(forecastTitle, hebName, fcst, nextDaysForecast)}
          </MapView.Marker>
          <MapView.Marker
            coordinate={cityCoordinates}
            centerOffset={centerOffset}
            anchor={anchor}
            calloutAnchor={{ x: 0, y: 0 }}
            ref={'marker2'}
            onPress={() => {}}
            onCalloutPress={() => {
              this.refs.marker2.hideCallout();
              callBack();
            }}>
            <Text>{" "}</Text>
            {this.renderCityDetails(cityDisplayMode, hebName, fcst, zoomed)}
            {this.renderCallout(forecastTitle, hebName, fcst, nextDaysForecast)}
          </MapView.Marker>
        </View>
      );
    }
  }

  renderCityDetails(cityDisplayMode, hebName, fcst, zoomed) {
    return (
      <View>
      {(zoomed || cityDisplayMode === 'ALL') &&
        <View>
          <Text style={GS.markerText}>
            {hebName}{' '}
            {fcst.tempMax}{'-'}
            {fcst.tempMin}
          </Text>
        </View>}
      {(!zoomed && cityDisplayMode === 'ALL2') &&
        <View>
          <Text style={GS.markerText}>
            {hebName}{' '}
          </Text>
          <Text style={GS.markerText}>
            {fcst.tempMax}{'-'}
            {fcst.tempMin}
          </Text>
        </View>}
      {(!zoomed && cityDisplayMode === 'TEMP') &&
        <Text style={GS.markerText}>
        {fcst.tempMax}{'-'}
        {fcst.tempMin}
      </Text>}
      </View>
    );
  }

  renderCallout(forecastTitle, hebName, fcst, nextDaysForecast) {
    return (
      <MapView.Callout style={{ flex: 1 }}
        tooltip={true}>
          <CardSection style={GS.cardSectionStyle}>
            <View>
              <Text style={GS.textTitle1}>
                {forecastTitle}
                {' '}
                ב{hebName}
              </Text>
              <Text style={GS.textTitle2}>
                {fcst.forecast}
              </Text>
              <Text style={GS.textBody}>
                {fcst.minmax}
              </Text>
              <Text style={GS.textBody}>
                {fcst.humidity}
              </Text>
              <Text style={GS.textBody}>
                {fcst.windMixMax}
              </Text>
              <Text style={GS.textBody}>
                {/*fcst.windDirection*/}
              </Text>
              <Text style={GS.textTitle2}>
                {"התחזית לימים הקרובים:"}
              </Text>
              <Text style={GS.textBody}>
                {nextDaysForecast[0]}
              </Text>
              <Text style={GS.textBody}>
                {nextDaysForecast[1]}
              </Text>
              <Text style={GS.textBody}>
                {nextDaysForecast[2]}
              </Text>
            </View>
          </CardSection>
      </MapView.Callout>
    );
  }
}

CityMarker.propTypes = {
  cityData: PropTypes.object.isRequired,
  forecastTitle: PropTypes.string.isRequired,
  cityDisplayMode: PropTypes.string.isRequired,
  nextDays: PropTypes.array.isRequired,
  callBack: PropTypes.func.isRequired,
  zoomed: PropTypes.bool.isRequired
};

export default CityMarker;
