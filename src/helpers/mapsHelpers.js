// Israel doordinates

const israelMin = { x: 34.243, y: 29.285 };
const israelMax = { x: 35.97, y: 33.25 };

export const israelRegionPortrait = {
  "latitude": 31.2675,
  "latitudeDelta": 3.965,
  "longitude": 35.1065,
  "longitudeDelta": 1.7269999999999968
};

export const israelRegionLandscape = {
  "latitude": 31.750259271964172,
  "latitudeDelta": 1.5117090002513365,
  "longitude": 34.83479546383023,
  "longitudeDelta": 4.136764593422406
};

// calulate map region (needed in MapView) from min/max points


  const getRegionForCoordinates = (min, max) => {

    const midX = (min.x + max.x) / 2;
    const midY = (min.y + max.y) / 2;
    const deltaX = (max.x - min.x);
    const deltaY = (max.y - min.y);

    return ({
      longitude: midX,
      latitude: midY,
      longitudeDelta: deltaX,
      latitudeDelta: deltaY
    });
  };
