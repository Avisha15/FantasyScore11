import React, {useEffect, useState} from 'react';
import {View, Pressable, StyleSheet, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {
  AppText,
  GREEN,
  POPPINS_BOLD,
  POPPINS_LIGHT,
  POPPINS_MEDIUM,
  POPPINS_SEMI_BOLD,
  TEN,
} from '../../common/AppText';
import NavigationService from '../../navigation/NavigationService';
import {MY_CONTEST} from '../../navigation/routes';
import {toastAlert} from '../../helper/utility';
import {useDispatch, useSelector} from 'react-redux';
import {setContestData} from '../../slices/matchSlice';
import FastImage from 'react-native-fast-image';
import {NewColor, colors} from '../../theme/color';
import {myMatchbackGround} from '../../helper/image';
import {Screen, universalPaddingHorizontal} from '../../theme/dimens';
import {LiveTime} from '../../common/LiveTime';
export const getDate = details => {
  let a = moment();
  let b = moment(details?.StartDateTime);
  const duration = moment.duration(b.diff(a));
  const diffInHours = Math.floor(duration.asHours());
  const diffInDays = Math.floor(duration.asDays());
  const diffInMin = duration.minutes();
  const diffInSec = duration.seconds();
  if (diffInHours > 24) {
    let temp = {
      hour: diffInHours,
      time: `${diffInDays}d`,
      minute: 40,
    };
    return temp;
  } else {
    let temp = {
      hour: diffInHours,
      minute: diffInMin,
      time: `${diffInHours > 0 ? `${diffInHours}h` : ''} ${diffInMin}m ${
        diffInHours > 0 ? '' : `${diffInSec}s`
      }`,
    };
    return temp;
  }
};
const Matchsection = ({
  details,
  isFromMyMatch = false,
  tab = null,
  isHome,
  index,
}) => {
  const dispatch = useDispatch();
  const {contest_details, status} = details ?? '';
  const myMatchesHome = useSelector(state => state.match.myMatchesHome);
  let isMatchToday = moment().isSame(details?.StartDateTime, 'day');
  const [contestDetails, setContestDetails] = useState(null);
  const {data} = (contest_details && contest_details[0]) ?? '';
  const contestList = useSelector(state => state?.match?.contestList);
  const [time, setTime] = useState({
    time: '',
    hour: 0,
    minute: 0,
  });

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTime(getDate(details));
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, [details]);
  useEffect(() => {
    const contest = data?.reduce((prev, current) => {
      return Number(prev?.winning_amount) > Number(current?.winning_amount)
        ? prev
        : current;
    });

    setContestDetails(contest);
  }, [data]);
  const onNavigateContest = () => {
    if (details?.contest_details?.length == 0) {
      return toastAlert.showToastError('There Are No Contest For This Match');
    } else if (details?.Status == 'Scheduled') {
      dispatch(setContestData({...details}));
      NavigationService.navigate(MY_CONTEST, {isFromMyMatch: false});
    } else if (details?.Status == 'Completed') {
      dispatch(setContestData({...details}));
      NavigationService.navigate(MY_CONTEST, {isFromMyMatch: true});
    }
  };

  return (
    <Pressable onPress={onNavigateContest}>
      <ImageBackground
        imageStyle={{borderRadius: 20}}
        source={myMatchbackGround}
        style={[
          styles.mainContainer,
          {
            marginLeft:
              myMatchesHome?.length + 1 == index
                ? 0
                : universalPaddingHorizontal,
            marginRight:
              myMatchesHome?.length - 1 == index
                ? universalPaddingHorizontal
                : 0,
          },
        ]}>
        <AppText weight={POPPINS_BOLD} type={TEN} style={styles.seriesNameText}>
          {details?.SeriesName}
        </AppText>
        <View style={styles.teamLogoView}>
          <View style={styles.oneView}>
            <AppText weight={POPPINS_SEMI_BOLD} type={TEN} numberOfLines={1}>
              {details?.TeamA.split(' ')[0]}
            </AppText>
            <FastImage
              resizeMode="contain"
              style={styles.teamImage}
              source={{uri: details?.TeamAlogo}}
            />
          </View>
          <View style={styles.oneView}>
            {details?.Status === 'Completed' ? (
              <>
                <AppText
                  style={{marginTop: 20}}
                  weight={POPPINS_MEDIUM}
                  type={TEN}
                  color={GREEN}>
                  {details?.Status}
                </AppText>
              </>
            ) : (
              <>
                {details?.Status == 'Live' ? (
                  <></>
                ) : (
                  <LiveTime
                    styletext={{marginTop: 20}}
                    type={TEN}
                    top={true}
                    details={details}
                  />
                )}
                {isMatchToday && details?.Status !== 'Live' ? (
                  <AppText>Today</AppText>
                ) : (
                  <>
                    <AppText
                      type={TEN}
                      style={[
                        {
                          color:
                            details?.Status === 'Live'
                              ? colors.lightRed
                              : colors.green,
                          marginTop: details?.Status === 'Live' ? 20 : null,
                        },
                      ]}>
                      {details?.Status}
                    </AppText>
                  </>
                )}
              </>
            )}
          </View>
          <View style={styles.oneView}>
            <AppText weight={POPPINS_SEMI_BOLD} type={TEN} numberOfLines={1}>
              {details?.TeamB.split(' ')[0]}
            </AppText>
            <FastImage
              resizeMode="contain"
              style={styles.teamImage}
              source={{uri: details?.TeamBlogo}}
            />
          </View>
        </View>
        <View style={styles.bottomView}>
          <AppText
            style={{
              marginTop: 2,
            }}>
            {details?.countTeam} Team
          </AppText>
          <AppText
            style={{
              marginTop: 2,
              marginLeft: 15,
            }}>
            {details?.countContest} Contests
          </AppText>
        </View>
      </ImageBackground>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  bottom: {
    height: 22,
    justifyContent: 'space-around',
    backgroundColor: '#1F2A2C',
    flexDirection: 'row',
    alignItems: 'center',
    width: 190,
    top: 30,
    right: 10,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
  },
  today: {
    color: 'white',
    fontSize: 10,
  },
  live: {
    color: '#15CE31',
    fontSize: 10,
  },
  mainContainer: {
    justifyContent: 'center',
    borderRadius: 16,
    alignSelf: 'center',
    width: Screen.Width / 2,
    resizeMode: 'contain',
  },
  seriesNameText: {
    textAlign: 'center',
    marginTop: 10,
  },
  teamView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 10,
  },
  teamAtext: {},
  teamBtext: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 10,
    fontWeight: '500',
    fontFamily: 'POPPINS',
    flex: 1,
    textAlign: 'right',
  },
  teamLogoView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    paddingHorizontal: 10,
  },
  teamImage: {
    width: 45,
    height: 40,
    resizeMode: 'contain',
    marginTop: 5,
  },
  winning_amount: {
    color: 'white',
    fontSize: 9,
    fontWeight: '500',
    fontFamily: 'POPPINS',
    left: 15,
  },
  oneView: {
    alignItems: 'center',
    flex: 1,
  },
  bottomView: {
    height: 22,
    backgroundColor: NewColor.linerBlacklight,
    marginTop: 9,
    borderBottomLeftRadius: 19,
    borderBottomRightRadius: 19,
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
});
export default Matchsection;
