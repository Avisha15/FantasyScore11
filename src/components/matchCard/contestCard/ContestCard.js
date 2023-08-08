import React, {useRef, useState} from 'react';
import {View, Pressable, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {
  AppText,
  BLACKOPACITY,
  FIFTEEN,
  GREEN,
  POPPINS_BOLD,
  POPPINS_MEDIUM,
  TEN,
  THIRTEEN,
} from '../../../common/AppText';
import SelectTeam from '../../selectTeam/SelectTeam';
import {GLORY, GURANTEE, SINGLE, WINNER, m} from '../../../helper/image';
import NavigationService from '../../../navigation/NavigationService';
import {LEADERBOARD, SELECT_PLAYER} from '../../../navigation/routes';
import styles from './styles';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {
  getTab,
  setIsContestEntry,
  setSelectedMatch,
} from '../../../slices/matchSlice';
import {numberWithCommas} from '../../../helper/utility';
import Confirmation from '../../../common/Confirmation';
import {NewColor, colors} from '../../../theme/color';

const ContestCard = ({details, totalTeamCount}) => {
  const dispatch = useDispatch();
  const selectTeam = useRef();
  const myTeam = useSelector(state => state?.match?.myTeams);
  const percentage = (details?.joined / (details?.Contestsize || 0)) * 100;
  const matchDetails = useSelector(state => state?.match?.contestData);
  const [isAdd, setIsAdd] = useState(false);
  const onClickContest = () => {
    NavigationService.navigate(LEADERBOARD, {
      details: {
        ...details,
        match_contest_category_id: details?.inner_data_id,
      },
      firstTeamName: matchDetails?.TeamA,
      secondTeamName: matchDetails?.TeamB,
      progressBarWidth: percentage,
      matchDetails: matchDetails,
      totalTeamCount: totalTeamCount,
    });
  };
  const onJoinContest = async () => {
    if (totalTeamCount == 0) {
      dispatch(setSelectedMatch({...details}));
      dispatch(setIsContestEntry(true));
      dispatch(getTab(''));
      NavigationService.navigate(SELECT_PLAYER, matchDetails);
    } else if (totalTeamCount == 1) {
      dispatch(setSelectedMatch({...details}));
      setIsAdd(true);
    } else if (totalTeamCount > 1) {
      dispatch(setSelectedMatch({...details}));
      selectTeam?.current?.open();
    }
  };

  return (
    <Pressable style={styles.container} onPress={onClickContest}>
      <View style={styles.topContainer}>
        <View style={styles.top}>
          <AppText type={TEN} color={BLACKOPACITY}>
            PRIZE POOL
          </AppText>
          {details?.JoinWithMULT && (
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
          }}>
          <AppText type={FIFTEEN} weight={POPPINS_BOLD}>
            ₹{numberWithCommas(details?.winning_amount)}
          </AppText>
          <AppText
            type={TEN}
            color={BLACKOPACITY}
            style={{
              marginLeft: 10,
              flex: 1,
            }}>
            60% Winners l 1st ₹1,100
          </AppText>
          {/* {!matchDetails?.isFromMyMatch && ( */}
          <Pressable style={styles.bedge} onPress={onJoinContest}>
            <AppText
              numberOfLines={1}
              style={{color: 'white', marginHorizontal: 5, marginTop: 2}}
              weight={POPPINS_MEDIUM}
              type={THIRTEEN}>
              ₹{numberWithCommas(details?.EnteryFee)}
            </AppText>
          </Pressable>
          {/* )} */}
        </View>
        <View style={styles.progressBar}>
          <LinearGradient
            style={{width: `${percentage}%`, height: '100%', borderRadius: 4}}
            start={{x: 0, y: 0}}
            colors={[
              colors.borderBackColor,
              colors.linerProgress,
            ]}></LinearGradient>
        </View>
        <View style={styles.flex}>
          <AppText type={TEN} color={BLACKOPACITY}>
            {`${numberWithCommas(details?.Contestsize)} spots`}
          </AppText>
          <AppText type={TEN} color={GREEN}>
            {`${details?.Contestsize - (details?.joined || 0)} spots left`}
          </AppText>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.commonViewStyle}>
            <FastImage source={GLORY} style={styles.gloryIcon} />
            <AppText
              type={TEN}
              color={BLACKOPACITY}
              style={styles.commonTextStyle}>
              {details?.EnteryType !== 'Paid' ||
              details?.Rankdata[0]?.Price == undefined
                ? 'Glory awaits!'
                : `₹${Math.round(details?.Rankdata[0]?.Price)}`}
            </AppText>
          </View>
          <View style={styles.commonViewStyle}>
            <FastImage source={WINNER} style={styles.gloryIcon} />
            <AppText
              type={TEN}
              color={BLACKOPACITY}
              style={styles.commonTextStyle}>
              {details?.UsableBonusPercantage
                ? details?.UsableBonusPercantage
                : 0}
              %
            </AppText>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FastImage
              source={details?.JoinWithMULT ? m : SINGLE}
              resizeMode="contain"
              style={styles.gloryIcon}
            />
            <AppText
              type={TEN}
              color={BLACKOPACITY}
              style={[styles.commonTextStyle, {marginLeft: 4}]}>
              {' '}
              {details?.JoinWithMULT ? 'Upto 7' : 'Single'}
            </AppText>
          </View>
        </View>
        {details?.ConfirmedWin && (
          <View style={styles.flex}>
            <FastImage source={GURANTEE} style={styles.gloryIcon} />
            <AppText
              type={TEN}
              color={BLACKOPACITY}
              style={styles.commonTextStyle}>
              Guaranteed
            </AppText>
          </View>
        )}
      </View>
      <RBSheet
        ref={selectTeam}
        closeOnDragDown={false}
        openDuration={100}
        height={Dimensions.get('window').height}
        customStyles={{
          container: {
            backgroundColor: NewColor.linerWhite,
          },
          draggableIcon: {
            backgroundColor: 'transparent',
            display: 'none',
          },
        }}>
        <SelectTeam
          contestDetails={details}
          matchDetails={matchDetails}
          onClose={() => selectTeam?.current?.close()}
          selectTeam={selectTeam}
        />
      </RBSheet>
      <Confirmation
        isModalVisible={isAdd}
        details={details}
        setIsModalVisible={setIsAdd}
        matchDetails={matchDetails}
        teamLength={false}
      />
    </Pressable>
  );
};

export default ContestCard;
