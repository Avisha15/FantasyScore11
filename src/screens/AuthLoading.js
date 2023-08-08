import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getUserProfile} from '../actions/profileAction';
import {AppSafeAreaView} from '../common/AppSafeAreaView';
import {SpinnerSecond} from '../common/SpinnerSecond';
import {USER_TOKEN_KEY} from '../libs/constants';
import NavigationService from '../navigation/NavigationService';
import {AUTHSTACK, LOGIN, OTP} from '../navigation/routes';

const AuthLoading = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    bootstrapAsync();
  }, []);

  const bootstrapAsync = async () => {
    try {
      const token = await AsyncStorage.getItem(USER_TOKEN_KEY);
      console.log(token, 'tokentoken');
      if (token) {
        // NavigationService.reset(OTP);
        dispatch(getUserProfile(true, false));
      } else {
        NavigationService.navigate(AUTHSTACK);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <AppSafeAreaView>
      <SpinnerSecond loading={true} />
    </AppSafeAreaView>
  );
};

export default AuthLoading;
