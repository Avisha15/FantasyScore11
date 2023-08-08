import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  StatusBar,
} from 'react-native';
import React, {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {shareToAny} from '../../helper/utility';
import {AppSafeAreaView} from '../../common/AppSafeAreaView';
import {
  AppText,
  POPPINS_MEDIUM,
  POPPINS_SEMI_BOLD,
  TEN,
  TWENTY_FOUR,
  WHITE,
} from '../../common/AppText';
import Header from '../../common/Header';
import {
  referbackground,
  Refer1,
  Refer2,
  Refer3,
  Refer4,
  whatsapp,
  chain,
  film,
  medal,
} from '../../helper/image';
import {Button} from '../../common/Button';
import {SolidButton} from '../../common/SolidButton';
import {KeyBoardAware} from '../../common/KeyboardAware';
import {NewColor, colors} from '../../theme/color';
import {universalPaddingHorizontal} from '../../theme/dimens';
import FastImage from 'react-native-fast-image';

export default function ReferAndEarn() {
  const data = [
    {
      id: 1,
      image: chain,
      title: 'Invite your friends',
      about:
        'Share the link with you Friends over whatsapp or any other social platform.',
    },
    {
      id: 2,
      image: film,
      title: 'Get ₹50 when Signup',
      about: 'When your friend sign up on the app, you will receive 50.',
    },
    {
      id: 3,
      image: medal,
      title: 'Get ₹50 when they add money',
      about:
        'When your friend will add money in the wallet, you will receive 50.',
    },
  ];
  return (
    <>
      <AppSafeAreaView statusColor={'transparent'} hidden={false}>
        <StatusBar
          backgroundColor={'transparent'}
          translucent={true}
          networkActivityIndicatorVisible={true}
        />
        <KeyBoardAware style={{backgroundColor: 'white'}}>
          <ImageBackground
            style={styles.bgIMAGE}
            resizeMode="cover"
            source={referbackground}>
            <View style={{marginHorizontal: 10, marginTop: '10%'}}>
              <Header
                color={WHITE}
                tintColor={NewColor.linerWhite}
                commonHeader={true}
                title="Refer & Earn"
              />
            </View>
            <View style={styles.shareContainer}>
              <Image
                style={{
                  width: 141,
                  height: 60,
                  alignSelf: 'flex-start',
                  top: 30,
                }}
                source={Refer1}></Image>
              <View
                style={{
                  flexDirection: 'row',
                  height: 100,
                  width: '80%',
                  alignSelf: 'center',
                  bottom: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  left: 100,
                }}>
                <Image
                  resizeMode="contain"
                  style={{width: 27.02, height: 18.42, top: 20}}
                  source={Refer3}></Image>
                <Image
                  resizeMode="contain"
                  style={{width: 236, height: 178, bottom: 10, right: 60}}
                  source={Refer2}></Image>
              </View>
              <Image
                resizeMode="contain"
                style={{width: 192, height: 66, bottom: 60}}
                source={Refer4}></Image>
            </View>

            <View style={styles.mediaBtnContainer}>
              <LinearGradient
                style={{
                  height: 62,
                  width: 117,
                  borderRadius: 9,
                  justifyContent: 'center',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginTop: -2,
                }}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={[colors.borderBlue, colors.linerProgress]}>
                <AppText
                  type={TWENTY_FOUR}
                  weight={POPPINS_SEMI_BOLD}
                  color={WHITE}>
                  ₹500
                </AppText>
                <AppText
                  style={{marginTop: -10}}
                  weight={POPPINS_SEMI_BOLD}
                  color={WHITE}>
                  collected
                </AppText>
              </LinearGradient>
              <View style={{flexDirection: 'column'}}>
                <View style={{flexDirection: 'row'}}>
                  <AppText weight={POPPINS_MEDIUM}>Invite accepted -</AppText>
                  <AppText weight={POPPINS_SEMI_BOLD}> 10</AppText>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <AppText weight={POPPINS_MEDIUM}>New Reward- </AppText>
                  <AppText weight={POPPINS_MEDIUM}> ₹1000 </AppText>
                </View>
              </View>
            </View>
          </ImageBackground>
          <View
            style={{
              height: 14,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              marginTop: '15%',
            }}>
            <LinearGradient
              style={{
                width: 128,
                height: 1,
              }}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={[
                colors.linerLineBlue,
                colors.linerLinePick,
              ]}></LinearGradient>
            <AppText weight={POPPINS_MEDIUM}>How it works! </AppText>
            <LinearGradient
              style={{
                width: 128,
                height: 1,
              }}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={[
                colors.linerLineBlue,
                colors.linerLinePick,
              ]}></LinearGradient>
          </View>
          <View
            style={{
              paddingHorizontal: 20,
              flex: 1,
            }}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                height: 240,
              }}>
              {/* <View
                style={{
                  borderStyle: 'dotted',
                  height: 150,
                  borderLeftWidth: 1,
                  borderColor: colors.black,
                  position: 'absolute',
                  left: 20,
                  zIndex: -1,
                  opacity: 0.5,
                }}
              /> */}
              {data?.map((item, index) => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: 39,
                        height: 39,
                        backgroundColor: NewColor.linerBlacklight,
                        borderRadius: 20,
                        alignItems: 'center',
                        alignContent: 'center',
                        justifyContent: 'center',
                      }}>
                      <FastImage
                        resizeMode="contain"
                        style={{width: 21, height: 21}}
                        source={item?.image}
                      />
                    </View>
                    <View
                      style={{
                        marginLeft: 15,
                        flex: 1,
                      }}>
                      <AppText
                        type={POPPINS_MEDIUM}
                        >
                        {item?.title}
                      </AppText>
                      <AppText
                        numberOfLines={2}
                        type={TEN}
                        >
                        {item?.about}
                      </AppText>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              onPress={() =>
                shareToAny(`"ANNSKJJKsJKASJKAJSDJKASJKDASJKDJASJASK`)
              }
              style={{
                width: '79%',
                height: 45,
                marginTop: 10,
                borderRadius: 10,
              }}>
              INVITE
            </Button>
            <SolidButton
              size={TEN}
              color={WHITE}
              style={[styles.mediaBtn, {backgroundColor: NewColor.linerWhite}]}
              nogradient={true}
              ImageStyle={styles.commonBtn}
              Icon={whatsapp}></SolidButton>
          </View>
        </KeyBoardAware>
      </AppSafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  bgContainer: {
    width: '100%',
    height: 480,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 50,
  },
  bgIMAGE: {
    height: 320,
  },
  shareContainer: {
    width: '90%',
    height: 250,
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    left: 10,
    marginTop: -10,
  },
  referralContainer: {
    width: '100%',
    alignItems: 'center',
  },
  referralWrapper: {
    width: 275,
    height: 60,
    borderRadius: 10,
    borderStyle: 'dashed',
    borderColor: '#88D1F2',
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 13,
    paddingVertical: 10,
    marginTop: 15,
  },
  referCode: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: 'white',
  },
  code: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediaBtnContainer: {
    flexDirection: 'row',
    width: '90%',
    height: 80,
    position: 'absolute',
    bottom: '-12%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderRadius: 16,
    alignSelf: 'center',
    backgroundColor: NewColor.linerWhite,
    borderWidth: 1,
    borderColor: colors.borderLightBlue,
  },
  mediaBtn: {
    width: 58,
    borderRadius: 10,
    height: 45,
    marginLeft: 7,
    top: 3,
    borderWidth: 1,
    borderColor: colors.borderLightBlue,
  },
  commonBtn: {
    width: 29,
    height: 29,
    marginRight: 2,
    resizeMode: 'contain',
  },
  linerBtnContainer: {
    width: '90%',
    height: 60,
    marginTop: 10,
    backgroundColor: 'rgba(23, 44, 102, 0.3)',
    borderRadius: 16,
    flexDirection: 'row',
    borderColor: 'rgba(23, 44, 102, 0.7)',

    borderWidth: 1,
  },
  linerBtn: {
    width: 10,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  TextContainer: {
    flex: 1,
    paddingTop: 10,
  },
  buttonContainer: {
    marginHorizontal: universalPaddingHorizontal,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: colors => ({
    color: colors.white,
    textAlign: 'center',
    marginTop: 30,
  }),
  text: colors => ({
    width: 263,
    textAlign: 'center',
    color: colors.white,
  }),
  color: colors => ({
    color: colors.white,
  }),
  RewardText: colors => ({
    textAlign: 'center',
    color: colors.white,
  }),
  ruleText: colors => ({
    textAlign: 'center',
    color: colors.code,
  }),
});
