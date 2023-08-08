import React from 'react';
import {View} from 'react-native';
import {CheckboxProps} from '../../types/common';
import {TouchableOpacityView} from '../TouchableOpacityView';
import {tick} from '../../helper/image';
import styles from './styles';
import {useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {RootState} from '../../libs/rootReducer';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../theme/color';

const Checkbox = ({onPress, value, disabled, type}) => {

  return (
    <TouchableOpacityView
      onPress={onPress}
      underlayColor="transparent"
      disabled={disabled}
      style={{}}>
      <View
        style={styles.linearGradientWrapper}>
        {value ? (
          <View style={[styles.selectedUIFilter(type, colors)]}>
            <FastImage
              source={tick}
              resizeMode={'contain'}
              tintColor={colors.imageColor}
              style={[styles.checkboxTick(type, colors)]}
            />
          </View>
        ) : (
          <View style={styles.unchecked(colors)} />
        )}
      </View>
    </TouchableOpacityView>
  );
};

export default Checkbox;
