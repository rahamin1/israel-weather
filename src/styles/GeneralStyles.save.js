import { StyleSheet } from 'react-native';

const GeneralStyles = StyleSheet.create({
  successTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'green',
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  },
  logo: {
    resizeMode: 'contain',
    width: null,
  },
  backgroundImgStyle: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    backgroundColor: '#faf8f2',
    flex: 1,
  },
  backgroundStyle: {
    backgroundColor: '#faf8f2',
  },
  taglineStyle: {
    fontSize: 22,
    alignSelf: 'center',
    padding: 15,
  },
  taglineSmallStyle: {
    fontSize: 16,
    alignSelf: 'center',
    padding: 5,
  },
  resetTextStyle: {
    alignSelf: 'center',
    backgroundColor: '#F8F8F8',
  },
});

export default GeneralStyles;
