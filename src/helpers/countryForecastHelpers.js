
// structure of forecastData is described at the end of this file

export const getForecastTime = (forecastData) => {
  if (!forecastDataExists(forecastData.countryData))
    return null;
  else
    return forecastData.Identification[0].IssueDateTime[0];
};

export const getCountryInfo = (forecastData) => {
  if (!forecastDataExists(forecastData.countryData))
    return null;
  const location = forecastData.countryData.Location[0];
  return (location && location.length !== 0) ? location : null;
};

export const forecastDataExists = (countryData) => {
  return (countryData && Object.keys(countryData).length !== 0);
};

// set a string that will appear in the forecast header as following:
//  this.props.partOfDay === "Morning" or "Evening"
//  If "Morning" -  התחזית להיום והלילה
// if "Evening" - התחזית להלילה ומחר
// neither of the two: התחזית
export const getCountryForecastTitle = (partOfDay) => {
  switch (partOfDay) {
    case "Morning":
      return ("התחזית: היום והלילה ");
    case "Evening":
      return ("התחזית: הלילה ומחר ");
    default:
      console.log("In countryForecastHelpers/getForecastTitle. ",
      "Unexpected partOfDay value (expected Morning or Evening): ", partOfDay);
      return ("התחזית");
  }
};

/* LocationData[0] has one key: timeUnitData
   LocationData[0].timeUnitData: [ // an array of 4 objects

  Date[0];  // timeUnitData[0].Date[0] is the date
  Element [     // array of 4 objects for timeUnitData[0]
                // array of 2 objects for timeUnitData[1-3]

    each Element item:  {
        ElementName[0] - forecastParam,
        ElementValue[0] - "15"
      }

  /* LocationData[0].TimeUnitData[0].Element: (see below)
    [0]: { ElementName[0] - ""Warning in English"",
           ElementValue[0] - "text" }
    [1]: { ElementName[0] - "Warning in Hebrew",
           ElementValue[0] - "text" }
    [2]: { ElementName[0] - "Weather in English",
          ElementValue[0] - "text" }
    [3]: { ElementName[0] - "Weather in Hebrew",
          ElementValue[0] - "text" }
  */

export const getCountryForecast = (countryData) => {
  if (!forecastDataExists(countryData))
    return null;
  const locationData = countryData.LocationData;
  if (!locationData || locationData.length === 0)
    return null;
  const fcst = locationData[0].TimeUnitData[0].Element;

  return {
    warnEng: fcst[0].ElementValue[0],
    warnHeb: fcst[1].ElementValue[0],
    weatherEng: fcst[2].ElementValue[0],
    weatherHeb: fcst[3].ElementValue[0]
  };
};

export const getCountryForecastNextDays = (countryData, nextDays) => {
  if (!forecastDataExists(countryData))
    return null;
  const locationData = countryData.LocationData;
  if (!locationData || locationData.length === 0)
    return null;
  const fcst = locationData[0].TimeUnitData;

  let nextDaysForecast = [];
  for (var i = 0; i <= 2; i++) {
    nextDaysForecast[i] =
    `${nextDays[i]}: ${fcst[i + 1].Element[1].ElementValue[0]}`;
  }
  return nextDaysForecast;
};

/* countryData:
  {
    Identification[0].IssueDateTime[0]),

    // Location is an array of 1 object that has:
    //    LocationData[0]
    //    LocationMetaData[0]
    Location: [     // array[0]
      {
        LocationMetaData[0] {
          LocationId[0],  // 230
          LocationNameEng[0], // Israel
          LocationNameHeb[0],
        },

        // LocationData[0] has one key: timeUnitData
        LocationData[0].timeUnitData: [ // an array of 4 objects

          Date[0];  // timeUnitData[0].Date[0] is the date
          Element [     // array of 4 objects for timeUnitData[0]
                        // array of 2 objects for timeUnitData[1-3]

            each Element item:  {
                ElementName[0] - forecastParam,
                ElementValue[0] - "15"
              }

          // timeUnitData[0].Element is an array of 4 items:
          /* [0]:
              { ElementName[0] - ""Warning in English"",
                ElementValue[0] - "text" }
            [1]:
                { ElementName[0] - "Warning in Hebrew",
                  ElementValue[0] - "text" }
            [2]:
                { ElementName[0] - "Weather in English",
                  ElementValue[0] - "text" }
            [3]:
                { ElementName[0] - "Weather in Hebrew",
                  ElementValue[0] - "text" }

           timeUnitData[1/2/3].Date[0] is the date
           timeUnitData[1/2/3].Element is an array of 2 elements:
           [0]:
               { ElementName[0] - "Weather in English",
                 ElementValue[0] - "text" }
           [1]:
               { ElementName[0] - "Weather in Hebrew",
                 ElementValue[0] - "text" }

  */
