import {useFocusEffect, useRoute} from '@react-navigation/native';
import React, {useCallback, useRef, useState} from 'react';
import {View, StatusBar, FlatList, RefreshControl} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {AppSafeAreaView} from '../../common/AppSafeAreaView';
import {SpinnerSecond} from '../../common/SpinnerSecond';
import FilterSheet from '../../components/filterSheet/FilterSheet';
import CommonHeader from '../../components/matchCard/commonHeader/CommonHeader';
import MatchRemainder from '../../components/matchCard/matchRemainder/MatchRemainder';
import MyContestList from '../../components/matchCard/myContest/MyContestList';
import MyTeam from '../../components/matchCard/myTeam/MyTeam';
import NavigationService from '../../navigation/NavigationService';
import {CREATE_CONTEST, SELECT_PLAYER} from '../../navigation/routes';
import {
  getContestList,
  getMyJoinedContest,
  getMyTeam,
  getTab,
  setIsContestEntry,
} from '../../slices/matchSlice';
import styles from './styles';
import Contest from '../../components/matchCard/contest.js/Contest';
import {Screen, flexOne} from '../../theme/dimens';
import CommonImageBackground from '../../common/commonImageBackground';
import PrimaryButton from '../../common/primaryButton';
import SecondaryButton from '../../common/secondaryButton';
import {AppText, POPPINS_MEDIUM} from '../../common/AppText';
import {NewColor, colors} from '../../theme/color';

const MyContest = () => {
  const dispatch = useDispatch();
  const sheet = useRef();
  const route = useRoute();
  const filterSheet = useRef();
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  // const [isLoading, setIsLoading] = useState(false);
  const contestData = useSelector(state => state?.match?.contestData);
  const contestList = useSelector(state => state?.match?.contestList);
  const myTeam = useSelector(state => state?.match?.myTeams);
  const myContest = useSelector(state => state?.match?.myContest);
  const [filterdata, setFilterData] = useState([]);
  const [entry, setEntry] = useState([]);
  const [team, setTeam] = useState([]);
  const [prize, setPrize] = useState([]);
  const [contest, setContest] = useState([]);
  const [activeTab, setActiveTab] = useState(
    route?.params?.isFromMyMatch == true || contestData?.Status == 'Live'
      ? 2
      : 1,
  );
  const {_id, isFromMyMatch, match_id, isHome} = contestData ?? '';
  useFocusEffect(
    useCallback(() => {
      if (
        route?.params?.isFromMyMatch == true ||
        contestData?.Status == 'Live'
      ) {
        dispatch(getMyTeam(isHome ? match_id : _id));
        dispatch(getMyJoinedContest(isHome ? match_id : _id));
      } else {
        let outputObject = {};
        dispatch(getContestList(outputObject, isHome ? match_id : _id));
        dispatch(getMyTeam(isHome ? match_id : _id));
        dispatch(getMyJoinedContest(isHome ? match_id : _id));
      }
    }, []),
  );
  const renderItem = ({item}) => {
    return (
      <Contest
        details={item}
        totalTeamCount={contestList?.teams}
        matchId={isHome ? match_id : _id}
      />
    );
  };
  const renderMyTeam = ({item}) => {
    return <MyTeam item={item} />;
  };
  const renderMyContest = ({item}) => {
    return <MyContestList item={item} matchDetails={route?.params} />;
  };
  const EmptyComponent = () => {
    return activeTab === 2 ? (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <AppText
          weight={POPPINS_MEDIUM}
          style={{
            textAlign: 'center',
          }}>
          You haven't joined a contest yet!{'\n'}Find a contest to join and
          start winning
        </AppText>
        <PrimaryButton
          onPress={() => setActiveTab(1)}
          smallBtn={styles.joinButtonMyContest}
          title="JOIN A CONTEST"
        />
      </View>
    ) : (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <AppText
          style={{
            color: 'white',
            fontSize: 14,
            textAlign: 'center',
          }}>
          You haven't created a team yet!{'\n'}The first step to winning starts
          here.
        </AppText>
      </View>
    );
  };
  const onRefresh = type => {
    if (type == 'contest') {
      let outputObject = {};
      dispatch(getContestList(outputObject, isHome ? match_id : _id));
    }else if(type == 'my contest'){
      dispatch(getMyJoinedContest(isHome ? match_id : _id));
    }else{
      dispatch(getMyTeam(isHome ? match_id : _id));
    }
  };
  return (
    <AppSafeAreaView hidden={false}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        networkActivityIndicatorVisible={true}
      />
      <CommonImageBackground common>
        <CommonHeader
          details={route?.params}
          showFilter={() => filterSheet.current.open()}
          showPopup={() => sheet.current?.open()}
          activeTab={activeTab}
          setActiveTab={e => setActiveTab(e)}
          completeMatch={route?.params?.isFromMyMatch}
        />
        <View style={styles.mainContainer}>
          {activeTab == 1 && !route?.params?.isFromMyMatch ? (
            <FlatList
              data={contestList?.data}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              refreshControl={
                <RefreshControl
                  refreshing={false}
                  onRefresh={() => onRefresh('contest')}
                />
              }
              style={{
                width: '100%',
                alignSelf: 'center',
              }}
            />
          ) : (
            <></>
          )}
          {activeTab == 2 && (
            <View
              style={{
                flex: 1,
              }}>
              <FlatList
                data={myContest}
                showsVerticalScrollIndicator={false}
                renderItem={renderMyContest}
                ListEmptyComponent={<EmptyComponent />}
                keyExtractor={(item, index) => index.toString()}
                refreshControl={
                  <RefreshControl
                    refreshing={false}
                    onRefresh={() => onRefresh('my contest')}
                  />
                }
                style={{
                  width: '100%',
                  alignSelf: 'center',
                  flex: flexOne,
                }}
                contentContainerStyle={{
                  flexGrow: flexOne,
                }}
              />
            </View>
          )}
          {activeTab == 3 && (
            <View
              style={{
                flex: flexOne,
              }}>
              <FlatList
                data={myTeam}
                renderItem={renderMyTeam}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={<EmptyComponent />}
                refreshControl={
                  <RefreshControl
                    refreshing={false}
                    onRefresh={() => onRefresh('my team')}
                  />
                }
                contentContainerStyle={{
                  flexGrow: flexOne,
                }}
                style={{
                  width: '100%',
                  flex: flexOne,
                  alignSelf: 'center',
                }}
              />
            </View>
          )}
        </View>
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
            data={contestData}
            onClose={() => sheet?.current?.close()}
          />
        </RBSheet>
        <RBSheet
          ref={filterSheet}
          closeOnDragDown={false}
          height={Screen.Height * 0.75}
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
          <FilterSheet
            onClose={() => filterSheet?.current?.close()}
            filterdata={filterdata}
            setFilterData={setFilterData}
            entry={entry}
            setEntry={setEntry}
            team={team}
            setTeam={setTeam}
            prize={prize}
            setPrize={setPrize}
            contest={contest}
            setContest={setContest}
          />
        </RBSheet>
        {activeTab !== 2 &&
          !route?.params?.isFromMyMatch &&
          contestData?.Status !== 'Live' && (
            <View style={styles.buttonContainer}>
              <SecondaryButton
                onPress={() => NavigationService.navigate(CREATE_CONTEST)}
                buttonStyle={styles.buttonStyle}
                title={'CREATE CONTEST'}
                titleStyle={{color: colors.black, marginTop: -5}}
                btnStyle={{
                  backgroundColor: NewColor.linerWhite,
                  borderWidth: 2,
                  height: 45,
                  borderRadius: 10,
                }}
              />
              <PrimaryButton
                buttonStyle={styles.buttonStyle}
                onPress={() => {
                  dispatch(getTab(''));
                  NavigationService.navigate(SELECT_PLAYER, contestData);
                  dispatch(setIsContestEntry(false));
                }}
                title="CREATE TEAM"
              />
            </View>
          )}
        <SpinnerSecond loading={isLoading} />
      </CommonImageBackground>
    </AppSafeAreaView>
  );
};

export default MyContest;
