import {
  Keyboard,
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, {useState} from 'react';
import {
  AppText,
  BLACK,
  POPPINS_MEDIUM,
  POPPINS_SEMI_BOLD,
  SIXTEEN,
  TEN,
  TWELVE,
  WHITE,
} from '../common/AppText';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../libs/rootReducer';
import Checkbox from '../common/CheckBox/CheckBox';
import {toastAlert, validateMobile, validateEmail} from '../helper/utility';
import {SpinnerSecond} from '../common/SpinnerSecond';
import {userSignup} from '../actions/authActions';
import {KeyBoardAware} from '../common/KeyboardAware';
import {Screen, universalPaddingHorizontal} from '../theme/dimens';
import FastImage from 'react-native-fast-image';
import {StatusBar} from 'native-base';
import {NewColor, colors} from '../theme/color';
import {poppinsSemiBold} from '../theme/typography';
const Login = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobile, setmobile] = useState('9355563256');
  const [email, setEmails] = useState('amit@yopmail.com');
  const [code, setCode] = useState('123456');
  const [isSelected, setIsSelected] = useState(false);

  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  const onSubmit = () => {
    // const validateMobile = mobile?.validateMobile(mobile);
    Keyboard.dismiss();
    if (!validateMobile(mobile)) {
      toastAlert.showToastError('Please provide a valid Mobile Number');
      return;
    } else if (!isSelected) {
      toastAlert.showToastError('Please check this box before proceed');
    } else {
      let data = {
        // refercode: code,
        refercode: code,
        mobile_number: mobile,
        resend: false,
        // resend: true,
        // refercode: refercode ?? '',
      };

      dispatch(userSignup(data));
    }
  };
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={'transparent'}
          translucent={true}
          networkActivityIndicatorVisible={true}
        />
        <KeyBoardAware>
          <ImageBackground
            style={styles.poster}
            source={require('../../assets/images/Splash.png')}>
            <FastImage
              style={styles.logos}
              resizeMode="contain"
              source={require('../../assets/images/smalllogo.png')}
            />
            <View
              style={{
                paddingHorizontal: universalPaddingHorizontal,
                marginTop: '45%',
                width: Screen.Width - 20,
              }}>
              <View
                style={{
                  borderRadius: 20,
                  borderColor: colors.borderLightBlue,
                  borderWidth: 1,
                  paddingBottom: 20,
                  backgroundColor: NewColor.linerWhitefifty,
                }}>
                <View
                  style={{
                    height: 50,
                    justifyContent: 'center',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    backgroundColor: NewColor.linerBlackFive,
                  }}>
                  <AppText
                    weight={POPPINS_SEMI_BOLD}
                    type={SIXTEEN}
                    style={{
                      textAlign: 'center',
                    }}>
                    LOGIN/REGISTER
                  </AppText>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    borderColor: colors.borderLightBlue,
                    borderWidth: 1,
                    height: 40,
                    borderRadius: 15,
                    backgroundColor: NewColor.linerWhitefifty,
                    width: '95%',
                    margin: 8,
                    paddingHorizontal: 5,
                  }}>
                  <FastImage
                    resizeMode="contain"
                    tintColor={colors.imageColor}
                    source={require('../../assets/images/phone1.png')}
                    style={{
                      padding: 10,
                      margin: 5,
                      height: 3,
                      width: 3,
                      alignItems: 'center',
                    }}
                  />

                  <TextInput
                    style={{
                      fontSize: 14,
                      color: colors.black,
                      flex: 1,
                      fontFamily: poppinsSemiBold,
                      marginLeft: 10,
                      marginBottom: -5,
                      opacity: 0.5,
                    }}
                    placeholder="Enter Mobile Number"
                    underlineColorAndroid="transparent"
                    placeholderTextColor={colors.black}
                    keyboardType="phone-pad"
                    maxLength={10}
                    value={mobile}
                    onChangeText={value => {
                      setmobile(value);
                    }}
                  />
                  <TouchableOpacity onPress={() => setmobile('')}>
                    <FastImage
                      resizeMode="contain"
                      tintColor={colors.imageColor}
                      source={require('../../assets/images/cross1.png')}
                      style={{
                        padding: 10,
                        margin: 5,
                        height: 20,
                        width: 20,
                        alignItems: 'center',
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={{marginHorizontal: 10}}
                  onPress={() => {
                    setText(true);
                    setVisible(false);
                  }}>
                  {visible && (
                    <AppText
                      weight={POPPINS_MEDIUM}
                      style={{
                        textDecorationLine: 'underline',
                        textAlign: 'right',
                      }}>
                      Have a referral code?
                    </AppText>
                  )}
                  {text && (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderColor: colors.borderLightBlue,
                        backgroundColor: NewColor.linerWhitefifty,
                        borderWidth: 1,
                        height: 40,
                        borderRadius: 15,
                        width: '101%',
                        right: 2,
                        top: 5,
                      }}>
                      <TextInput
                        style={{
                          fontSize: 14,
                          color: colors.black,
                          flex: 1,
                          fontFamily: poppinsSemiBold,
                          opacity: 0.5,
                          marginBottom: -3,
                          marginLeft: 10,
                        }}
                        placeholder="Enter Invite Code(Optional)"
                        underlineColorAndroid="transparent"
                        placeholderTextColor={colors.black}
                        keyboardType="phone-pad"
                        fontWeight="200"
                        value={code}
                        onChangeText={value => {
                          setCode(value);
                        }}
                      />
                      <TouchableOpacity onPress={() => setCode('')}>
                        <FastImage
                          resizeMode="contain"
                          source={require('../../assets/images/cross1.png')}
                          tintColor={colors.imageColor}
                          style={{
                            padding: 10,
                            margin: 5,
                            height: 20,
                            width: 20,
                            alignItems: 'center',
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    marginTop: 20,
                    paddingHorizontal: 10,
                  }}>
                  <Checkbox
                    onPress={() => setIsSelected(!isSelected)}
                    value={isSelected}
                  />

                  <AppText
                    onPress={() => setIsSelected(!isSelected)}
                    type={TWELVE}
                    style={{marginStart: 10, flex: 1}}>
                    I confirm that I am 18+ years in age.
                  </AppText>
                </View>
                <TouchableOpacity onPress={() => onSubmit()}>
                  <LinearGradient
                    style={{
                      backgroundColor: 'green',
                      height: 45,
                      borderRadius: 10,
                      width: '95%',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      top: 20,
                    }}
                    start={{x: 0, y: 1}}
                    end={{x: 1, y: 0}}
                    colors={[colors.borderBlue, colors.linerProgress]}>
                    <AppText
                      color={WHITE}
                      weight={POPPINS_SEMI_BOLD}
                      type={SIXTEEN}
                      style={{
                        textAlign: 'center',
                        marginTop: 2,
                      }}>
                      CONTINUE
                    </AppText>
                  </LinearGradient>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    marginTop: 30,
                  }}>
                  <Image
                    source={require('../../assets/images/18.png')}
                    style={{
                      height: 25,
                      width: 25,
                      resizeMode: 'stretch',
                      alignItems: 'center',
                    }}
                  />
                  <AppText
                    type={TEN}
                    weight={POPPINS_MEDIUM}
                    color={BLACK}
                    style={{
                      left: 5,
                    }}>
                    I have read and agree to Fantasy Score 11 Terms of Service
                    and{`\n`}Privacy Policy
                  </AppText>
                </View>
              </View>
            </View>
          </ImageBackground>
        </KeyBoardAware>
      </SafeAreaView>
      <SpinnerSecond loading={isLoading} />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  referral: colors => ({
    color: colors.white,
    marginTop: Screen.Height / 10,
  }),
  bottomContainer: {
    paddingHorizontal: universalPaddingHorizontal,
  },
  enter: colors => ({
    color: colors.white,
    marginTop: 10,
  }),
  label: {
    marginTop: 50,
  },
  button: {
    marginTop: 50,
  },
  account: colors => ({
    color: colors.white,
    alignSelf: 'center',
    marginTop: Screen.Height / 7,
  }),
  register: colors => ({
    color: colors.code,
  }),
  forgot: colors => ({
    color: colors.white,
    alignSelf: 'flex-end',
    marginTop: 15,
  }),
  password: {
    marginTop: 15,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  poster: {
    width: '100%',
    resizeMode: 'contain',
    alignItems: 'center',
    alignSelf: 'center',
    height: '100%',
  },
  logos: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    alignSelf: 'center',
    top: '20%',
  },
});
export default Login;
