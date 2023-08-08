import {StyleSheet} from 'react-native';

import {Screen, universalPaddingHorizontal} from '../../theme/dimens';
import {fontFamilyPoppins} from '../../theme/typography';
import {colors} from '../../theme/color';

const styles = StyleSheet.create({
  bottomContainer: {
    paddingHorizontal: universalPaddingHorizontal,
  },
  withdraw: {
    marginTop: 10,
  },
  wallet: colors => ({
    color: colors.code,
    marginTop: 15,
  }),

  box: {
    borderWidth: 1,
    borderColor: colors.borderLightBlue,
    borderRadius: 16,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  label: {
    marginTop: 0,
    marginBottom: 5,
  },
  textInputBox: {
    fontFamily: fontFamilyPoppins,
    fontSize: 12,
  },
  boxContainer: {
    marginHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    marginTop: 30,
    marginBottom:10
  },
  upload: {
    marginTop: 10,
  },
  image: {
    height: 34,
    width: 34,
    alignSelf: 'center',
    marginTop: 50,
  },
  image2: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
  },
  uploadContainer: {
    borderWidth: 1,
    borderColor: colors.borderLightBlue,
    borderRadius: 16,
    marginTop: 10,
    height: 150,
  },
});

export default styles;
