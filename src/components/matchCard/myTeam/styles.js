import {Dimensions, StyleSheet} from 'react-native';
import { NewColor, colors } from '../../../theme/color';
const styles = StyleSheet.create({
  card: {
    height: 162,
    borderColor: colors.lightgry,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 10,
    borderWidth:1
  },
  topContainer: {
    height: 162 - 33,
    width: '100%',
    resizeMode: 'contain',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  top: {
    height: 33,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor:"rgba(0, 0, 0, 0.2)",
  
  },
  icon: {
    height: 14,
    width: 14,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 33,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor:NewColor.linerBlackFive
  },
  midContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 96,
  },
  playerContainer: {
    flexDirection: 'row',
  },
  captainBedge: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
  },
  playerImage: {
    height: 60,
    width: 53,
    resizeMode: 'contain',
  },
  playerName: {
    height: 22,
    width: 70,
    backgroundColor: colors.borderBackColor,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;