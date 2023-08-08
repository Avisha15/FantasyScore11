import React, {useEffect, useState, useRef} from 'react';
import {View, Pressable} from 'react-native';
import styles from './styles';
import {notified} from '../../helper/image';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import {
  AppText,
  GREEN,
  POPPINS_BOLD,
  POPPINS_MEDIUM,
  TEN,
} from '../../common/AppText';
import NavigationService from '../../navigation/NavigationService';
import {MY_CONTEST} from '../../navigation/routes';
import {toastAlert} from '../../helper/utility';
import {setContestData} from '../../slices/matchSlice';
import {useDispatch} from 'react-redux';
import {TouchableOpacityView} from '../../common/TouchableOpacityView';
import RBSheet from 'react-native-raw-bottom-sheet';
import MatchRemainder from './matchRemainder/MatchRemainder';
import {colors} from '../../theme/color';
import {flexOne} from '../../theme/dimens';
import {LiveTime} from '../../common/LiveTime';

const MatchCard = ({
  details,
  isFromMyMatch = false,
  tab = null,
  isHome,
  myMatches,
  completedmatch = true,
}) => {
  const dispatch = useDispatch();
  const sheet = useRef();
  let isMatchToday = moment().isSame(details?.StartDateTime, 'day');
  const [contestDetails, setContestDetails] = useState(null);
  useEffect(() => {
    const contest = details?.contest_details[0]?.data?.reduce(
      (prev, current) => {
        return prev.winning_amount < current.winning_amount ? prev : current;
      },
    );
    setContestDetails(contest);
  }, []);
  const onNavigateContest = () => {
    if (details?.Status === 'Completed') {
      dispatch(setContestData({...details, isFromMyMatch, tab, isHome}));
      NavigationService.navigate(MY_CONTEST, {isFromMyMatch: true});
    } else if (details?.contest_details?.length == 0) {
      return toastAlert.showToastError('There Are No Contest For This Match');
    } else {
      dispatch(setContestData({...details, isFromMyMatch, tab, isHome}));
      NavigationService.navigate(MY_CONTEST, {isFromMyMatch: false});
    }
  };

  return (
    <Pressable
      style={
        contestDetails &&
        details?.Status !== 'Live' &&
        details?.Status !== 'Completed'
          ? styles.cardContainer
          : styles.cardContainerTwo
      }
      onPress={onNavigateContest}>
      <View style={styles.matchImage}>
        <AppText style={styles.seriesNametext}>{details?.SeriesName}</AppText>
        <TouchableOpacityView
          onPress={() => sheet.current?.open()}
          activeOpacity={0.8}>
          <FastImage
            style={styles.notifiedIcon}
            tintColor={colors.borderBackColor}
            resizeMode="contain"
            source={notified}
          />
        </TouchableOpacityView>

        <View style={styles.teamContainer}>
          <View
            style={{flex: flexOne, flexDirection: 'row', alignItems: 'center'}}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <AppText weight={POPPINS_BOLD} type={TEN} numberOfLines={1}>
                {details?.TeamA.split(' ')[0]}
              </AppText>
              <FastImage
                source={{uri: details?.TeamAlogo}}
                style={styles.teamImage}
                resizeMode="contain"
              />
            </View>
            <AppText
              style={{
                marginLeft: 5,
                marginTop: 20,
              }}
              weight={POPPINS_MEDIUM}>
              {details?.TeamsShortNames[0]}
            </AppText>
          </View>
          <View style={styles.timeContainer}>
            {details?.Status === 'Completed' ? (
              <>
                <View
                  style={[
                    styles.completeView,
                    {marginTop: myMatches ? 15 : 25},
                  ]}>
                  <View style={styles.dotView} />
                  <AppText
                    style={{marginTop: 2}}
                    weight={POPPINS_MEDIUM}
                    type={TEN}
                    color={GREEN}>
                    {details?.Status}
                  </AppText>
                </View>
                <AppText
                  style={{
                    flex: flexOne,
                  }}
                  numberOfLines={1}
                  type={TEN}
                  weight={POPPINS_MEDIUM}>
                  {moment(details?.StartDateTime).format('MMMM Do, h:mm a')}
                </AppText>
              </>
            ) : (
              <>
                {details?.Status == 'Live' ? (
                  <></>
                ) : (
                  <LiveTime type={TEN} top={true} details={details} />
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
                        },
                      ]}>
                      {details?.Status}
                    </AppText>
                  </>
                )}
              </>
            )}
          </View>
          <View style={{alignItems: 'flex-end', flex: 1}}>
            <View
              style={{
                flex: flexOne,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <AppText
                style={{
                  marginRight: 5,
                  marginTop: 20,
                }}
                numberOfLines={1}
                weight={POPPINS_MEDIUM}
                type={TEN}>
                {details?.TeamB.split(' ')[0]}
              </AppText>
              {/* <View style={styles.teamShortNameTextTwo}> */}
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <AppText
                  style={{
                    marginRight: 5,
                  }}
                  weight={POPPINS_BOLD}>
                  {details?.TeamsShortNames[1]}
                </AppText>
                <FastImage
                  source={{uri: details?.TeamBlogo}}
                  style={styles.teamImage}
                  resizeMode="contain"
                />
              </View>
              {/* </View> */}
            </View>
          </View>
        </View>
      </View>
      {myMatches ? (
        <View style={styles.bottom}>
          <View style={styles.teamConunt}>
            <View style={styles.teamConunt}>
              <AppText weight={POPPINS_MEDIUM}>{details?.countTeam} </AppText>
              <AppText weight={POPPINS_MEDIUM}>Team</AppText>
            </View>
            <View
              style={[
                styles.teamConunt,
                {
                  marginLeft: 20,
                },
              ]}>
              <AppText weight={POPPINS_MEDIUM}>
                {details?.countContest}{' '}
              </AppText>
              <AppText weight={POPPINS_MEDIUM}>Contests</AppText>
            </View>
          </View>
        </View>
      ) : (
        <>
          {contestDetails &&
            details?.Status !== 'Live' &&
            details?.Status !== 'Completed' && (
              <View style={styles.bottom}>
                {contestDetails?.contest_type && (
                  <View style={styles.contestName}>
                    <AppText
                      style={{color: colors.green, fontSize: 9}}
                      weight={POPPINS_MEDIUM}>
                      {contestDetails?.contest_type}
                    </AppText>
                  </View>
                )}
                <AppText style={styles.textStyle}>
                  ₹{contestDetails?.winning_amount}
                </AppText>
                {details?.PreSquad && (
                  <View style={styles.lineUpOut}>
                    <View style={styles.greenCircle} />
                    <AppText style={{marginTop: 3}} color={GREEN} type={TEN}>
                      LINEUP OUT
                    </AppText>
                  </View>
                )}
              </View>
            )}
        </>
      )}
      <RBSheet
        ref={sheet}
        closeOnDragDown={true}
        height={201}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          draggableIcon: {
            backgroundColor: 'transparent',
            display: 'none',
          },
        }}>
        <MatchRemainder
          data={details}
          onClose={() => sheet?.current?.close()}
        />
      </RBSheet>
    </Pressable>
  );
};

export default MatchCard;
