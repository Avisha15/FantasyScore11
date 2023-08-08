import {useRoute} from '@react-navigation/native';
import React, {useState, useRef, useEffect} from 'react';
import {View, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {AppSafeAreaView} from '../../common/AppSafeAreaView';
import {
  AppText,
  BLACKOPACITY,
  FIFTEEN,
  FORTEEN,
  GREEN,
  POPPINS_BOLD,
  POPPINS_MEDIUM,
  TEN,
  WHITE,
} from '../../common/AppText';
import {TouchableOpacityView} from '../../common/TouchableOpacityView';
import LeaderBoardList from '../../components/leaderBoardList/LeaderBoardList';
import Winnings from '../../components/winnings/Winnings';
import {GLORY, WINNER} from '../../helper/image';
import NavigationService from '../../navigation/NavigationService';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {SELECT_PLAYER} from '../../navigation/routes';
import {
  getTab,
  setIsContestEntry,
  setSelectedMatch,
} from '../../slices/matchSlice';
import CommonHeader from '../../components/matchCard/commonHeader/CommonHeader';
import {numberWithCommas, toastAlert} from '../../helper/utility';
import Confirmation from '../../common/Confirmation';
import {StatusBar} from 'native-base';
import CommonImageBackground from '../../common/commonImageBackground';
import {NewColor, colors} from '../../theme/color';
import {LIGHTBLUE} from '../../common/AppText';
import RBSheet from 'react-native-raw-bottom-sheet';
import SelectTeam from '../../components/selectTeam/SelectTeam';
import {universalPaddingHorizontal} from '../../theme/dimens';

const LeaderBoard = () => {
  const route = useRoute();
  const wsRef = useRef(null);
  const dispatch = useDispatch();
  const details = route?.params?.details ?? '';
  const totalTeamCount = route?.params?.totalTeamCount;
  const matchDetails = useSelector(state => state?.match?.contestData);
  const TABS = [
    {id: 1, title: 'Winnings'},
    {id: 1, title: 'Leaderboard'},
  ];
  const [activeTab, setActiveTab] = useState(1);
  const [isAdd, setIsAdd] = useState(false);
  const [time, setTime] = useState('');
  const [leaderBoards, setLeaderBoards] = useState([]);
  console.log(route?.params?.matchDetails?.Status,'route')

  const selectTeam = useRef();
  const onJoinContest = async () => {
    if (totalTeamCount === 0) {
      dispatch(setSelectedMatch({...details}));
      dispatch(setIsContestEntry(true));
      dispatch(getTab(''));
      NavigationService.navigate(SELECT_PLAYER, matchDetails);
    } else if (totalTeamCount === 1) {
      dispatch(setSelectedMatch({...details}));
      setIsAdd(true);
    } else if (totalTeamCount > 1) {
      selectTeam?.current?.open();
    }
  };
  let getScore = () => {
    let url = `ws://65.0.134.70:3000/leader-board?limit=10&skip=0&matchid=${route?.params?.matchDetails?.MatchId}&contest_category_id=${route?.params?.details?.contest_category_id}`;
    try {
      if (
        route?.params?.matchDetails?.MatchId &&
        route?.params?.details?.contest_category_id
      ) {
        wsRef.current = new WebSocket(url);
        wsRef.current.onopen = () => {};
        wsRef.current.onclose = e => {
          wsRef.current = new WebSocket(url);
        };
        wsRef.current.onerror = e => {
          wsRef.current = new WebSocket(url);
        };
        return () => {
          wsRef.current.close();
        };
      }
    } catch (error) {
      console.log(error);
    } finally {
      // console.log('===');
    }
  };
  useEffect(() => {
    getScore();
  });
  useEffect(() => {
    if (!wsRef.current) return;
    wsRef.current.onmessage = e => {
      const parseData = JSON.parse(e?.data);

      setLeaderBoards(parseData?.data);
    };
  }, []);
  const filteredArray = leaderBoards.filter(item => !Array.isArray(item));
  const renderTop = () => {
    return (
      <View style={styles.container}>
        <CommonHeader
          allContest={true}
          style={{
            marginBottom: 0,
          }}
          walletIco={true}
          details={route?.params?.matchDetails}
          showPopup={() => sheet.current?.open()}
          activeTab={2}
          setActiveTab={e => setActiveTab(e)}
          completeMatch={route?.params?.matchDetails?.Status == 'Completed' ? true: false}
        />
        <>
          {matchDetails?.Status == 'Live' ||
          matchDetails?.Status == 'Completed' ? (
            <View
              style={{
                paddingHorizontal: universalPaddingHorizontal,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: -10,
                alignItems: 'center',
              }}>
              <View style={{flex: 1, }}>
                <AppText weight={POPPINS_MEDIUM}>
                  {matchDetails?.TeamsShortNames[0]}
                </AppText>
                <AppText weight={POPPINS_MEDIUM}>
                  {filteredArray[0]?.match_details?.teama?.scores_full
                    ? `${
                        filteredArray[0]?.match_details?.teama?.scores_full.split(
                          ' & ',
                        )[0]
                      }${'\n'}${
                        filteredArray[0]?.match_details?.teama?.scores_full.split(
                          ' & ',
                        )[1]
                          ? filteredArray[0]?.match_details?.teama?.scores_full.split(
                              ' & ',
                            )[1]
                          : ''
                      }`
                    : 'Yet to bat'}
                </AppText>
              </View>
              <View style={{flex:1, alignItems:'center', }} >
                <View
                  style={{
                    paddingHorizontal: 10,
                    // paddingVertical:5,
                    height: 31,
                    alignItems: 'center',
                    backgroundColor: colors.green,
                    justifyContent: 'center',
                    width: 100,
                    borderRadius: 5,
                    marginRight: filteredArray[0]?.match_details?.teamb
                      ?.scores_full
                      ? 0
                      : 5,
                  }}>
                  <AppText
                    style={{textTransform: 'capitalize', marginTop: 2}}
                    type={FORTEEN}
                    weight={POPPINS_MEDIUM}
                    color={WHITE}>
                    {matchDetails?.Status}
                  </AppText>
                </View>
              </View>
              <View
                style={{
                  alignItems: 'flex-end',
                  flex: 1,
                }}>
                <AppText weight={POPPINS_MEDIUM}>
                  {matchDetails?.TeamsShortNames[1]}
                </AppText>
                <AppText style={{textAlign: 'right'}} weight={POPPINS_MEDIUM}>
                  {filteredArray[0]?.match_details?.teamb?.scores_full
                    ? `${
                        filteredArray[0]?.match_details?.teamb?.scores_full.split(
                          ' & ',
                        )[0]
                      }${'\n'}${
                        filteredArray[0]?.match_details?.teamb?.scores_full.split(
                          ' & ',
                        )[1]
                          ? filteredArray[0]?.match_details?.teamb?.scores_full.split(
                              ' & ',
                            )[1]
                          : ''
                      }`
                    : 'Yet to bat'}
                </AppText>
              </View>
            </View>
          ) : (
            <>
              <View style={styles.contestDetails}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <AppText type={TEN} color={BLACKOPACITY}>
                    PRIZE POOL
                  </AppText>
                  {route?.params?.details?.JoinWithMULT && (
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
                    marginVertical: 6,
                  }}>
                  <AppText type={FIFTEEN} weight={POPPINS_BOLD}>
                    ₹{route?.params?.details?.winning_amount}
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
                </View>
                <View style={styles.progressBar}>
                  <LinearGradient
                    style={{
                      width: `${route?.params?.progressBarWidth}%`,
                      height: '100%',
                      borderRadius: 4,
                    }}
                    start={{x: 0, y: 0}}
                    colors={[
                      colors.borderBackColor,
                      colors.linerProgress,
                    ]}></LinearGradient>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 6,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <AppText color={BLACKOPACITY} type={TEN}>
                    {route?.params?.details?.Contestsize} spots
                  </AppText>
                  <AppText type={TEN} color={GREEN}>
                    {`${
                      route?.params?.details?.Contestsize -
                      (route?.params?.details?.joined || 0)
                    } spots left`}
                  </AppText>
                </View>
              </View>
              <View style={styles.bottomContainer}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={styles.commonViewStyle}>
                    <FastImage source={GLORY} style={styles.gloryIcon} />
                    <AppText
                      color={BLACKOPACITY}
                      type={TEN}
                      style={styles.commonTextStyle}>
                      {details?.EnteryType !== 'Paid'
                        ? 'Glory awaits!'
                        : `₹${numberWithCommas(details?.Rankdata[0]?.Price)}`}
                    </AppText>
                  </View>
                  <View style={styles.commonViewStyle}>
                    <FastImage source={WINNER} style={styles.gloryIcon} />
                    <AppText
                      color={BLACKOPACITY}
                      type={TEN}
                      style={styles.commonTextStyle}>
                      {details?.UsableBonusPercantage
                        ? details?.UsableBonusPercantage
                        : 0}
                      %
                    </AppText>
                  </View>
                  {route?.params?.details?.JoinWithMULT && (
                    <AppText color={BLACKOPACITY} type={TEN}>
                      Multiple Entries
                    </AppText>
                  )}
                </View>
              </View>
              <TouchableOpacityView
                onPress={onJoinContest}
                style={styles.bedge}>
                <AppText
                  style={{marginTop: 2}}
                  color={WHITE}
                  weight={POPPINS_MEDIUM}
                  type={FORTEEN}>
                  Join ₹{route?.params?.details?.EnteryFee}
                </AppText>
              </TouchableOpacityView>
            </>
          )}
        </>
      </View>
    );
  };
  const renderTabs = () => {
    return (
      <View style={styles.container2}>
        {TABS?.map((item, index) => {
          return index + 1 == activeTab ? (
            <View
              style={{
                flexDirection: 'column',
                width: '33%',
                height: 38,
                justifyContent: 'space-evenly',
                padding: 5,
                alignItems: 'center',
              }}>
              <AppText weight={POPPINS_MEDIUM} type={FORTEEN} color={LIGHTBLUE}>
                {item?.title}
              </AppText>
              <LinearGradient
                style={{height: 2, width: 102}}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#5389C4', '#7F3291']}></LinearGradient>
            </View>
          ) : (
            <TouchableOpacityView
              style={styles.tabs}
              onPress={() =>
                matchDetails?.Status !== 'Live'
                  ? matchDetails?.Status == 'Completed'
                    ? setActiveTab(index + 1)
                    : toastAlert.showToastError('Your Match is not live')
                  : setActiveTab(index + 1)
              }>
              <AppText
                weight={POPPINS_MEDIUM}
                type={FORTEEN}
                color={BLACKOPACITY}>
                {item?.title}
              </AppText>
            </TouchableOpacityView>
          );
        })}
      </View>
    );
  };
  const renderMain = () => {
    return activeTab == 1 ? (
      <Winnings
        getScore={getScore()}
        id={route?.params?.details?.contest_category_id}
      />
    ) : (
      <LeaderBoardList
        matchId={route?.params?.matchDetails?.MatchId}
        id={route?.params?.details?.contest_category_id}
      />
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
        <View>
          {renderTop()}
          {renderTabs()}
          {renderMain()}
        </View>
      </CommonImageBackground>
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
    </AppSafeAreaView>
  );
};

export default LeaderBoard;
