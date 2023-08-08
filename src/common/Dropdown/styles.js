import {StyleSheet} from 'react-native';
import {Primary} from '../../theme/dimens';
import {fontFamilyPoppins} from '../../theme/typography';
import {colors} from '../../theme/color';

const styles = StyleSheet.create({
  background: {
    height: Primary.Height,
    borderRadius: 5,
    borderColor: colors.borderLightBlue,
    backgroundColor: 'transparent',
  },
  placeholderText: {
    fontFamily: fontFamilyPoppins,
    fontSize: 12,
  },
  dropDownContainerStyle: {
    borderColor: colors.borderLightBlue,
  },
  textStyle: {
    color: colors.black,
  },
  NameLabel: {
    marginTop: 20,
    marginBottom: 5,
  },
  arrowIcon: colors => ({tintColor: colors.white}),
});

export default styles;
