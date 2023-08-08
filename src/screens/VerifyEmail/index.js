import {View, StatusBar} from 'react-native';
import React, {useState} from 'react';
import Header from '../../common/Header';
import {AppSafeAreaView} from '../../common/AppSafeAreaView';
import {KeyBoardAware} from '../../common/KeyboardAware';
import CommonImageBackground from '../../common/commonImageBackground';
import {
  AppText,
  BLACK,
  BLACKOPACITY,
  ELEVEN,
  FORTEEN,
  POPPINS_LIGHT,
  POPPINS_MEDIUM,
  TEN,
  THIRTEEN,
} from '../../common/AppText';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import InputBox from '../../common/InputBox';
import PrimaryButton from '../../common/primaryButton';
import {RootState} from '../../libs/rootReducer';
import {universalPaddingHorizontal} from '../../theme/dimens';
import {VERIFY_EMAIL_OTP_SCREEN} from '../../navigation/routes';
import {toastAlert} from '../../helper/utility';
import {sendKycOtp} from '../../actions/profileAction';
import NavigationService from '../../navigation/NavigationService';

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state?.profile?.isLoading);
  const kycDetails = useSelector(state => {
    return state.profile.kycDetails;
  });
  const colors = useSelector((state: RootState) => {
    return state.theme.colors;
  });
  const [email, setEmail] = useState(
    kycDetails?.email ? kycDetails?.email : '',
  );
  const onSubmit = async () => {
    if (!email) return toastAlert.showToastError('Please enter email');
    const data = {
      value: email,
    };
    dispatch(sendKycOtp(data));
    NavigationService.navigate(VERIFY_EMAIL_OTP_SCREEN, {
      email: email,
    });
  };
  return (
    <AppSafeAreaView hidden={false}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        networkActivityIndicatorVisible={true}
      />
      <CommonImageBackground common>
        <Header
          commonHeader
          title="Verify Email Address"
          style={{padding: universalPaddingHorizontal, marginTop: '10%'}}
        />
        <KeyBoardAware style={styles.bottomContainer}>
          <AppText
            weight={POPPINS_MEDIUM}
            type={FORTEEN}
            style={[styles.withdraw, {marginLeft: 2}]}>
            Get Verified your Email
          </AppText>
          <View style={styles.box}>
            <InputBox
              placeholder="Enter your email"
              value={email}
              placeholderTextColor={colors.grey}
              labelStyle={styles.label}
              label="Email"
              returnKeyType="next"
              onChange={value => setEmail(value)}
              textInputBox={styles.textInputBox}
            />
            <AppText
              type={TEN}
              color={BLACKOPACITY}
              weight={POPPINS_MEDIUM}
              style={styles.otp}>
              Send One Time Password(OTP) to your mail.
            </AppText>
          </View>
        </KeyBoardAware>
        <View
          style={{
            paddingHorizontal: universalPaddingHorizontal,
            paddingVertical: 10,
          }}>
          <PrimaryButton onPress={onSubmit} title="GET OTP" />
        </View>
      </CommonImageBackground>
    </AppSafeAreaView>
  );
};

export default VerifyEmail;
