import React, {createContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  AUTHSTACK,
  BOTTOM_NAVIGATION_STACK,
  BOTTOM_TAB_CONTEST_SCREEN,
  BOTTOM_TAB_HOMESCREEN,
  BOTTOM_TAB_MORE_SCREEN,
  BOTTOM_TAB_PROFILE_SCREEN,
  MANAGE_PAYMENTS_SCREEN,
  KYC_SCREEN,
  ADD_CARD_SCREEN,
  Top_Slider_FlatList,
  SELECT_PLAYER,
  NFC,
  PROFILE_EDIT,
  REFER_EARN,
  HOME_SCREEN_MAIN,
  CONTEST_SCREEN_MAIN,
  PROFILE_SCREEN_MAIN,
  MORE_SCREEN_MAIN,
  MY_BALANCE,
  VERIFY_EMAIL_SCREEN,
  VERIFY_EMAIL_OTP_SCREEN,
  VERIFY_PAN_SCREEN,
  VERIFY_BANK_SCREEN,
  ADD_MONEY_SCREEN,
  Single_Ipl_Card,
  PRACTISE_SCREEN,
  PLAYER_PREVIEW,
  CREATE_CONTEST,
  Filter_Sheet,
  Common_Tabs,
  Match_Remainder,
  Notification__SCREEN,
  SELECT_CAPTAIN,
  ALL_CONTEST_LIST,
  OTP,
  LOGIN,
  LEADERBOARD,
  MY_CONTEST,
  AUTH_LOADING_SCREEN,
  TRANSACTION_SCREEN,
  WITHDRAW_SCREEN,
  CONTEST_LEADERBORD,
} from './routes';
import NavigationService from './NavigationService';
import {useSelector, useDispatch} from 'react-redux';
import PlayerPreview from '../screens/playerPreview/PlayerPreview';
import MyContest from '../screens/MyContest';
import Profile from '../screens/Profile';
import More from '../screens/More';
import MyContestList from '../components/matchCard/myContest/MyContestList';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  contestLinerIcon,
  contest_icon,
  homeLinerIcon,
  home_icon,
  moreLinerIcon,
  more_icon,
  profileLinerIcon,
  profile_icon,
} from '../helper/image';
import FastImage from 'react-native-fast-image';
import ReferAndEarn from '../screens/ReferAndEarn';
import EditProfile from '../screens/EditProfile/editProfile';
import Nfc from '../screens/NFC/Nfc';
import ManagePayment from '../screens/ManagePayment';
import KYC from '../screens/KYC';
import Home from '../screens/Home/Home';
import Contest from '../screens/CONTESTPAGE/Contest';
import AuthLoading from '../screens/AuthLoading';
import MyBalance from '../screens/MyBalance';
// import Splash from '../screens/Splash';
import Login from '../screens/login';
import Otp from '../screens/Otp';
import VerifyEmail from '../screens/VerifyEmail';
import VerifyEmailOTP from '../screens/VerifyEmailOTP';
import VerifyBank from '../screens/VerifyBank';
import VerifyPAN from '../screens/VerifyPAN';
import AddCard from '../screens/AddCard';
import AddMoney from '../screens/AddMoney';
import SingleIplCard from '../common/SingleIplCard/SingleIplCard';
import PractiseScreen from '../screens/practiseScreen/PractiseScreen';
import TopSliderFlatList from '../common/TopSliderFlatList/TopSliderFlatList';
import SelectPlayer from '../screens/selectPlayer/SelectPlayer';
import CreateContest from '../screens/CreateContest';
import FilterSheet from '../components/filterSheet/FilterSheet';
import CommonTabs from '../components/matchCard/commonTabs/CommonTabs';
import MatchRemainder from '../components/matchCard/matchRemainder/MatchRemainder';
import selectCaptain from '../screens/selectCaptain/SelectCaptain';
import Notification from '../screens/Notification';
import MyMatches from '../screens/myMatches/MyMatches';
import {refreshToken} from '../actions/authActions';
import LeaderBoard from '../screens/leaderBoard/LeaderBoard';
import MyTransaction from '../screens/MyTransaction';
import Withdraw from '../screens/Withdraw';
import AllContestList from '../screens/allContestList/AllContestList';
import ContestLeaderbord from '../screens/myMatches/ContestLeaderbord';
import {AppText, BOTTOMTEXT, FORTEEN, GRY, TEN} from '../common/AppText';
import {NewColor, colors} from '../theme/color';
import LinearGradient from 'react-native-linear-gradient';

// import LeaderBoard from '../screens/leaderBoard/LeaderBoard';
const Stack = createNativeStackNavigator();

const Navigator = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     dispatch(());
  //   }, 100000);
  //   return () => clearInterval(interval);
  // }, []);
  return (
    <NavigationContainer
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}>
      <RootStackScreen />
    </NavigationContainer>
  );
};

export default Navigator;

const RootStackScreen = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name={AUTH_LOADING_SCREEN}
      component={AuthLoading}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name={AUTHSTACK}
      component={AuthStack}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name={BOTTOM_NAVIGATION_STACK}
      component={BottomMainTab}
      options={{headerShown: false}}
    />
    <Stack.Screen name={PROFILE_EDIT} component={EditProfile} />
    <Stack.Screen name={MY_BALANCE} component={MyBalance} />
    <Stack.Screen name={REFER_EARN} component={ReferAndEarn} />
    <Stack.Screen name={NFC} component={Nfc} />
    <Stack.Screen name={KYC_SCREEN} component={KYC} />
    <Stack.Screen name={VERIFY_EMAIL_SCREEN} component={VerifyEmail} />
    <Stack.Screen name={VERIFY_EMAIL_OTP_SCREEN} component={VerifyEmailOTP} />
    <Stack.Screen name={VERIFY_PAN_SCREEN} component={VerifyPAN} />
    <Stack.Screen name={VERIFY_BANK_SCREEN} component={VerifyBank} />
    <Stack.Screen name={MANAGE_PAYMENTS_SCREEN} component={ManagePayment} />
    <Stack.Screen name={ADD_CARD_SCREEN} component={AddCard} />
    <Stack.Screen name={ADD_MONEY_SCREEN} component={AddMoney} />
    <Stack.Screen name={Single_Ipl_Card} component={SingleIplCard} />
    <Stack.Screen name={PRACTISE_SCREEN} component={PractiseScreen} />
    <Stack.Screen name={Top_Slider_FlatList} component={TopSliderFlatList} />
    <Stack.Screen name={PLAYER_PREVIEW} component={PlayerPreview} />
    <Stack.Screen name={SELECT_PLAYER} component={SelectPlayer} />
    <Stack.Screen name={CREATE_CONTEST} component={CreateContest} />
    <Stack.Screen name={Filter_Sheet} component={FilterSheet} />
    <Stack.Screen name={Common_Tabs} component={CommonTabs} />
    <Stack.Screen name={Match_Remainder} component={MatchRemainder} />
    <Stack.Screen name={CONTEST_LEADERBORD} component={ContestLeaderbord} />
    <Stack.Screen name={ALL_CONTEST_LIST} component={AllContestList} />
    <Stack.Screen name={Notification__SCREEN} component={Notification} />
    <Stack.Screen name={SELECT_CAPTAIN} component={selectCaptain} />
    <Stack.Screen name={MY_CONTEST} component={MyContest} />
    <Stack.Screen name={LEADERBOARD} component={LeaderBoard} />
    <Stack.Screen name={TRANSACTION_SCREEN} component={MyTransaction} />
    <Stack.Screen name={WITHDRAW_SCREEN} component={Withdraw} />
  </Stack.Navigator>
);

const AuthStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {/* <Stack.Screen name={'Splash'} component={Splash} /> */}
      <Stack.Screen name={LOGIN} component={Login} />
      <Stack.Screen name={OTP} component={Otp} />
      <Stack.Screen name={'Home'} component={BottomMainTab} />
    </Stack.Navigator>
  );
};

const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name={HOME_SCREEN_MAIN}
      component={Home}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

const ContestStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name={CONTEST_SCREEN_MAIN}
      component={MyContest}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name={PROFILE_SCREEN_MAIN}
      component={Profile}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

const MoreStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name={MORE_SCREEN_MAIN}
      component={More}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

const BottomMainTab = () => {
  const BottomTab = createBottomTabNavigator();
  return (
    <BottomTab.Navigator
      backBehavior="initialRoute"
      initialRouteName={HOME_SCREEN_MAIN}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: NewColor.linerWhite,
          height: 60,
          borderTopWidth: 0,
          paddingVertical: 10,
        },
        tabBarAllowFontScaling: false,
        tabBarShowLabel: false,
      }}>
      <BottomTab.Screen
        name={BOTTOM_TAB_HOMESCREEN}
        component={HomeStack}
        options={{
          tabBarIcon: ({focused}) => (
            <>
              {focused ? (
                <LinearGradient
                  start={{x: 0, y: 1}}
                  end={{x: 1, y: 0}}
                  style={{
                    height: 5,
                    width: 46,
                    borderBottomRightRadius: 50,
                    borderBottomLeftRadius: 50,
                    position: 'absolute',
                    top: -11,
                  }}
                  colors={[colors.borderBlue, colors.linerProgress]}
                />
              ) : (
                <></>
              )}
              <FastImage
                source={focused ? homeLinerIcon : home_icon}
                tintColor={focused ? null : colors.gray}
                style={{
                  width: 25,
                  height: 25,
                }}
                resizeMode="contain"
              />
              <AppText
                style={{marginTop: 3}}
                color={focused ? BOTTOMTEXT : GRY}
                type={TEN}>
                Home
              </AppText>
            </>
          ),
        }}
      />
      <BottomTab.Screen
        name={BOTTOM_TAB_CONTEST_SCREEN}
        component={MyMatches}
        options={{
          tabBarIcon: ({focused}) => (
            <>
              {focused ? (
                <LinearGradient
                  start={{x: 0, y: 1}}
                  end={{x: 1, y: 0}}
                  style={{
                    height: 5,
                    width: 46,
                    borderBottomRightRadius: 50,
                    borderBottomLeftRadius: 50,
                    position: 'absolute',
                    top: -11,
                  }}
                  colors={[colors.borderBlue, colors.linerProgress]}
                />
              ) : (
                <></>
              )}
              <FastImage
                source={focused ? contestLinerIcon : contest_icon}
                tintColor={focused ? null : colors.gray}
                style={{
                  width: 25,
                  height: 25,
                }}
                resizeMode="contain"
              />
              <AppText
                style={{marginTop: 3}}
                color={focused ? BOTTOMTEXT : GRY}
                type={TEN}>
                My Contest
              </AppText>
            </>
          ),
        }}
      />
      <BottomTab.Screen
        name={BOTTOM_TAB_PROFILE_SCREEN}
        component={ProfileStack}
        options={{
          tabBarIcon: ({focused}) => (
            <>
              {focused ? (
                <LinearGradient
                  start={{x: 0, y: 1}}
                  end={{x: 1, y: 0}}
                  style={{
                    height: 5,
                    width: 46,
                    borderBottomRightRadius: 50,
                    borderBottomLeftRadius: 50,
                    position: 'absolute',
                    top: -11,
                  }}
                  colors={[colors.borderBlue, colors.linerProgress]}
                />
              ) : (
                <></>
              )}
              <FastImage
                tintColor={focused ? null : colors.gray}
                source={focused ? profileLinerIcon : profile_icon}
                style={{
                  width: 25,
                  height: 25,
                }}
                resizeMode="contain"
              />
              <AppText
                style={{marginTop: 3}}
                color={focused ? BOTTOMTEXT : GRY}
                type={TEN}>
                Profile
              </AppText>
            </>
          ),
        }}
      />

      <BottomTab.Screen
        name={BOTTOM_TAB_MORE_SCREEN}
        component={MoreStack}
        options={{
          tabBarIcon: ({focused}) => (
            <>
              {focused ? (
                <LinearGradient
                  start={{x: 0, y: 1}}
                  end={{x: 1, y: 0}}
                  style={{
                    height: 5,
                    width: 46,
                    borderBottomRightRadius: 50,
                    borderBottomLeftRadius: 50,
                    position: 'absolute',
                    top: -11,
                  }}
                  colors={[colors.borderBlue, colors.linerProgress]}
                />
              ) : (
                <></>
              )}
              <FastImage
                tintColor={focused ? null : colors.gray}
                source={focused ? moreLinerIcon : more_icon}
                style={{
                  width: 25,
                  height: 25,
                }}
                resizeMode="contain"
              />
              <AppText
                style={{marginTop: 3}}
                color={focused ? BOTTOMTEXT : GRY}
                type={TEN}>
                More
              </AppText>
            </>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};
