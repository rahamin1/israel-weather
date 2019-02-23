import { StyleSheet } from 'react-native';

const GS = StyleSheet.create({
  containerViewStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000080'
  },
  modalViewStyle: {
    width: 300,
    height: 'auto',
    backgroundColor: "#fff",
    padding: 20
  },
  taglineStyle: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 15
  },
  taglineSmallStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 5
  },
  taglineVerySmallStyle: {
    fontSize: 12,
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 5
  },
  textStyle: {
    fontSize: 14,
    alignSelf: 'center',
    padding: 5
  },
  smallTextStyle: {
    fontSize: 12,
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 5
  },
  blueTextStyle: {
    fontSize: 14,
    color: '#00f',
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 5
  },
  smallBlueTextStyle: {
    fontSize: 12,
    color: '#81858c',
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 5
  },
  markerText: {
    backgroundColor: "#fff8",
    lineHeight: 13,
    marginRight: 0,
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 0,
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12
  },
  markerText2: {
    backgroundColor: "transparent",
    lineHeight: 14,
    color: "#fff",
    marginRight: 0,
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 0,
    fontWeight: 'bold',
    fontSize: 12
  },
  textTitle1: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center'
  },
  textTitle2: {
    fontWeight: 'bold',
    fontSize: 14
  },
  textBody: {
    fontWeight: 'bold',
    fontSize: 12
  },
  cardSectionStyle: {
    borderWidth: 1,
    borderBottomWidth: 1,
    width: 250,
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardSectionStyle2: {
    borderWidth: 1,
    borderBottomWidth: 1,
    width: 200,
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default GS;
