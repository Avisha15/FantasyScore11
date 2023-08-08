import {Dimensions, StyleSheet} from 'react-native';
import { universalPaddingHorizontal } from '../../../theme/dimens';

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    paddingTop: 30,
    marginBottom: 15,
    marginTop: '10%',
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  leftArrow: {
    height: 16,
    width: 16,
    resizeMode: 'contain',
    marginRight: 10,
  },
  text: {
    color: 'white',
  },
  flex1: {
    flex: 1,
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  rightImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    left: 10,
  },
  bellIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  walletIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginRight: 12,
  },
  live: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  matchImage: {
    resizeMode: 'contain',
  },
  teamContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: universalPaddingHorizontal,
  },
  shape: {
    width: 111,
    height: 29,
    position: 'absolute',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  teamImage: {
    height: 37,
    width: 37,
    resizeMode: 'contain',
  },
  filterContainer: {
    height: 33,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
    marginTop: -10,
  },
  entryTitle: {
    marginRight: 40,
  },
  filterIcon: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
    left: 10,
  },
  card: {
    height: 85,
    width: '100%',
    overflow: 'hidden',
    bottom: 30,
  },
  teamName: {
    color: 'white',
    fontSize: 10,
  },
  teamShortName: {
    fontSize: 12,
    color: 'white',
  },
});

export default styles;
