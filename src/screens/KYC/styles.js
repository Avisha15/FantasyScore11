import {StyleSheet} from 'react-native';

import {Screen, universalPaddingHorizontal} from '../../theme/dimens';
import {fontFamilyPoppins} from '../../theme/typography';
import {NewColor, colors} from '../../theme/color';

const styles = StyleSheet.create({
  bottomContainer: {
    paddingHorizontal: universalPaddingHorizontal,
  },
  withdraw: colors => ({
    color: colors.white,
    marginTop: Screen.Height / 24,
  }),
  topText: colors => ({
    color: colors.white,
    marginTop: 15,
    marginHorizontal: 10,
  }),

  box: {
    borderWidth: 1,
    borderColor: colors.borderLightBlue,
    borderRadius: 16,
    marginTop: 10,
    // padding: 2,
  },
  textInputBox: {
    height: 45,
    width: 330,
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
  mobile: {
    marginLeft: 10,
  },
  topContainers: {
    flexDirection: 'row',
  },
  bottomBox: {
    marginHorizontal: 15,
    marginBottom: 10,
  },
  discription: colors => ({
    color: colors.white,
    marginTop: 10,
  }),
  getVerified: {
    marginTop: 20,
  },
  phone: {
    height: 20,
    width: 20,
  },
  phoneContainer: {
    backgroundColor: NewColor.linerLightBlueTwinty,
    height: 45,
    width: 45,
    marginHorizontal: 3,
    marginVertical: 3,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // alignSelf: 'center',
  },
  mobileContainer: {
    alignSelf: 'center',
    flex: 1,
    // backgroundColor: 'red',
  },
  verified: {
    alignSelf: 'center',
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop:2
  },

  editButton: {width: 70, alignSelf: 'center',  marginHorizontal: 10},
  editButtonTitle: {
    fontSize: 12,
    fontFamily: fontFamilyPoppins,
    color:colors.black
  },
});

export default styles;
