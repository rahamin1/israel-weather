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
import { CardSection } from './common';
import { AndroidBugVersion } from '../helpers/constants';
import GS from '../styles/GeneralStyles';
import { getCountryForecast, getCountryForecastNextDays }
  from '../helpers/countryForecastHelpers';
import { israelFlag, israelFlag7,
      calendarImage, calendarImage7 } from '../helpers/weatherFilesAndCodes';

const centerOffsetToday = { x: 0, y: 0 };
const anchorToday  = { x: 0.125, y: 0.1 };
const calloutAnchorToday = { x: 0, y: 0 };
const coordToday  = { latitude: 32.2, longitude: 33.75 };

const centerOffsetNextDays = { x: 0, y: 0 };
const anchorNextDays = { x: 0.125, y: 0.1 };
const calloutAnchorNextDays = { x: 0, y: 0 };
const coordNextDays = { latitude: 33.0, longitude: 34.00 };

let centerOffset = { };
let anchor = { };
let calloutAnchor = { };
let coord = { };

let image, image7;

class CountryMarker extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { data, forecastTitle, nextDays, nextDaysArray } = this.props;
    const nextDaysForecast = getCountryForecastNextDays(data, nextDaysArray);
    const fcst = getCountryForecast(data);
    this.initParameters(nextDays);

    let weatherHeb;
    if (!fcst) {
      weatherHeb = "בעייה בשליפת הנתונים. אנחנו עובדים על זה...";
    } else {
      weatherHeb = fcst.weatherHeb;
    }

    /* fcst:
      warnEng: "Warning in English: " + fcst[0].ElementValue[0],
      warnHeb: "אזהרה בעברית: " + fcst[1].ElementValue[0],
      weatherEng: "Weather in English: " + fcst[2].ElementValue[0],
      weatherHeb: "מזג האוויר: " + fcst[3].ElementValue[0]
    */

    // https://github.com/react-community/react-native-maps/issues/1870
    // if (Platform.OS === 'android' && Platform.Version >= AndroidBugVersion) {
    if (Platform.Version >= 0) {
      return (
        <View style={{ justifyContent: "center" }}>

          <MapView.Marker
            coordinate={coord}
            centerOffset={centerOffset}
            anchor={anchor}
            calloutAnchor={calloutAnchor}
            image={image7}

            ref={_marker => {
              this.marker1 = _marker;
            }}
            onCalloutPress={() => {
              this.marker1.hideCallout();
              this.props.callBack();
            }}>
            {!nextDays && this.renderCallout(forecastTitle, weatherHeb)}
            {nextDays && this.renderNextDaysCallout(nextDaysForecast)}
          </MapView.Marker>

          <MapView.Marker
            coordinate={coord}
            centerOffset={centerOffset}
            anchor={anchor}
            calloutAnchor={calloutAnchor}

            ref={_marker => {
              this.marker2 = _marker;
            }}
            onCalloutPress={() => {
              this.marker2.hideCallout();
              this.props.callBack();
            }}>

            <View style = {{ height: 50 }} />
            {!nextDays && this.renderTitle()}
            {!nextDays && this.renderCallout(forecastTitle, weatherHeb)}

            {nextDays && this.renderNextDaysTitle()}
            {nextDays && this.renderNextDaysCallout(nextDaysForecast)}
          </MapView.Marker>
        </View>
      );
    } else {
      return (
        <View>
          <MapView.Marker
            coordinate={coord}
            centerOffset={centerOffset}
            anchor={anchor}
            calloutAnchor={calloutAnchor}
            ref={_marker => {
              this.marker3 = _marker;
            }}
            onCalloutPress={() => {
              this.marker3.hideCallout();
              this.props.callBack();
            }}>
            <Image
              source={image}
              style={{ width: 50, height: 50 }}
            />

            {!nextDays && this.renderCallout(forecastTitle, weatherHeb)}
            {nextDays && this.renderNextDaysCallout(nextDaysForecast)}

          </MapView.Marker>

          <MapView.Marker
            coordinate={coord}
            centerOffset={centerOffset}
            anchor={anchor}
            calloutAnchor={calloutAnchor}
            ref={_marker => {
              this.marker4 = _marker;
            }}
            onCalloutPress={() => {
              this.marker4.hideCallout();
              this.props.callBack();
            }}>

            <View style = {{ height: 50 }} />
            {!nextDays && this.renderTitle()}
            {!nextDays && this.renderCallout(forecastTitle, weatherHeb)}

            {nextDays && this.renderNextDaysTitle()}
            {nextDays && this.renderNextDaysCallout(nextDaysForecast)}

          </MapView.Marker>
        </View>
      );
    }
  }

  renderTitle() {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={GS.markerText2}>
          תחזית
        </Text>
        <Text style={GS.markerText2}>
          ארצית
        </Text>
        <Text style={GS.markerText2}>
          להיום
        </Text>
      </View>
    );
  }

  renderCallout(forecastTitle, weatherHeb) {
    return (
      <MapView.Callout style={{ flex: 1 }}
        tooltip={true} onPress={() => {}}>
          <CardSection style={GS.cardSectionStyle}>
            <View>
              <Text style={GS.textTitle1}>
                {forecastTitle}
              </Text>
              <Text style={GS.textBody}>
                {weatherHeb}
              </Text>
            </View>
          </CardSection>
      </MapView.Callout>
    );
  }

  renderNextDaysTitle() {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={GS.markerText2}>
          תחזית
        </Text>
        <Text style={GS.markerText2}>
          לימים
        </Text>
        <Text style={GS.markerText2}>
           הקרובים
        </Text>
      </View>
    );
  }

  renderNextDaysCallout(nextDaysForecast) {
    return (
      <MapView.Callout style={{ flex: 1 }}
        tooltip={true} onPress={() => {}}>
          <CardSection style={GS.cardSectionStyle}>
            <View>
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

  // set parameters differentiating between today's country forecast
  // and next days country forecast
  initParameters(nextDays) {
    if (!nextDays) {
      centerOffset = centerOffsetToday;
      anchor = anchorToday;
      calloutAnchor = calloutAnchorToday;
      coord = coordToday;
      image = israelFlag;
      image7 = israelFlag7;
    } else {
      centerOffset = centerOffsetNextDays;
      anchor = anchorNextDays;
      calloutAnchor = calloutAnchorNextDays;
      coord = coordNextDays;
      image = calendarImage;
      image7 = calendarImage7;
    }
  }
}

CountryMarker.propTypes = {
  data: PropTypes.object.isRequired,
  forecastTitle: PropTypes.string.isRequired,
  nextDays: PropTypes.bool.isRequired,  // true if displaying next days
  nextDaysArray: PropTypes.array.isRequired,
  callBack: PropTypes.func.isRequired
};

export default CountryMarker;
