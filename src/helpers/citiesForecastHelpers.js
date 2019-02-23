// structure of forecastData described at the end of this file
import { weatherCodes, weatherCodesA7, eng2Heb } from './weatherFilesAndCodes';

export const getCityCode = (cityData) => {
  const fcst = cityData.LocationData[0].TimeUnitData[0].Element;
  return fcst[4].ElementValue[0];
};

export const getWeatherImage = (cityData) => {
  const code = getCityCode(cityData);
  return weatherCodes[code].imageName;
};

export const getWeatherImageA7 = (cityData) => {
  const code = getCityCode(cityData);
  return weatherCodesA7[code].imageName;
};

export const getCitiesForecastTime = (forecastData) => {
  if (!forecastDataExists(forecastData.citiesData))
    return null;
  else
    return forecastData.Identification[0].IssueDateTime[0];
};

export const getCitiesArray = (forecastData) => {
  if (!forecastDataExists(forecastData.citiesData))
    return null;
  const locations = forecastData.citiesData.Location;
  return (locations && locations.length !== 0) ? locations : null;
};

export const forecastDataExists = (citiesData) => {
  return (citiesData && Object.keys(citiesData).length !== 0);
};

export const getCityId = (cityData) => {
    return cityData.LocationMetaData[0].LocationId[0];
};

export const getCityNameEng = (cityData) => {
  return cityData.LocationMetaData[0].LocationNameEng[0];
};

export const findHebCityName = (cityData) => {
  return eng2Heb[getCityNameEng(cityData)].heb;
};

export const cityDisplayedMode = (cityData) => {
  return eng2Heb[getCityNameEng(cityData)].displayMode;
};

export const getCityNameHeb = (cityData) => {
  return cityData.LocationMetaData[0].LocationNameHeb[0];
};

export const getCityCoordinate = (cityData) => {
  return { latitude: Number(cityData.LocationMetaData[0].DisplayLat[0]),
    longitude: Number(cityData.LocationMetaData[0].DisplayLon[0]) };
};

export const getCityLat = (cityData) => {
    return cityData.LocationMetaData[0].DisplayLat[0];
};

export const getCityLong = (cityData) => {
    return cityData.LocationMetaData[0].DisplayLon[0];
};

// set a string that will appear in the forecast header as following:
//  this.props.partOfDay === "Morning" or "Evening"
//  If "Morning" -  התחזית להיום והלילה
// if "Evening" - התחזית להלילה ומחר
// neither of the two: התחזית
export const getCitiesForecastTitle = (partOfDay) => {
  switch (partOfDay) {
    case "Morning":
      return ("היום והלילה ");
    case "Evening":
      return ("הלילה ומחר");
    default:
      console.log("In citiesForecastHelpers/getCitiesForecastTitle. ",
      "Unexpected partOfDay value (expected Morning or Evening): ", partOfDay);
      return ("התחזית");
  }
};

export const getForecastDescription = (code) => {
    return weatherCodes[code].text;
};

/* LocationData[0].TimeUnitData[0].Element: (see below)
[0]: { ElementName[0] - "Maximum relative humidity",
      ElementValue[0] - "15" }
[1]: { ElementName[0] - "Maximum temperature",
      ElementValue[0] - "15" }
[2]: { ElementName[0] - "Minimum relative humidity",
       ElementValue[0] - "15" }
[3]: { ElementName[0] - "Minimum temperature",
      ElementValue[0] - "15" }
[4]: { ElementName[0] - "Weather code",
      ElementValue[0] - "1310" }
[5]: { ElementName[0] - "Wind direction and speed",
        ElementValue[0] - "135-225/10-20" }
*/
export const getCityForecast = (cityData) => {
  const fcst = cityData.LocationData[0].TimeUnitData[0].Element;

  // extract wind values
  //   which are in the following format:
  //   "135-225/10-20" (135-225: wind direction in degrees
  //                    10-20: typical speed / max speed)
  const match = fcst[5].ElementValue[0].match(/^(\d{3})-(\d{3})\/(\d{2})-(\d{2})$/);

  //match = "135-225/10-20".match(/^(\d{3})-(\d{3})\/(\d{2})-(\d{2})$/);
  let typicalSpeed = 0;
  let maxSpeed = 0;
  let direction = 0;
  if (match && match.length === 5) {
    typicalSpeed = match[3];
    maxSpeed = match[4];

    // Need to handle direction
  }

  // if typical speed and max speed are equal, no need to display both
  const windMinMax = (typicalSpeed === maxSpeed) ?
    "מהירות הרוח: " +  typicalSpeed + ' קמ"ש' :
    "מהירות הרוח: " +  typicalSpeed + " - " + maxSpeed + ' קמ"ש';

    // "360-045/10-20"
    // typical wind speed - 10
    // max wind speed - 20
    // 360-045 degrees - north to north east
    //
    // 270-315/10-25
    // typical wind speed - 10
    // max wind speed - 25
    // 270-315 degrees - west to north west
    //

  return {
    forecast: getForecastDescription(fcst[4].ElementValue[0]),
    tempMax: fcst[1].ElementValue[0],
    tempMin: fcst[3].ElementValue[0],
    minmax: "הטמפרטורות: " + fcst[1].ElementValue[0] + "ºC" +
      "-" + fcst[3].ElementValue[0] + "ºC",
    max: "טמפ. המקסימום ביום: " + fcst[1].ElementValue[0] + "ºC",
    min: "טמפ. המינימום בלילה: " + fcst[3].ElementValue[0] + "\u00B0C",
    humidity: "לחות יחסית בצהריים: " + fcst[2].ElementValue[0] + "%",
    windMixMax: windMinMax,
    windTypical: "מהירות הרוח בדרך כלל: " + typicalSpeed + ' קמ"ש',
    windMax: "מהירות הרוח המירבית: " + maxSpeed + ' קמ"ש',
    windDirection: "כיוון הרוח: " + "???"    // need to set
  };
};

export const getNextDaysForecast = (cityData, nextDays) => {

  let nextDaysForecast = [];
  const timeUnitData = cityData.LocationData[0].TimeUnitData;

  /*
  timeUnitData[1/2/3].Date[0] is the date
  timeUnitData[1/2/3].Element is an array of 3 elements:
  [0]:
       { ElementName[0] - "Maximum temperature",
         ElementValue[0] - "15" }
  [1]:
       { ElementName[0] - "Minimum temperature",
         ElementValue[0] - "15" }
  [2]:
       { ElementName[0] - "Weather code",
         ElementValue[0] - "1310" }
  */

  let elements;
  for (var i = 1; i < 4; i++) {
    elements = timeUnitData[i].Element;

    nextDaysForecast[i - 1] = `${nextDays[i - 1]}: ` +
      `${elements[0].ElementValue[0]}-` +
      `${elements[1].ElementValue[0]}; ` +
      `${weatherCodes[elements[2].ElementValue[0]].text}`;
  }
  return nextDaysForecast;
};

export const printCitiesData = (forecastData) => {
  console.log("");
  console.log("***********************************************");
  console.log("**** Cities Forecast Data ****");
  console.log("");
  if (!forecastData || Object.keys(forecastData).length === 0) {
    console.log("**** No Data ****");
    console.log("***********************************************");
    return;
  }

  console.log("time of forecast: ", forecastData.Identification[0].IssueDateTime[0]);

  const locations = forecastData.Location;
  for (let i = 0; i < locations.length; i++) {
    printLocationData(locations[i]);
  }
  console.log("***********************************************");
};

const printLocationData = (location) => {
  console.log("-- Start of Location Info --");
  const meta = location.LocationMetaData[0];
  console.log(`Location details:
    id: ${meta.LocationId[0]},
    nameEng: ${meta.LocationNameEng[0]},
    nameHeb : ${meta.LocationNameHeb[0]},
    lat: ${meta.DisplayLat[0]},
    long: ${meta.DisplayLon[0]}`);

  const timeUnitData = location.LocationData[0].TimeUnitData;

  for (var i = 0; i < timeUnitData.length; i++) {
    printDailyLocationForecast(timeUnitData[i]);
  }
};

const printDailyLocationForecast = (timeUnitData) => {

  // timeUnitData.Date[0] is the date
  // timeUnitData.Element is an array of 6 items:
  // [0]:
  //    { ElementName[0] - "Maximum relative humidity",
  //      ElementValue[0] - "15" }

  console.log(`-- Start of Location Forecast Info for date ${timeUnitData.Date[0]}--`);
  const elements = timeUnitData.Element;
  for (let i = 0; i < elements.length; i++) {
    console.log(`- ${elements[i].ElementName[0]}: ${elements[i].ElementValue[0]}`);
  }
};

export const printLocationNextDays = (cityData) => {

  const timeUnitData = cityData.LocationData[0].TimeUnitData;

  /*
  timeUnitData[1/2/3].Date[0] is the date
  timeUnitData[1/2/3].Element is an array of 3 elements:
  [0]:
       { ElementName[0] - "Maximum temperature",
         ElementValue[0] - "15" }
  [1]:
       { ElementName[0] - "Minimum temperature",
         ElementValue[0] - "15" }
  [2]:
       { ElementName[0] - "Weather code",
         ElementValue[0] - "1310" }
zzz */

  console.log("--- Next days forecast: ");
  let elements;
  for (var i = 1; i < 4; i++) {
    console.log("day: ", timeUnitData[i].Date[0]);
    elements = timeUnitData[i].Element;
    console.log("Min: ", elements[1].ElementValue[0]);
    console.log("Max: ", elements[0].ElementValue[0]);
    console.log("code: ", weatherCodes[elements[2].ElementValue[0]].text);
  }
};

/* citiesData:
  {
    Identification[0].IssueDateTime[0]),

    // Location is an array of 15 objects. each object has:
    //    LocationData[0]
    //    LocationMetaData[0]
    Location: [     // array[15]
      {
        LocationMetaData[0] {
          LocationId[0], see codes below
          LocationNameEng[0],
          LocationNameHeb[0],
          DisplayLat[0],
          DisplayLon[0]
        },

        LocationNameEng/LocationId:
        - Elat 520, Ashdod 114, Beer Sheva 513,
          Bet Shean 203, Haifa 115, Tiberias 202, Jerusalem 510,
          Lod 204, Mizpe Ramon 106, Nazareth 207, En Gedi 105,
          Afula 209, Zefat 507, Qazrin 201, Tel Aviv - Yafo 402.

        // LocationData[0] has one key: timeUnitData
        LocationData[0].timeUnitData: [ // an array of 4 objects

          Date[0];  // timeUnitData[0].Date[0] is the date
          Element [     // array of 6 objects for timeUnitData[0]
                        // array of 3 objects for timeUnitData[0]

            each Element item:  {
                ElementName[0] - forecastParam,
                ElementValue[0] - "15"
              }

          // timeUnitData[0].Element is an array of 6 items:
          /* [0]:
              { ElementName[0] - "Maximum relative humidity",
                ElementValue[0] - "15" }
            [1]:
                { ElementName[0] - "Maximum temperaturey",
                  ElementValue[0] - "15" }
            [2]:
                { ElementName[0] - "Minimum relative humidity",
                  ElementValue[0] - "15" }
            [3]:
                { ElementName[0] - "Minimum temperature",
                  ElementValue[0] - "15" }
            [4]:
                { ElementName[0] - "Weather code",
                  ElementValue[0] - "1310" }

                  1310: חם מאוד
                  1460: שרבי
                  1220: מעונן חלקית
            [5]:
                { ElementName[0] - "Wind direction and speed",
                  ElementValue[0] - "135-225/10-20" }

           timeUnitData[1/2/3].Date[0] is the date
           timeUnitData[1/2/3].Element is an array of 3 elements:
           [0]:
                { ElementName[0] - "Maximum temperature",
                  ElementValue[0] - "15" }
           [1]:
                { ElementName[0] - "Minimum temperature",
                  ElementValue[0] - "15" }
           [2]:
                { ElementName[0] - "Weather code",
                  ElementValue[0] - "1310" }

  */
