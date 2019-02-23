import { daysInHebrew } from './daysInHebrew';

// return an array containing the names of the next 3 hebrew days
// if partOfDay === "Morning", then from tomorrow
//  otherwise (partOfDay === "Evening"), then from the day after tomorrow
export const nextHebDays = (partOfDay) => {
  var now = new Date();
  let startDay = now.getDay(); // today's day of the week (0-6)
  startDay += (partOfDay === "Morning" ) ? 1 : 2;

  return [
    daysInHebrew[(startDay) % 7],
    daysInHebrew[(startDay + 1) % 7],
    daysInHebrew[(startDay + 2) % 7]
  ];
};

export const sleep = (seconds) => {
  const ms = seconds * 1000;
  const start = new Date().getTime();
  while (new Date().getTime() < start + ms);
};
