import React,{useEffect} from 'react';
import {Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  AppText,
  BLACKOPACITY,
  FIFTEEN,
  POPPINS,
  POPPINS_BOLD,
  POPPINS_MEDIUM,
  TEN,
  THIRTEEN,
  WHITE,
} from '../../../common/AppText';
import {TouchableOpacityView} from '../../../common/TouchableOpacityView';
import NavigationService from '../../../navigation/NavigationService';
import {LEADERBOARD} from '../../../navigation/routes';
import styles from './styles';
import {numberWithCommas} from '../../../helper/utility';
import {useSelector} from 'react-redux';
import {colors} from '../../../theme/color';
const MyContestList = ({item}) => {
  // console.log(JSON.stringify(item),'=====')
  const matchDetails = useSelector(state => state?.match?.contestData);
  const myContest = useSelector(state => state?.match?.myContest);
  const percentage =
    (item?.contest_details?.joined / (item?.data?.Contestsize || 0)) * 100;
  const onNavigate = () => {
    NavigationService.navigate(LEADERBOARD, {
      details: {
        winning_amount: item?.contest_details?.winning_amount,
        JoinWithMULT: item?.data?.JoinWithMULT,
        EnteryFee: item?.data?.EnteryFee,
        Contestsize: item?.data?.Contestsize,
        joined: item?.contest_details?.joined,
        contest_category_id: item?.contest_category_id,
      },
      firstTeamName: matchDetails?.TeamA,
      secondTeamName: matchDetails?.TeamB,
      progressBarWidth: percentage,
      matchDetails: matchDetails,
    });
  };
  let teamArray = Array(Number(item?.joined_with ?? 0)).fill(0);
  useEffect(()=>{
console.log('hellooo');
  },[item])
  return (
    <TouchableOpacityView
      style={[
        styles.container,
        {
          height: matchDetails?.Status === 'Scheduled' ? 124 : 98,
        },
      ]}
      onPress={onNavigate}>
      <View onPress={onNavigate} style={styles.topContainer}>
        <View style={[styles.top]}>
          <AppText type={TEN} color={BLACKOPACITY}>
            PRIZE POOL
          </AppText>
          {item?.JoinWithMULT && (
            <AppText type={TEN} color={BLACKOPACITY}>
              Multiple Entries
            </AppText>
          )}
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <AppText style={{
            marginTop:2
          }} type={FIFTEEN} weight={POPPINS_BOLD}>
            ₹{numberWithCommas(item?.contest_details?.winning_amount)}
          </AppText>
          <AppText
            color={BLACKOPACITY}
            type={TEN}
            style={{
              marginLeft: 10,
              flex: 1,
            }}>
            60% Winners l 1st ₹1,100
          </AppText>
          <View style={styles.bedge}>
            <AppText
              style={{
                marginTop: 2,
              }}
              color={WHITE}
              weight={POPPINS_MEDIUM}
              type={THIRTEEN}>
              ₹{item?.data?.EnteryFee}
            </AppText>
          </View>
        </View>
        {matchDetails?.Status === 'Scheduled' && (
          <>
            <View style={styles.progressBar}>
              <LinearGradient
                style={{
                  width: `${percentage}%`,
                  height: '100%',
                  borderRadius: 4,
                }}
                start={{x: 0, y: 0}}
                colors={[
                  colors.borderBackColor,
                  colors.linerProgress,
                ]}></LinearGradient>
            </View>
            <View style={styles.flex}>
              <AppText color={BLACKOPACITY} type={TEN}>
                {numberWithCommas(item?.data?.Contestsize)} spots
              </AppText>
              <AppText
                style={{color: '#37CC4C', fontSize: 10}}
                type={POPPINS_MEDIUM}>
                {item?.data?.Contestsize - (item?.contest_details?.joined || 0)}{' '}
                left
              </AppText>
            </View>
          </>
        )}
      </View>
      <View
        style={[
          styles.bottomContainer,
          {marginTop: matchDetails?.Status === 'Scheduled' ? 5 : null},
        ]}>
        <AppText color={BLACKOPACITY} type={TEN} weight={POPPINS}>
          JOINED WITH {item?.joined_with} TEAM
        </AppText>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {teamArray?.map((item, index) => {
            return (
              <View style={styles.grayContainer}>
                <AppText style={{marginTop: 1}} color={WHITE} type={TEN}>
                  T{index + 1}
                </AppText>
              </View>
            );
          })}
        </View>
      </View>
    </TouchableOpacityView>
  );
};
export default MyContestList;
