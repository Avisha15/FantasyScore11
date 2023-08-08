import React from 'react';
import {View} from 'react-native';
import {AppText, BLACK, FORTEEN, POPPINS_MEDIUM, SIXTEEN} from '../AppText';
import {useSelector} from 'react-redux';

import {arrow, logo} from '../../helper/image';
import styles from './styles';
import {RootState} from '../../libs/rootReducer';
import NavigationService from '../../navigation/NavigationService';
import {TouchableOpacityView} from '../TouchableOpacityView';
import FastImage from 'react-native-fast-image';
import {universalPaddingHorizontal} from '../../theme/dimens';
import {colors} from '../../theme/color';

const Header = props => {
  const {commonHeader, title, color, tintColor} = props;

  return (
    <>
      {commonHeader ? (
        <View style={[styles.header, props.style]}>
          <TouchableOpacityView
            onPress={() => {
              NavigationService.goBack();
            }}>
            <FastImage
              style={styles.arrowIcon}
              resizeMode="contain"
              source={arrow}
              tintColor={tintColor ? tintColor : colors.black}
            />
          </TouchableOpacityView>

          <AppText
            color={color ? color : BLACK}
            type={SIXTEEN}
            weight={POPPINS_MEDIUM}
            style={styles.title}>
            {title}
          </AppText>
        </View>
      ) : (
        <>
          <TouchableOpacityView
            style={styles.bottomContainer}
            onPress={() => {
              NavigationService.goBack();
            }}>
            <FastImage
              style={styles.arrow}
              resizeMode="contain"
              source={arrow}
            />
          </TouchableOpacityView>
          <FastImage resizeMode="contain" style={styles.logo} source={logo} />
        </>
      )}
    </>
  );
};

export default Header;
