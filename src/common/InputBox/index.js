import {View, TextInput} from 'react-native';
import React from 'react';
import styles from './styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../libs/rootReducer';
import {AppText, FORTEEN, POPPINS_MEDIUM} from '../AppText';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import {cross, eye_close, eye_open} from '../../helper/image';
import {TouchableOpacityView} from '../TouchableOpacityView';
import {colors} from '../../theme/color';

const InputBox = ({
  secureTextEntry,
  label,
  labelStyle,
  value,
  returnKeyType,
  placeholder,
  textInputBox,
  textInputStyle,
  placeholderTextColor,
  onChange,
  isPassword,
  onToggle,
  closeImage,
  onPressClose,
  style,
  ...props
}: any) => {
  return (
    <View style={style}>
      {label && (
        <AppText
          {...props}
          type={FORTEEN}
          weight={POPPINS_MEDIUM}
          style={[styles.NameLabel, labelStyle]}>
          {label}
        </AppText>
      )}
      <View style={styles.gradient}>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 5,
            borderColor: colors.borderLightBlue,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between'
          }}>
          <TextInput
            {...props}
            placeholder={placeholder}
            placeholderTextColor={
              placeholderTextColor ? placeholderTextColor : colors.gray
            }
            style={[
              styles.textinputstyle,
              textInputBox,
              textInputStyle,
            ]}
            secureTextEntry={secureTextEntry ? true : false}
            value={value}
            returnKeyType={returnKeyType}
            onChangeText={onChange}
          />

          {isPassword ? (
            <>
              {secureTextEntry ? (
                <TouchableOpacityView
                  style={styles.toggleButton}
                  onPress={onToggle}>
                  <FastImage
                    source={eye_open}
                    style={styles.eyeIcon}
                    resizeMode="contain"
                  />
                </TouchableOpacityView>
              ) : (
                <TouchableOpacityView
                  style={styles.toggleButton}
                  onPress={onToggle}>
                  <FastImage
                    style={styles.eyeIcon}
                    source={eye_close}
                    resizeMode="contain"
                  />
                </TouchableOpacityView>
              )}
            </>
          ) : (
            <></>
          )}
          <View style={{padding: 5, marginRight:5}}>
            {closeImage ? (
              <TouchableOpacityView
                onPress={onPressClose}
                style-={styles.closeView}>
                <FastImage
                  style={{
                    height: 8,
                    width: 8,
                  }}
                  tintColor={colors.black}
                  source={cross}
                />
              </TouchableOpacityView>
            ) : (
              <></>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default InputBox;
