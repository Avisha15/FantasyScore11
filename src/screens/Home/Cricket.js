import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useRef} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  AppText,
  EIGHTEEN,
  POPPINS_MEDIUM,
  POPPINS_SEMI_BOLD,
} from '../../common/AppText';
import MatchCard from '../../components/matchCard/MatchCard';
import ViewAll from '../../components/matchCard/viewAll/ViewAll';
import Matchsection from './Matchsection';
import {BOTTOM_TAB_CONTEST_SCREEN} from '../../navigation/routes';
import NavigationService from '../../navigation/NavigationService';
import {universalPaddingHorizontal} from '../../theme/dimens';
import {setMyMatchesHome, setUpComingMatches} from '../../slices/matchSlice';
import {KeyBoardAware} from '../../common/KeyboardAware';

const Cricket = () => {
  const dispatch = useDispatch();
  const wsRef = useRef(null);
  const upcomingMatches = useSelector(state => state.match.upcomingMatches);
  const myMatchesHome = useSelector(state => state.match.myMatchesHome);
  const userData = useSelector(state => {
    return state.profile.userData;
  });
  const {_id} = userData ?? '';
  const URL = `ws://65.0.134.70:3000/upcoming-matches?limit=10&skip=0&userid=${_id}`;
  const [isMoadlVisible, setIsModalVisible] = useState(false);
  const [intro, setIntro] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [refershing, setRefreshing] = useState(false);
  const renderUpcomingMatches = ({item}) => {
    return <MatchCard details={item} />;
  };

  //   try {
  //     const res = await appOperation.customer.getIntro();
  //     if (res?.success) {
  //       setIntro(res.data);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  // useEffect(() => {
  //   getIntro();
  //   modalOpenCheck();
  //   // setTimeout(() => {
  //   //   setIsModalVisible(true);
  //   // }, 2000);
  // }, []);

  const modalOpenCheck = async () => {
    try {
      const isSeen = await AsyncStorage.getItem('isSeen');
      if (!isSeen) {
        setIsModalVisible(true);
        await AsyncStorage.setItem('isSeen', 'true');
      }
    } catch (error) {}
  };

  const onNext = () => {
    if (activeIndex == intro?.length - 1) {
      setIsModalVisible(false);
    } else {
      setActiveIndex(activeIndex + 1);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    try {
      wsRef.current = new WebSocket(URL);
      wsRef.current.onopen = () => {};
      wsRef.current.onclose = e => {};
      wsRef.current.onerror = e => {};
      if (!wsRef.current) return;
      wsRef.current.onmessage = e => {
        const parseData = JSON.parse(e?.data);
        let temp = parseData?.upcoming?.sort((a, b) => {
          return a?.contest_details?.length < b?.contest_details?.length;
        });
        dispatch(setUpComingMatches(temp));
        dispatch(setMyMatchesHome(parseData?.mymatches));
      };
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  }, []);
  return (
    <View style={styles.container}>
      {myMatchesHome?.length !== 0 && (
        <View>
          <View style={styles.one}>
            <AppText type={EIGHTEEN} weight={POPPINS_MEDIUM}>
              My Matches
            </AppText>
            <ViewAll
              onPress={() =>
                NavigationService.navigate(BOTTOM_TAB_CONTEST_SCREEN)
              }
            />
          </View>
          <View style={styles.two}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}>
              {myMatchesHome?.map((data, index) => {
                // let data = Object.assign({}, e);
                // let match_details = data?.match_details;
                // const {competition, teama, teamb, date_start_ist} =
                //   match_details ?? '';
                // data['SeriesName'] = competition?.title;
                // data['TeamA'] = teama?.name;
                // data['TeamAlogo'] = teama?.logo_url;
                // data['TeamsShortNames'] = [
                //   teama?.short_name,
                //   teamb?.short_name,
                // ];
                // data['StartDateTime'] = date_start_ist;
                // data['TeamB'] = teamb?.name;
                // data['TeamBlogo'] = teamb?.logo_url;

                return (
                  <Matchsection
                    details={data}
                    isFromMyMatch={true}
                    tab={'Upcoming'}
                    isHome={true}
                    index={index}
                  />
                );
              })}
            </ScrollView>
          </View>
        </View>
      )}
      <AppText
        style={{
          marginTop: myMatchesHome?.length !== 0 ? 5 : 20,
          marginHorizontal: universalPaddingHorizontal,
        }}
        type={EIGHTEEN}
        weight={POPPINS_SEMI_BOLD}>
        Upcoming Matches
      </AppText>
      <KeyBoardAware
        refreshControl={
          <RefreshControl refreshing={refershing} onRefresh={onRefresh} />
        }
        style={styles.flatlistContainer}>
        {upcomingMatches?.map(item => {
          return <MatchCard details={item} />;
        })}
      </KeyBoardAware>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  one: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: universalPaddingHorizontal,
  },
  two: {
    height: 130,
    alignItems: 'center',
    alignSelf: 'flex-start',
    alignContent: 'center',
    marginTop: 10,
  },
  flatlistContainer: {
    width: '100%',
    marginTop: 5,
    paddingHorizontal: universalPaddingHorizontal,
  },
});
export default Cricket;
