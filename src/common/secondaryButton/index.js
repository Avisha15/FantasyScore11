import {View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import {AppText, POPPINS_EXTRA_BOLD_ITALIC, SIXTEEN,POPPINS_BOLD, FORTEEN, FIFTEEN} from '../AppText';
import {RootState} from '../../libs/rootReducer';
import {TouchableOpacityView} from '../TouchableOpacityView';

const SecondaryButton = ({
  buttonStyle,
  title,
  onPress,
  btnStyle,
  smallBtn,
  titleStyle,
  buttonViewStyle,
  ...rest
}: any) => {
  const colors = useSelector((state: RootState) => {
    return state.theme.colors;
  });
  return (
    <TouchableOpacityView
      {...rest}
      style={buttonStyle}
      activeOpacity={1}
      onPress={onPress}>
      <View
        style={[styles.grediant, btnStyle, smallBtn]}>
        <View style={[styles.buttonContainer, buttonViewStyle]}>
          <AppText
            type={FIFTEEN}
            weight={POPPINS_BOLD}
            style={[styles.buttonText, titleStyle]}>
            {title}
          </AppText>
        </View>
      </View>
    </TouchableOpacityView>
  );
};

export default SecondaryButton;
