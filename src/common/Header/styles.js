import {StyleSheet} from 'react-native';

import {Logo, Screen, universalPaddingHorizontal} from '../../theme/dimens';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    padding: universalPaddingHorizontal,
    position: 'absolute',
  },
  header: {
    flexDirection: 'row',
    marginTop: Screen.Height / 50,
    paddingHorizontal: universalPaddingHorizontal,
    alignItems:'center'
  },
  logo: {
    alignSelf: 'center',
    marginTop: Screen.Height / 16,
    height: Logo.Height,
    width: Logo.Width,
  },
  title: {
    marginLeft: 15,
    marginTop:2
  },
  arrow: {
    height: 18,
    width: 18,
  },
  arrowIcon: {
    height: 20,
    width: 20,
  },
});

export default styles;
