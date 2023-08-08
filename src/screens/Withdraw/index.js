import {View, Text, StatusBar, Image} from 'react-native';
import React, {useState} from 'react';
import Header from '../../common/Header';
import {AppSafeAreaView} from '../../common/AppSafeAreaView';
import {KeyBoardAware} from '../../common/KeyboardAware';
import CommonImageBackground from '../../common/commonImageBackground';
import {
  AppText,
  ELEVEN,
  POPPINS_LIGHT,
  RUSSO,
  TEN,
  THIRTEEN,
  THIRTY,
  TWELVE,
} from '../../common/AppText';
import styles from './styles';
import {useSelector} from 'react-redux';
import InputBox from '../../common/InputBox';
import SecondaryButton from '../../common/secondaryButton';
import {PrivateValueStore} from '@react-navigation/native';
import PrimaryButton from '../../common/primaryButton';
import DropdownComponent from '../../common/Dropdown';
import {icici} from '../../helper/image';
import FastImage from 'react-native-fast-image';
import { IMAGE_BASE_URL } from '../../helper/utility';

const Withdraw = () => {
  const colors = useSelector((state: RootState) => {
    return state.theme.colors;
  });
  const userData = useSelector(state => {
    return state.profile.userData;
  });
  const kycDetails = useSelector(state => {
    return state.profile.kycDetails;
  });
  const {winning_amount} = userData ?? '';

  const {bank_details} = kycDetails ?? '';
  const {AccountNumber, BankName, Bankimagepath} = bank_details ?? '';
  return (
    <AppSafeAreaView style={styles.container}>
      <StatusBar hidden={false} />
      <KeyBoardAware>
        <CommonImageBackground common>
          <Header commonHeader title="Withdraw" />
          <View style={styles.bottomContainer}>
            <View style={styles.topContainer}>
              <AppText type={THIRTEEN} style={styles.withdraw(colors)}>
                Your winnings
              </AppText>
              <AppText type={TWELVE} style={styles.withdraw(colors)}>
                ₹{winning_amount}
              </AppText>
            </View>

            <View style={styles.box(colors)}>
              <View style={styles.boxContainer}>
                <FastImage
                  style={styles.image}
                  source={
                    Bankimagepath
                      ? {uri: `${IMAGE_BASE_URL}${Bankimagepath}`}
                      : icici
                  }
                />
                <View style={styles.rightContainer}>
                  <AppText type={TWELVE} style={styles.rightText(colors)}>
                  {BankName}
                  </AppText>
                  <AppText type={TWELVE} style={styles.rightText(colors)}>
                    A/C  {AccountNumber}
                  </AppText>
                </View>
              </View>
            </View>

            <View style={styles.box(colors)}>
              <View style={styles.bottomBoxContainer}>
                <AppText type={ELEVEN} style={styles.wallet(colors)}>
                  Amount
                </AppText>
                <InputBox
                  textInputBox={styles.textInputBox}
                  placeholder="₹ Enter your amount"
                  placeholderTextColor={'#FFFFFF'}
                />
                <AppText
                  type={TEN}
                  weight={POPPINS_LIGHT}
                  style={styles.otp(colors)}>
                  Min. ₹50 & Max. ₹1,00,000 allowed per day.
                </AppText>
              </View>
            </View>
          </View>
          <PrimaryButton buttonStyle={styles.button} title="WITHDRAW" />
        </CommonImageBackground>
      </KeyBoardAware>
    </AppSafeAreaView>
  );
};

export default Withdraw;
