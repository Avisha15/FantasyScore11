import {StyleSheet} from 'react-native';

import {Screen} from '../../theme/dimens';
import {fontFamilyPoppins} from '../../theme/typography';
import {colors} from '../../theme/color';

const styles = StyleSheet.create({
  bottomContainer: {
    marginHorizontal: 10,
  },
  withdraw: {
    marginTop: 20,
  },
  box: {
    borderWidth: 1,
    borderColor: colors.borderLightBlue,
    borderRadius: 16,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  label: {
    marginTop: 0,
  },
  textInputBox: {
    fontFamily: fontFamilyPoppins,
    fontSize: 12,
  },
  boxContainer: {
    marginHorizontal: 10,
    marginBottom: 20,
  },

  otp: {
    marginTop: 10,
  },
});

export default styles;
