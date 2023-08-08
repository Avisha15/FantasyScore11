import React, {useEffect, useRef} from 'react';
import {AppState, Linking, Platform, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setMyMatchesHome, setUpComingMatches} from './slices/matchSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationService from './navigation/NavigationService';
import {USER_TOKEN_KEY} from './libs/constants';
import {AUTHSTACK} from './navigation/routes';
const RootComponent = ({children}) => {
  const dispatch = useDispatch();
  const wsRef = useRef(null);
  const userData = useSelector(state => {
    return state.profile.userData;
  });
  const myContest = useSelector(state => state?.match?.myContest);
  const {_id} = userData ?? '';
  console.log(_id,'_id')
  const URL = `ws://65.0.134.70:3000/upcoming-matches?limit=10&skip=0&userid=${_id}`;


  console.log('resl', URL);
  useEffect(() => {
    if (_id) {
      wsRef.current = new WebSocket(URL);
      wsRef.current.onopen = () => {};
      wsRef.current.onclose = e => {};
      wsRef.current.onerror = e => {};
      return () => {
        wsRef.current.close();
      };
    }
  }, [_id, myContest]);
  useEffect(() => {
    if (!wsRef.current) return;
    wsRef.current.onmessage = e => {
      const parseData = JSON.parse(e?.data);
      let temp = parseData?.upcoming?.sort((a, b) => {
        return a?.contest_details?.length < b?.contest_details?.length;
      });
      // console.log(JSON.stringify(parseData),'--------------');
      
      dispatch(setUpComingMatches(temp));
      dispatch(setMyMatchesHome(parseData?.mymatches));
    };
  });
  return <View style={{flex: 1}}>{children}</View>;
};
export default RootComponent;
