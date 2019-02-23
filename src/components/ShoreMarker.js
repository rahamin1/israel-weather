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
import { getShoreImage, getShoreImageA7, findHebShoreName,
  getShoreCoordinates, getShoreForecast }
  from '../helpers/shoresForecastHelpers';

const centerOffset = { x: 0, y: 0 };
const anchor = { x: 0.125, y: 0.1 };

class ShoreMarker extends Component {

  constructor(props) {
    super(props);
    this.renderCallout = this.renderCallout.bind(this);
  }

  render() {
    const { shoreData, shoreDisplayMode, callBack, zoomed, partOfDay } =
      this.props;
    const fcst = getShoreForecast(shoreData, partOfDay);

    /* returned value:
      {
        title: getShoreNameHeb(shoreData) + " - " + "התחזית:",
        temp: "טמפרטורת פני הים: " + fcst[2].ElementValue[0] + "ºC",
        windMinMax: "מהירות הרוח: " +  typicalSpeed + ' קמ"ש' +
          " - " + maxSpeed + ' קמ"ש',
        windDirection: "כיוון הרוח: " + "???",    // need to set
        minHeight: minHeight,
        maxHeight: maxHeight,
        wavesHeight: "גובה הגלים: " + minHeight + '-' + maxHeight + ' ס"מ',
        seaStatus: "מצב הים:" + " " + getSeaStatus(seaStatusCode)
      }
    */

    const hebName = findHebShoreName(shoreData);
    const shoreCoordinates = getShoreCoordinates(shoreData);

    // https://github.com/react-community/react-native-maps/issues/1870
    // if (Platform.OS === 'android' && Platform.Version >= AndroidBugVersion) {
    if (Platform.Version >= 0) {
      const shoreImageName = getShoreImageA7(shoreData);
      return (
        <View>
          <MapView.Marker
            coordinate={shoreCoordinates}
            centerOffset={centerOffset}
            anchor={anchor}
            calloutAnchor={{ x: 0, y: 0 }}

            image={shoreImageName}

            ref={'marker1'}
            onPress={() => {}}
            onCalloutPress={() => {
              this.refs.marker1.hideCallout();
              callBack();
            }}>
            {this.renderCallout(fcst, hebName)}
          </MapView.Marker>
          <MapView.Marker
            coordinate={shoreCoordinates}
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
            {this.renderShoreDetails(shoreDisplayMode, hebName, fcst, zoomed)}
            {this.renderCallout(fcst, hebName)}
          </MapView.Marker>
        </View>
      );
    } else {
      const shoreImageName = getShoreImage(shoreData);
      return (
        <View>
          <MapView.Marker
            coordinate={shoreCoordinates}
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
              source={shoreImageName}
              style={{ width: 25, height: 25 }}
            />
            {this.renderCallout(fcst, hebName)}
          </MapView.Marker>
          <MapView.Marker
            coordinate={shoreCoordinates}
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
            {this.renderShoreDetails(shoreDisplayMode, hebName, fcst, zoomed)}
            {this.renderCallout(fcst, hebName)}
          </MapView.Marker>
        </View>
      );
    }
  }

  renderShoreDetails(shoreDisplayMode, hebName, fcst, zoomed) {
    const { maxHeight } = fcst;

    //const wavesText = "גובה הגלים: " +  maxHeight + ' ס"מ';
    const wavesText = maxHeight + ' ס"מ';

    return (
      <View>
      {(zoomed || shoreDisplayMode === 'ALL') &&
        <View>
          <Text style={GS.markerText}>
            {wavesText}
          </Text>
        </View>}
      {(!zoomed && shoreDisplayMode === 'ALL2') &&
        <View>
          <Text style={GS.markerText}>
            {wavesText}
          </Text>
        </View>}
      {(!zoomed && shoreDisplayMode === 'WAVES') &&
        <Text style={GS.markerText}>
          {wavesText}
      </Text>}
      </View>
    );
  }

  renderCallout(fcst, hebName) {
    return (
      <MapView.Callout style={{ flex: 1 }}
        tooltip={true}>
          <CardSection style={GS.cardSectionStyle2}>
            <View>
              <Text style={GS.textTitle1}>
                {hebName}{' '}{fcst.todayOrTomorrow}
              </Text>
              <Text style={GS.textBody}>
                {fcst.temp}
              </Text>
              <Text style={GS.textBody}>
                {/*fcst.windDirection*/}
              </Text>
              <Text style={GS.textBody}>
                {fcst.windMinMax}
              </Text>
              <Text style={GS.textBody}>
                {fcst.wavesMinMax}
              </Text>
              <Text style={GS.textBody}>
                {fcst.seaStatus}
              </Text>
            </View>
          </CardSection>
      </MapView.Callout>
    );
  }
}

ShoreMarker.propTypes = {
  shoreData: PropTypes.object.isRequired,
  shoreDisplayMode: PropTypes.string.isRequired,
  callBack: PropTypes.func.isRequired,
  zoomed: PropTypes.bool.isRequired,
  partOfDay: PropTypes.string.isRequired
};

export default ShoreMarker;
