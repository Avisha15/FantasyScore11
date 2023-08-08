import {StyleSheet} from 'react-native';

import {Screen, universalPaddingHorizontal} from '../../theme/dimens';
import { colors } from '../../theme/color';

const styles = StyleSheet.create({
  bottomContainer: {
    paddingHorizontal: universalPaddingHorizontal,
  },
  box: {
    borderWidth: 2,
    borderColor: colors.borderLightBlue,
    borderRadius: 16,
    marginTop: 20,
    padding: 15,
  },
  textInputBox: {
    height: 40,
  },
  boxContainer: {
    // marginHorizontal: 10,
    // marginBottom: 20,
  },
  button: {
    marginTop: Screen.Height / 3,
  },
  scan: {
    height: 200,
    width: 200,
    alignSelf: 'center',
    marginTop: Screen.Height / 14,
  },
  copy: {
    width: 54,
    height: 48,
    alignSelf: 'center',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  code: {
    alignSelf: 'center',
  },

  entry: {
    marginTop: 10,
  },
  topContainers: {
    flexDirection: 'row',
  },
  horizontalLine: {
    height: 3,
    width: '100%',
    marginHorizontal: 15,
    marginTop: 10,
  },
  bottomBox: {
    marginHorizontal: 15,
    marginBottom: 10,
  },
  phone: {
    height: 18,
    width: 18,
    alignSelf: 'center',
    top: 10,
  },
  mobileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  middleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
 
  smallBtn: {
    width: 70,
    height: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  rsContainer: {
    alignSelf: 'center',
    borderRadius: 4,
    borderColor:colors.borderLightBlue,
    borderWidth:1
  },
  rs: {
    textAlign: 'center',
    textAlignVertical: 'center',
    width: 70,
    height: 30,
  },
});

export default styles;
