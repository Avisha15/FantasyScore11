import {View, Text, StatusBar, Image, FlatList} from 'react-native';
import React, {useState} from 'react';
import Header from '../../common/Header';
import {AppSafeAreaView} from '../../common/AppSafeAreaView';
import {KeyBoardAware} from '../../common/KeyboardAware';
import CommonImageBackground from '../../common/commonImageBackground';
import {
  AppText,
  BLACK,
  EIGHT,
  ELEVEN,
  FORTEEN,
  POPPINS_LIGHT,
  POPPINS_MEDIUM,
  POPPINS_SEMI_BOLD,
  SIXTEEN,
  TEN,
  THIRTEEN,
  TWELVE,
  WHITE,
} from '../../common/AppText';
import styles from './styles';
import {useSelector} from 'react-redux';
import InputBox from '../../common/InputBox';
import {RootState} from '../../libs/rootReducer';
import {scan, copy} from '../../helper/image';
import FastImage from 'react-native-fast-image';
import {phone, email, bank, panCard} from '../../helper/image';
import {universalPaddingHorizontal} from '../../theme/dimens';
import SecondaryButton from '../../common/secondaryButton';
import NavigationService from '../../navigation/NavigationService';
import {
  VERIFY_BANK_SCREEN,
  VERIFY_EMAIL_SCREEN,
  VERIFY_PAN_SCREEN,
} from '../../navigation/routes';

const KYC = () => {
  const colors = useSelector((state: RootState) => {
    return state.theme.colors;
  });
  const kycDetails = useSelector(state => {
    return state.profile.kycDetails;
  });
  const userData = useSelector(state => {
    return state.profile.userData;
  });
  ``;
  console.log(kycDetails, 'kycDetailskycDetailskycDetails');
  const DATA = [
    {
      id: '0',
      source: phone,
      heading: 'Mobile Number',
      subHeading: userData?.mobile_number
        ? userData?.mobile_number
        : kycDetails?.email_or_phone,
      type: 'Verified',
    },
    {
      id: '1',
      source: email,
      heading: 'Email Address',
      subHeading: kycDetails?.email
        ? kycDetails?.email
        : 'To get latest information',
      type: 'notVerified',
    },
    {
      id: '2',
      source: panCard,
      heading: 'PAN Card',
      subHeading: kycDetails?.pan_details?.PanNumber
        ? kycDetails?.pan_details?.PanNumber
        : 'For safety ans security of all transactions.',
      type: 'notVerified',
    },
    {
      id: '3',
      source: bank,
      heading: 'Bank Account',
      subHeading: kycDetails?.bank_details?.AccountNumber
        ? kycDetails?.bank_details?.AccountNumber
        : 'For withdrawals to your bank account.',
      type: 'notVerified',
    },
  ];
  const onPressAction = item => {
    if (item.id == '1') return NavigationService.navigate(VERIFY_EMAIL_SCREEN);
    if (item.id == '2') return NavigationService.navigate(VERIFY_PAN_SCREEN);
    if (item.id == '3') return NavigationService.navigate(VERIFY_BANK_SCREEN);
  };
  const isVerified = id => {
    if (id == 0) {
      return userData?.mobile_number ? 1 : 0;
    } else if (id == 1) {
      return kycDetails?.email_verified == 1;
    } else if (id == 2) {
      return kycDetails?.pan_verified == 1;
    } else if (id == 3) {
      return kycDetails?.bank_verified == 1;
    }
  };
  const checkInProgress = id => {
    if (id == 2) {
      return kycDetails?.pan_verified == 2;
    } else if (id == 3) {
      return kycDetails?.bank_verified == 2;
    }
  };
  const renderItem = ({item}) => {
    return (
      <View key={item.id} style={styles.box}>
        <View style={[styles.topContainer]}>
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={styles.phoneContainer}>
              <FastImage
                source={item.source}
                resizeMode="contain"
                style={styles.phone}
              />
            </View>
            <View style={styles.mobileContainer}>
              <View style={{flexDirection: 'row'}}>
                <AppText type={TWELVE} style={styles.mobile}>
                  {item.heading}
                </AppText>
                {isVerified(item?.id) ? (
                  <View
                    style={{
                      backgroundColor: colors.green,
                      marginLeft: 15,
                      borderRadius: 5,
                    }}>
                    <AppText
                      type={TEN}
                      weight={POPPINS_MEDIUM}
                      color={WHITE}
                      style={[styles.verified]}>
                      Verified
                    </AppText>
                  </View>
                ) : checkInProgress(item?.id) ? (
                  <View
                    style={{
                      backgroundColor: '#ECD5AB',
                      marginLeft: 15,
                      borderRadius: 5,
                    }}>
                    <AppText
                      type={TEN}
                      weight={POPPINS_MEDIUM}
                      style={styles.verified}>
                      In Process
                    </AppText>
                  </View>
                ) : (
                  <></>
                )}
              </View>
              <AppText numberOfLines={1} type={TEN} style={styles.mobile}>
                {JSON.stringify(item.subHeading)?.replace(
                  /(?!^.*)[^a-zA-Z\s](?=.{2})/g,
                  `X`,
                )}
              </AppText>
            </View>
          </View>
          {isVerified(item?.id) ? (
            <></>
          ) : checkInProgress(item?.id) ? (
            <></>
          ) : (
            <SecondaryButton
              title="Verify"
              onPress={() => onPressAction(item)}
              buttonStyle={styles.editButton}
              btnStyle={{backgroundColor: colors.white}}
              titleStyle={styles.editButtonTitle}
              buttonViewStyle={{height: 23}}
            />
          )}
        </View>
      </View>
    );
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
          title="Verify Account"
          style={{padding: universalPaddingHorizontal, marginTop: '10%'}}
        />
        <KeyBoardAware style={styles.bottomContainer}>
          <AppText
            weight={POPPINS_MEDIUM}
            type={FORTEEN}
            style={styles.getVerified}>
            Get Verified
          </AppText>
          {DATA.map((item, index) => {
            return renderItem({item});
          })}
        </KeyBoardAware>
      </CommonImageBackground>
    </AppSafeAreaView>
  );
};

export default KYC;
