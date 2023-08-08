import React, {useState} from 'react';
import {FlatList, ImageBackground, View} from 'react-native';
import {AppText, POPPINS_SEMI_BOLD, TWELVE, TWENTY} from '../../common/AppText';
import PrimaryButton from '../../common/primaryButton';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-native-modal';

import SecondaryButton from '../../common/secondaryButton';
import {
  bg,
  bell,
  battle,
  wallet,
  personIcon,
  right_arrow,
  refer_earn,
  terms_conditions,
  combine,
  notification,
  balance,
} from '../../helper/image';
import {RootState} from '../../libs/rootReducer';
import styles from './styles';
import {AppSafeAreaView} from '../../common/AppSafeAreaView';
import {KeyBoardAware} from '../../common/KeyboardAware';
import FastImage from 'react-native-fast-image';
import {userLogout} from '../../actions/authActions';
import {TouchableOpacityView} from '../../common/TouchableOpacityView';
import NavigationService from '../../navigation/NavigationService';
import {
  MY_BALANCE,
  NFC,
  REFER_EARN,
  Notification__SCREEN,
} from '../../navigation/routes';
import LinearGradient from 'react-native-linear-gradient';
import {StatusBar} from 'native-base';
import CommonImageBackground from '../../common/commonImageBackground';
import {universalPaddingHorizontal} from '../../theme/dimens';
import {NewColor, colors} from '../../theme/color';

const DATA = [
  {
    id: '1',
    source: balance,
    heading: 'My Balance',
    type: right_arrow,
  },

  {
    id: '2',
    source: refer_earn,
    heading: 'Refer & Earn',
    type: right_arrow,
  },
  {
    id: '3',
    source: terms_conditions,
    heading: 'Terms & Conditions',
    type: right_arrow,
  },
];

const More = () => {
  const dispatch = useDispatch();
  const [mdlVisibile, setMdlVisible] = useState(false);

  const onPressAction = id => {
    if (id == '1') return NavigationService.navigate(MY_BALANCE);
    if (id == '2') return NavigationService.navigate(REFER_EARN);
    // if (id == '3') return NavigationService.navigate(NFC);
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacityView
        key={item.id}
        onPress={() => onPressAction(item.id)}
        style={styles.box}>
        <View style={styles.boxContainer}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.phoneContainer}>
              <FastImage
                source={item.source}
                resizeMode="contain"
                style={{height: 20, width: 20}}
              />
            </View>
            <View style={styles.mobileContainer}>
              <AppText type={TWELVE} style={styles.mobile}>
                {item.heading}
              </AppText>
            </View>
          </View>
          <View style={styles.arrow}>
            <FastImage
              source={item.type}
              resizeMode="contain"
              style={{width: 6, height: 12, marginRight: 10}}
              tintColor={colors.black}
            />
          </View>
        </View>
      </TouchableOpacityView>
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '12%',
            paddingHorizontal: 12,
          }}>
          <FastImage source={personIcon} style={{height: 28, width: 28}} />
          <FastImage
            source={combine}
            style={{height: 40, width: 120}}
            resizeMode="contain"
          />
          <TouchableOpacityView
            style={{
              padding: 5,
            }}
            onPress={() => NavigationService.navigate(Notification__SCREEN)}>
            <FastImage
              source={notification}
              resizeMode={'contain'}
              style={{height: 17, width: 16}}
              tintColor={colors.black}
            />
          </TouchableOpacityView>
        </View>
        <View style={styles.bottomContainer}>
          {DATA.map(item => {
            return renderItem({item});
          })}
          <PrimaryButton
            onPress={() => setMdlVisible(true)}
            buttonStyle={styles.button}
            title="LOG OUT"
          />
        </View>
      </CommonImageBackground>

      <Modal
        isVisible={mdlVisibile}
        style={{margin: 0}}
        animationIn="fadeIn"
        animationOut={'fadeOut'}
        hasBackdrop={true}
        onBackdropPress={() => setMdlVisible(false)}>
        <View
          style={{
            flex: 1,
            backgroundColor: NewColor.linerBlackFive,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={styles.modalBox}>
            <AppText
              style={styles.modalText}
              type={TWENTY}
              weight={POPPINS_SEMI_BOLD}>
              Are you sure you want to {'\n'} logout?
            </AppText>
            <PrimaryButton
              onPress={() => dispatch(userLogout())}
              title="LOGOUT"
            />

            <SecondaryButton
              onPress={() => setMdlVisible(false)}
              title="CANCEL"
            />
          </View>
        </View>
      </Modal>
    </AppSafeAreaView>
  );
};

export default More;
