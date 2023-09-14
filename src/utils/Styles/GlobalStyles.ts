import {StyleSheet} from 'react-native';

const colors = {
  black: 'black',
};

const GlobalStyles = StyleSheet.create({
  titles: {
    fontSize: 30,
    color: colors.black,
  },
  texts: {
    fontSize: 15,
    color: colors.black,
    marginTop: 20,
  },
  hyperlink: {
    color: '#3366CC',
  },
});

export default GlobalStyles;
