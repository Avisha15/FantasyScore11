import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {AppSafeAreaView} from '../../common/AppSafeAreaView';
import {TouchableOpacityView} from '../../common/TouchableOpacityView';
import {personIcon, combine, notification} from '../../helper/image';
import Toggle from './Toggle';
import Basketball from './Basketball';
import Football from './Football';
import Cricket from './Cricket';
import Kabbadi from './Kabbadi';
import NavigationService from '../../navigation/NavigationService';
import {BOTTOM_TAB_PROFILE_SCREEN, Notification__SCREEN} from '../../navigation/routes';
import {_createwallet, getUserWallet} from '../../actions/profileAction';
import CommonImageBackground from '../../common/commonImageBackground';
import {StatusBar} from 'native-base';
import {NewColor, colors} from '../../theme/color';
import {KeyBoardAware} from '../../common/KeyboardAware';
const Home = () => {
  const dispatch = useDispatch();
  const [selectedLabel, setSelectedLabel] = useState('Cricket');
  const onClick = Cricket => {
    setSelectedLabel(Cricket);
  };
  useEffect(() => {
    dispatch(getUserWallet());
  }, []);

  return (
    <AppSafeAreaView
      style={{backgroundColor: NewColor.linerWhite}}
      hidden={false}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        networkActivityIndicatorVisible={true}
      />
      <View style={styles.topContainer}>
        <View style={styles.topBar}>
          <TouchableOpacityView
          onPress={()=>NavigationService.navigate(BOTTOM_TAB_PROFILE_SCREEN)}
          >
            <FastImage
              resizeMode="contain"
              source={personIcon}
              style={styles.personImage}
            />
          </TouchableOpacityView>
          <FastImage
            source={combine}
            style={styles.combineIcon}
            resizeMode="contain"
          />
          <TouchableOpacityView
            style={{
              height: 28,
              with: 28,
              justifyContent: 'center',
            }}
            onPress={() => NavigationService.navigate(Notification__SCREEN)}>
            <FastImage
              source={notification}
              resizeMode="contain"
              style={styles.notificationIcon}
              tintColor={colors.black}
            />
          </TouchableOpacityView>
        </View>
      </View>
      {/* <KeyBoardAware scrollEnabled={false}> */}
      <Toggle
        onPress={onClick}
        selectedLabel={selectedLabel}
        extraDetail={{
          paddingHorizontal: 13.0,
          paddingVertical: 12.0,
        }}
      />

      {selectedLabel == 'Cricket' ? (
        <Cricket />
      ) : selectedLabel == 'Football' ? (
        <Football />
      ) : selectedLabel == 'Basketball' ? (
        <Basketball />
      ) : (
        <Kabbadi jobType="Kabbadi" />
      )}
      {/* </KeyBoardAware> */}
    </AppSafeAreaView>
  );
};
const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topContainer: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 10,
    marginTop: '10%',
  },
  personImage: {
    height: 28,
    width: 28,
  },
  combineIcon: {
    height: 40,
    width: 120,
  },
  notificationIcon: {
    height: 17,
    width: 16,
  },
});

export default Home;
