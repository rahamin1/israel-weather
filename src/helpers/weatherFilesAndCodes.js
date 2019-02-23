export const countryXML =
 'https://ims.data.gov.il/sites/default/files/isr_country.xml';
export const citiesXML =
  'https://ims.data.gov.il/sites/default/files/isr_cities.xml';
export const shoresXML =
  'https://ims.data.gov.il/sites/default/files/isr_sea.xml';

export const israelFlag = require("../images/weather/israel-flag.png");
export const israelFlag7 = require("../images/weather-a7/israel-flag-180.png");
export const calendarImage = require("../images/weather/calendar.png");
export const calendarImage7 = require("../images/weather-a7/calendar-180.png");

// displayMode for city:
//              ALL - show city icon + name + temp in one line
//              ALL2 - show city icon + name + temp in two lines
//              TEMP - show city icon + temp only
//              ICON - show city icon only
//              NONE - no info
export const eng2Heb = {
  "Elat": { code: 520, displayMode: 'ALL', heb: "אילת" },
  "Ashdod": { code: 114, displayMode: 'TEMP', heb: "אשדוד" },
  "Beer Sheva": { code: 513, displayMode: 'ALL', heb: "באר שבע" },
  "Bet Shean": { code: 203, displayMode: 'ALL', heb: "בית שאן" },
  "Haifa": { code: 115, displayMode: 'ALL2', heb: "חיפה" },
  "Tiberias": { code: 202, displayMode: 'ALL2', heb: "טבריה" },
  "Jerusalem": { code: 510, displayMode: 'ALL', heb: "ירושלים" },
  "Lod": { code: 204, displayMode: 'NONE', heb: "לוד" },
  "Mizpe Ramon": { code: 106, displayMode: 'ALL', heb: "מצפה רמון" },
  "Nazareth": { code: 207, displayMode: 'ICON', heb: "נצרת" },
  "En Gedi": { code: 105, displayMode: 'ALL', heb: "עין גדי" },
  "Afula": { code: 209, displayMode: 'ICON', heb: "עפולה" },
  "Zefat": { code: 507, displayMode: 'ICON', heb: "צפת" },
  "Qazrin": { code: 201, displayMode: 'ICON', heb: "קצרין" },
  "Tel Aviv - Yafo": { code: 402, displayMode: 'ALL', heb: "תל אביב" }
};

export const weatherCodes = {
  1010: { text: "סופות חול",
    imageName: require("../images/weather/s-wind-2.png") },
  1020: { text: "סופות רעמים וברקים",
    imageName: require("../images/weather/s-bolt.png") },
  1030: { text: "ברד", imageName: require("../images/weather/s-hail.png") },
  1040: { text: "סופת שלגים", imageName: require("../images/weather/s-snowing.png") },
  1050: { text: "תזזיות שלג", imageName: require("../images/weather/s-snowflake.png") },
  1060: { text: "שלג", imageName: require("../images/weather/s-snowing.png") },
  1070: { text: "שלג קל", imageName: require("../images/weather/s-snowing-1.png") },
  1080: { text: "גשם מעורב בשלג", imageName: require("../images/weather/l-snow-and-rain.png") },
  1090: { text: "ממטרים", imageName: require("../images/weather/s-umbrella.png") },
  1100: { text: "ממטרים פזורים", imageName: require("../images/weather/l-rain-sun.png") },
  1110: { text: "ממטרים מקומיים", imageName: require("../images/weather/l-rain-sun.png") },
  1120: { text: "ממטרים קלים", imageName: require("../images/weather/l-rain-sun.png") },
  1130: { text: "גשם קופא", imageName: require("../images/weather/s-umbrella.png") },
  1140: { text: "גשם", imageName: require("../images/weather/s-umbrella.png") },
  1150: { text: "רסס", imageName: require("../images/weather/s-umbrella.png") },
  1160: { text: "ערפל", imageName: require("../images/weather/s-wind-2.png") },
  1170: { text: "ערפל קל", imageName: require("../images/weather/s-wind-2.png") },
  1180: { text: "עשן", imageName: require("../images/weather/s-wind-2.png") },
  1190: { text: "אובך", imageName: require("../images/weather/z-haze.png") },
  1200: { text: "מעונן", imageName: require("../images/weather/s-clouds.png") },
  1210: { text: "בדרך כלל מעונן", imageName: require("../images/weather/s-clouds.png") },
  1220: { text: "מעונן חלקית", imageName: require("../images/weather/s-clouds-1.png") },
  1230: { text: "מעונן", imageName: require("../images/weather/s-clouds.png") },
  1240: { text: "נאה", imageName: require("../images/weather/s-sunny.png") },
  1250: { text: "בהיר", imageName: require("../images/weather/s-sunny.png") },
  1260: { text: "רוחות ערות", imageName: require("../images/weather/s-wind-4.png") },
  1270: { text: "לח", imageName: require("../images/weather/s-steamy.png") },
  1280: { text: "יבש", imageName: require("../images/weather/z-thermometer-1.png") },
  1290: { text: "קפיאה", imageName: require("../images/weather/s-icicle.png") },
  1300: { text: "קרה", imageName: require("../images/weather/s-temperature-2.png") },
  1310: { text: "חם מאוד", imageName: require("../images/weather/l-very-hot.png") },
  1320: { text: "קר", imageName: require("../images/weather/s-temperature-2.png") },
  1330: { text: "התחממות", imageName: require("../images/weather/s-up.png") },
  1340: { text: "התקררות", imageName: require("../images/weather/s-down.png") },
  1350: { text: "מעונן חלקית עם עליה בטמפרטורות",
    imageName: require("../images/weather/s-clouds-1.png") },
  1360: { text: "מעונן חלקית עם ירידה בטמפרטורות",
    imageName: require("../images/weather/s-clouds-1.png") },
  1370: { text: "מעונן חלקית עם עליה ניכרת בטמפרטורות",
    imageName: require("../images/weather/s-clouds-1.png") },
  1380: { text: "מעונן חלקית עם ירידה ניכרת בטמפרטורות",
    imageName: require("../images/weather/s-clouds-1.png") },
  1390: { text: "מעונן עם עליה ניכרת בטמפרטורות",
    imageName: require("../images/weather/s-clouds.png") },
  1400: { text: "מעונן עם ירידה ניכרת בטמפרטורות",
    imageName: require("../images/weather/s-clouds.png") },
  1410: { text: "מעונן עם ירידה בטמפרטורות", imageName: require("../images/weather/s-clouds.png") },
  1420: { text: "מעונן עם ירידה בטמפרטורות",
    imageName: require("../images/weather/s-clouds.png") },
  1430: { text: "מעונן חלקית עם גשם מקומי",
    imageName: require("../images/weather/l-rain-sun.png") },
  1440: { text: "עליה ניכרת בטמפרטורות", imageName: require("../images/weather/s-up.png") },
  1450: { text: "ירידה ניכרת בטמפרטורות", imageName: require("../images/weather/s-down.png") },
  1460: { text: "שרבי", imageName: require("../images/weather/l-very-hot.png") }
};

// weather codes created beacuse of the Android 7.0+ bug
// not displaying images that are children of markers.
// Therefore, images are props to markers. Since for images
// props it is impossible to specify width and height, the exact
// image size is provided (smaller images)
export const weatherCodesA7 = {
  1010: { text: "סופות חול",
    imageName: require("../images/weather-a7/s-wind-2-90.png") },
  1020: { text: "סופות רעמים וברקים",
    imageName: require("../images/weather-a7/s-bolt-90.png") },
  1030: { text: "ברד", imageName: require("../images/weather-a7/s-hail-90.png") },
  1040: { text: "סופת שלגים", imageName: require("../images/weather-a7/s-snowing-90.png") },
  1050: { text: "תזזיות שלג", imageName: require("../images/weather-a7/s-snowflake-90.png") },
  1060: { text: "שלג", imageName: require("../images/weather-a7/s-snowing-90.png") },
  1070: { text: "שלג קל", imageName: require("../images/weather-a7/s-snowing-1-90.png") },
  1080: { text: "גשם מעורב בשלג", imageName: require("../images/weather-a7/l-snow-and-rain-90.png") },
  1090: { text: "ממטרים", imageName: require("../images/weather-a7/s-umbrella-90.png") },
  1100: { text: "ממטרים פזורים", imageName: require("../images/weather-a7/l-rain-sun-90.png") },
  1110: { text: "ממטרים מקומיים", imageName: require("../images/weather-a7/l-rain-sun-90.png") },
  1120: { text: "ממטרים קלים", imageName: require("../images/weather-a7/l-rain-sun-90.png") },
  1130: { text: "גשם קופא", imageName: require("../images/weather-a7/s-umbrella-90.png") },
  1140: { text: "גשם", imageName: require("../images/weather-a7/s-umbrella-90.png") },
  1150: { text: "רסס", imageName: require("../images/weather-a7/s-umbrella-90.png") },
  1160: { text: "ערפל", imageName: require("../images/weather-a7/s-wind-2-90.png") },
  1170: { text: "ערפל קל", imageName: require("../images/weather-a7/s-wind-2-90.png") },
  1180: { text: "עשן", imageName: require("../images/weather-a7/s-wind-2-90.png") },
  1190: { text: "אובך", imageName: require("../images/weather-a7/z-haze-90.png") },
  1200: { text: "מעונן", imageName: require("../images/weather-a7/s-clouds-90.png") },
  1210: { text: "בדרך כלל מעונן", imageName: require("../images/weather-a7/s-clouds-90.png") },
  1220: { text: "מעונן חלקית", imageName: require("../images/weather-a7/s-clouds-1-90.png") },
  1230: { text: "מעונן", imageName: require("../images/weather-a7/s-clouds-90.png") },
  1240: { text: "נאה", imageName: require("../images/weather-a7/s-sunny-90.png") },
  1250: { text: "בהיר", imageName: require("../images/weather-a7/s-sunny-90.png") },
  1260: { text: "רוחות ערות", imageName: require("../images/weather-a7/s-wind-4-90.png") },
  1270: { text: "לח", imageName: require("../images/weather-a7/s-steamy-90.png") },
  1280: { text: "יבש", imageName: require("../images/weather-a7/z-thermometer-1-90.png") },
  1290: { text: "קפיאה", imageName: require("../images/weather-a7/s-icicle-90.png") },
  1300: { text: "קרה", imageName: require("../images/weather-a7/s-temperature-2-90.png") },
  1310: { text: "חם מאוד", imageName: require("../images/weather-a7/l-very-hot-90.png") },
  1320: { text: "קר", imageName: require("../images/weather-a7/s-temperature-2-90.png") },
  1330: { text: "התחממות", imageName: require("../images/weather-a7/s-up-90.png") },
  1340: { text: "התקררות", imageName: require("../images/weather-a7/s-down-90.png") },
  1350: { text: "מעונן חלקית עם עליה בטמפרטורות",
    imageName: require("../images/weather-a7/s-clouds-1-90.png") },
  1360: { text: "מעונן חלקית עם ירידה בטמפרטורות",
    imageName: require("../images/weather-a7/s-clouds-1-90.png") },
  1370: { text: "מעונן חלקית עם עליה ניכרת בטמפרטורות",
    imageName: require("../images/weather-a7/s-clouds-1-90.png") },
  1380: { text: "מעונן חלקית עם ירידה ניכרת בטמפרטורות",
    imageName: require("../images/weather-a7/s-clouds-1-90.png") },
  1390: { text: "מעונן עם עליה ניכרת בטמפרטורות",
    imageName: require("../images/weather-a7/s-clouds-90.png") },
  1400: { text: "מעונן עם ירידה ניכרת בטמפרטורות",
    imageName: require("../images/weather-a7/s-clouds-90.png") },
  1410: { text: "מעונן עם ירידה בטמפרטורות",
    imageName: require("../images/weather-a7/s-clouds-90.png") },
  1420: { text: "מעונן עם ירידה בטמפרטורות",
    imageName: require("../images/weather-a7/s-clouds-90.png") },
  1430: { text: "מעונן חלקית עם גשם מקומי",
    imageName: require("../images/weather-a7/l-rain-sun-90.png") },
  1440: { text: "עליה ניכרת בטמפרטורות",
    imageName: require("../images/weather-a7/s-up-90.png") },
  1450: { text: "ירידה ניכרת בטמפרטורות",
    imageName: require("../images/weather-a7/s-down-90.png") },
  1460: { text: "שרבי",
    imageName: require("../images/weather-a7/l-very-hot-90.png") }
};
