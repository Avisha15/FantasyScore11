import React from 'react';
import {TouchableOpacityView} from '../../../common/TouchableOpacityView';
import FastImage from 'react-native-fast-image';
import {right_arrow} from '../../../helper/image';
import styles from './styles';
import {AppText, ELEVEN, POPPINS_MEDIUM} from '../../../common/AppText';
import {colors} from '../../../theme/color';
import LinearGradient from 'react-native-linear-gradient';
const ViewAll = ({onPress}) => {
  return (
    <LinearGradient
      style={{
        height: 25,
        width: 78,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        marginRight: 5,
      }}
      start={{x: 0, y: 1}}
      end={{x: 1, y: 0}}
      colors={[colors.borderBackColor, colors.linerProgress]}>
      <TouchableOpacityView style={styles.viewAllBtn} onPress={onPress}>
        <AppText
          weight={POPPINS_MEDIUM}
          type={ELEVEN}
          style={{marginRight: 5, marginTop: 2}}>
          View all
        </AppText>
        <FastImage
          source={right_arrow}
          style={styles.rightArrow}
          resizeMode="contain"
          tintColor={colors.black}
        />
      </TouchableOpacityView>
    </LinearGradient>
  );
};

export default ViewAll;
