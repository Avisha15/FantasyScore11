import {StyleSheet} from 'react-native';
import {universalPaddingHorizontal} from '../../theme/dimens';
import {fontFamilyPoppins} from '../../theme/typography';
import {colors} from '../../theme/color';

const styles = StyleSheet.create({
  bottomContainer: {
    paddingHorizontal: universalPaddingHorizontal,
  },
  withdraw: {
    marginTop: 10,
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
    marginBottom: 10,
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
  },
});

export default styles;
