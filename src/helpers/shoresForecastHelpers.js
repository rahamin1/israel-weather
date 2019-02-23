// structure of forecastData described at the end of this file
import { shoreCodes, shoreCodesA7, shoresTable } from './shoresFilesAndCodes';

export const getShoreId = (shoreData) => {
    return shoreData.LocationMetaData[0].LocationId[0];
};

export const getShoreCode = (shoreData) => {
  const result = getSeaStatusAndWaves(shoreData);
  return result.seaStatusCode;
};

export const getShoreImage = (shoreData) => {
  const code = getShoreCode(shoreData);
  return shoreCodes[code].imageName;
};

export const getShoreImageA7 = (shoreData) => {
  const code = getShoreCode(shoreData);
  return shoreCodesA7[code].imageName;
};

export const shoresDataExists = (shoresData) => {
  return (shoresData && Object.keys(shoresData).length !== 0);
};

export const getShoresArray = (forecastData) => {

  if (!shoresDataExists(forecastData.shoresData))
    return null;
  const locations = forecastData.shoresData.Location;
  return (locations && locations.length !== 0) ? locations : null;
};

export const getShoreNameEng = (shoreData) => {
  return shoreData.LocationMetaData[0].LocationNameEng[0];
};

export const findHebShoreName = (shoreData) => {
  return shoresTable[getShoreNameEng(shoreData)].heb;
};

export const shoreDisplayedMode = (shoreData) => {
  return shoresTable[getShoreNameEng(shoreData)].displayMode;
};

export const getShoreNameHeb = (shoreData) => {
  return shoreData.LocationMetaData[0].LocationNameHeb[0];
};

export const getShoreCoordinates = (shoreData) => {
  return shoresTable[getShoreNameEng(shoreData)].coord;
};

export const getSeaStatus = (seaStatusCode) => {
  if (seaStatusCode in shoreCodes)
    return shoreCodes[seaStatusCode].text;
  else
    return "אין נתונים";
};

// set a string that will appear in the forecast header as following:
//  this.props.partOfDay === "Morning" or "Evening"
//  If "Morning" -  התחזית להיום והלילה
// if "Evening" - התחזית להלילה ומחר
// neither of the two: התחזית
export const getShoresForecastTitle = (partOfDay) => {
  switch (partOfDay) {
    case "Morning":
      return ("היום והלילה ");
    case "Evening":
      return ("הלילה ומחר");
    default:
      console.log("In shoresForecastHelpers/getShoresForecastTitle. ",
      "Unexpected partOfDay value (expected Morning or Evening): ", partOfDay);
      return ("התחזית");
  }
};

export const getSeaStatusAndWaves = (shoreData) => {
  const fcst = shoreData.LocationData[0].TimeUnitData[0].Element;

  // "50   / 50-90"
  let matchResults =
    fcst[0].ElementValue[0].match(/^(\d{2,3})\ * \/\ (\d{2,3})-(\d{2,3})$/);

  let seaStatusCode = 0;
  let minHeight = 0;
  let maxHeight = 0;
  if (matchResults && matchResults.length === 4) {
    seaStatusCode = matchResults[1];
    minHeight = matchResults[2];
    maxHeight = matchResults[3];
  }

  return {
    seaStatusCode: seaStatusCode,
    minHeight: minHeight,
    maxHeight: maxHeight
  };
};

export const getShoreForecast = (shoreData, partOfDay) => {

  /*
    if evening, then
      TimeUnitData[0] is night's fcst:
        Element[0] - sea status and waves
        Element[1] - Wind direction & speed
        Element[2] - temperature
      TimeUnitData[1] is tomorrow's day fcst:
        Element[0] - sea status and waves
        Element[1] - temperature
        Element[2] -  Wind direction & speed
    if morning
      TimeUnitData[0] is tdoay's day fcst as [1] above
      TimeUnitData[1] is tonight's fcst as [0] above
  */

  /* LocationData[0].TimeUnitData[0-1]
    DateTimeFrom[0]- 2018-06-27 08:00 (or 20:00)
    DateTimeFrom[1]- 2018-06-27 20:00 (or 08:00)
  */

  const fcst = (partOfDay === "Morning") ?
    shoreData.LocationData[0].TimeUnitData[0].Element :
    shoreData.LocationData[0].TimeUnitData[1].Element;

  /*
  const fcst = (TimeUnitData[0].length === 3) ?
    TimeUnitData[0].Element : TimeUnitData[1].Element;
  */

  // extract wind values
  //   which are in the following format:
  //   "135-225/10-20" (135-225: wind direction in degrees
  //                    10-20: typical speed / max speed)
  let matchResults = fcst[2].ElementValue[0].match(/^(\d{3})-(\d{3})\/(\d{2})-(\d{2})$/);

  //match = "135-225/10-20".match(/^(\d{3})-(\d{3})\/(\d{2})-(\d{2})$/);
  let typicalSpeed = 0;
  let maxSpeed = 0;

  //let direction = 0;
  if (matchResults && matchResults.length === 5) {
    typicalSpeed = matchResults[3];
    maxSpeed = matchResults[4];

    // Need to handle direction
  }

  // if typical speed and max speed are equal, no need to display both
  const windMinMax = (typicalSpeed === maxSpeed) ?
    "מהירות הרוח: " +  typicalSpeed + ' קמ"ש' :
    "מהירות הרוח: " +  typicalSpeed + " - " + maxSpeed + ' קמ"ש';

  const result = getSeaStatusAndWaves(shoreData);
  const { seaStatusCode, minHeight, maxHeight } = result;

  const wavesMinMax = (minHeight === maxHeight) ?
    "גובה הגלים: " +  minHeight + ' ס"מ' :
    "גובה הגלים: " +  minHeight + " - " + maxHeight + ' ס"מ';

  const todayOrTomorrow = (partOfDay === "Morning") ?
    "היום" :
    "מחר";

  return {
    title: getShoreNameHeb(shoreData) + " - " + "התחזית:",
    todayOrTomorrow: todayOrTomorrow,
    temp: "טמפרטורת פני הים: " + fcst[1].ElementValue[0] + "ºC",
    windMinMax: windMinMax,
    windDirection: "כיוון הרוח: " + "???",    // need to set
    minHeight: minHeight,
    maxHeight: maxHeight,
    wavesMinMax: wavesMinMax,
    seaStatus: "מצב הים:" + " " + getSeaStatus(seaStatusCode)
  };
};
