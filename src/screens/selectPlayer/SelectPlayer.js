import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, Pressable, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {AppSafeAreaView} from '../../common/AppSafeAreaView';
import {
  AppText,
  BLACK,
  BLACKOPACITY,
  ELEVEN,
  FORTEEN,
  LIGHTBLUE,
  POPPINS,
  POPPINS_BOLD,
  POPPINS_MEDIUM,
  TEN,
} from '../../common/AppText';
import {TouchableOpacityView} from '../../common/TouchableOpacityView';
import PlayerRoleBadge from '../../components/playerRoleBedge/PlayerRoleBedge';
import {
  BAT,
  BOWL,
  GLOVE,
  GREEN_PLUS_ICON,
  LEFT_ARROW,
  PANT,
  RED_MINUS,
  StopIcon,
  all_rounder,
  all_rounderIcon,
  batsmanIcon,
  bowlerIcon,
  wicket_keeper,
  wicket_keeperIcon,
} from '../../helper/image';
import {toastAlert} from '../../helper/utility';
import NavigationService from '../../navigation/NavigationService';
import {PLAYER_PREVIEW, SELECT_CAPTAIN} from '../../navigation/routes';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {getAllPlayerList, getPlayerDetail} from '../../slices/matchSlice';
import PlayerBedge from '../../components/playerBedge/PlayerBedge';
import {StatusBar} from 'native-base';
import CommonImageBackground from '../../common/commonImageBackground';
import SecondaryButton from '../../common/secondaryButton';
import PrimaryButton from '../../common/primaryButton';
import PlayerDetailModal from '../../common/PlayerDetailModal';
import moment from 'moment';
import {NewColor, colors} from '../../theme/color';
import {LiveTime} from '../../common/LiveTime';

export const data = [
  {
    imageSource: GLOVE,
  },
  {
    imageSource: BAT,
  },
  {
    imageSource: BAT,
  },
  {
    imageSource: BAT,
  },
  {
    imageSource: BOWL,
  },
  {
    imageSource: BOWL,
  },
  {
    imageSource: BOWL,
  },
  {
    imageSource: BOWL,
  },
  {
    imageSource: BOWL,
  },
  {
    imageSource: BOWL,
  },
  {
    imageSource: BOWL,
  },
];
const SelectPlayer = () => {
  const dispatch = useDispatch();
  const contestData = useSelector(state => state?.match?.contestData);
  
  const {_id, TeamA, TeamB, TeamAlogo, TeamsShortNames, TeamBlogo} =
    contestData ?? '';
  const allPlayers = useSelector(state => state?.match?.allPlayers);
  const getPlayerTab = useSelector(state => state?.match?.getPlayerTab);
  const route = useRoute();
  const [activeTab, setActiveTab] = useState('WK');
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [availableCredits, setAvailableCredits] = useState(100);
  const [Tabs, setTabs] = useState(['WK', 'BAT', 'AR ', 'BOWL']);
  const [random, setRandom] = useState(10);
  const [wicketKiper, setWicketKiper] = useState([]);
  const [batsman, setBatsman] = useState([]);
  const [allRounder, setAllRounder] = useState([]);
  const [bowler, setBowler] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPlayerDetails, setSelectedPlayersDetails] = useState([]);
  const [playerTwo, setPlayerTwo] = useState(
    route?.params?.playerTwo ? [...route?.params?.playerTwo] : [],
  );
  const [player, setPlayer] = useState(
    route?.params?.player ? [...route?.params?.player] : [],
  );
  const [saveTeam, setSaveTeam] = useState({});
  useEffect(() => {
    dispatch(getAllPlayerList(_id));
  }, []);
  useEffect(() => {
    setActiveTab(
      getPlayerTab == 'WICKET KEEPERS'
        ? 'WK'
        : getPlayerTab == 'BATSMEN'
        ? 'BAT'
        : getPlayerTab == 'ALL ROUNDERS'
        ? 'AR '
        : getPlayerTab == 'BOWLERS'
        ? 'BOWL'
        : 'WK',
    );
  }, [getPlayerTab]);
  useEffect(() => {
    if (route?.params?.isEditMode || route?.params?.isCloneMode) {
      const pid = route?.params?.selectedPlayers?.map(player => player?.pid);
      let usedCredit = 0;
      route?.params?.selectedPlayers?.forEach(
        player => (usedCredit = usedCredit + player?.fantasy_player_rating),
      );

      setAvailableCredits(Number(100) - Number(usedCredit));
      setSelectedPlayers(pid);
      setSelectedPlayersDetails(route?.params?.selectedPlayers);
    }
  }, []);
  useEffect(() => {
    let wicket_keepers_list = allPlayers?.filter(item => {
      return item?.playing_role === 'wk';
    });
    let bowlers_list = allPlayers?.filter(item => {
      return item?.playing_role === 'bowl';
    });
    let batsman_list = allPlayers?.filter(item => {
      return item?.playing_role === 'bat';
    });
    let all_rounder_list = allPlayers?.filter(item => {
      return item?.playing_role === 'all';
    });
    let selected_wicket_keepers_list = wicket_keepers_list?.filter(item => {
      return selectedPlayers?.includes(item?.pid);
    });
    let selected_bowlers_list = bowlers_list?.filter(item => {
      return selectedPlayers?.includes(item?.pid);
    });
    let selected_batsman_list = batsman_list?.filter(item => {
      return selectedPlayers?.includes(item?.pid);
    });
    let selected_all_rounder_list = all_rounder_list?.filter(item => {
      return selectedPlayers?.includes(item?.pid);
    });
    setBatsman(new Array(selected_batsman_list?.length).fill(''));
    setWicketKiper(new Array(selected_wicket_keepers_list?.length).fill(''));
    setBowler(new Array(selected_bowlers_list?.length).fill(''));
    setAllRounder(new Array(selected_all_rounder_list?.length).fill(''));

    setTabs([
      `WK (${selected_wicket_keepers_list?.length})`,
      `BAT (${selected_batsman_list?.length})`,
      `AR (${selected_all_rounder_list?.length})`,
      `BOWL (${selected_bowlers_list?.length})`,
    ]);

    setRandom(Math.random());
  }, [selectedPlayers.length, selectedPlayers, allPlayers]);
  const getPlayersData = () => {
    if (activeTab.includes('BAT')) {
      return allPlayers.filter(player => player?.playing_role == 'bat');
    } else if (activeTab.includes('BOWL')) {
      return allPlayers.filter(player => player?.playing_role == 'bowl');
    } else if (activeTab.includes('WK')) {
      return allPlayers.filter(player => player?.playing_role == 'wk');
    } else if (activeTab.includes('AR')) {
      return allPlayers.filter(player => player?.playing_role == 'all');
    }
  };

  const addPlayerInTeam = items => {
    let wicket_keepers_list = allPlayers?.filter(item => {
      return item?.playing_role === 'wk';
    });
    let bowlers_list = allPlayers?.filter(item => {
      return item?.playing_role === 'bowl';
    });
    let batsman_list = allPlayers?.filter(item => {
      return item?.playing_role === 'bat';
    });
    let all_rounder_list = allPlayers?.filter(item => {
      return item?.playing_role === 'all';
    });
    let selected_wicket_keepers_list = wicket_keepers_list?.filter(item => {
      return selectedPlayers?.includes(item?.pid);
    });
    let selected_bowlers_list = bowlers_list?.filter(item => {
      return selectedPlayers?.includes(item?.pid);
    });
    let selected_batsman_list = batsman_list?.filter(item => {
      return selectedPlayers?.includes(item?.pid);
    });
    let selected_all_rounder_list = all_rounder_list?.filter(item => {
      return selectedPlayers?.includes(item?.pid);
    });
    if (
      selectedPlayers?.length === 11 &&
      selected_wicket_keepers_list?.length > 0 &&
      selected_bowlers_list?.length > 0 &&
      selected_batsman_list?.length > 0
    ) {
      return toastAlert.showToastError('You Have Selected Maximum Players');
    }
    if (items?.fantasy_player_rating > availableCredits) {
      return toastAlert.showToastError('Available Credit is Low');
    }

    //wicket keeper condition
    if (
      selectedPlayers?.length >= 9 &&
      selected_wicket_keepers_list.length !== 0 &&
      selected_batsman_list.length === 0 &&
      activeTab.includes('WK') &&
      !activeTab.includes('BAT')
    ) {
      return toastAlert.showToastError('Please Select at least one Bats Man ');
    }
    if (
      selectedPlayers?.length >= 9 &&
      selected_wicket_keepers_list.length !== 0 &&
      selected_all_rounder_list.length === 0 &&
      activeTab.includes('WK') &&
      !activeTab.includes('AR')
    ) {
      return toastAlert.showToastError(
        'Please Select at least one All Rounder',
      );
    }
    if (
      selectedPlayers?.length >= 9 &&
      selected_wicket_keepers_list.length !== 0 &&
      selected_bowlers_list.length === 0 &&
      activeTab.includes('WK') &&
      !activeTab.includes('BOWL')
    ) {
      return toastAlert.showToastError('Please Select at least one Bowler');
    }
    //batsman condition
    if (
      selectedPlayers?.length >= 9 &&
      selected_batsman_list.length !== 0 &&
      selected_wicket_keepers_list.length === 0 &&
      activeTab.includes('BAT') &&
      !activeTab.includes('WK')
    ) {
      return toastAlert.showToastError(
        'Please Select at least one Wicker Keeper',
      );
    }
    if (
      selectedPlayers?.length >= 9 &&
      selected_batsman_list.length !== 0 &&
      selected_all_rounder_list.length === 0 &&
      activeTab.includes('BAT') &&
      !activeTab.includes('AR')
    ) {
      return toastAlert.showToastError(
        'Please Select at least one All Rounder',
      );
    }
    if (
      selectedPlayers?.length >= 9 &&
      selected_batsman_list.length !== 0 &&
      selected_bowlers_list.length === 0 &&
      activeTab.includes('BAT') &&
      !activeTab.includes('BOWL')
    ) {
      return toastAlert.showToastError('Please Select at least one Bowler');
    }
    //all rounder condition
    if (
      selectedPlayers?.length >= 9 &&
      selected_all_rounder_list.length !== 0 &&
      selected_wicket_keepers_list.length === 0 &&
      activeTab.includes('AR') &&
      !activeTab.includes('WK')
    ) {
      return toastAlert.showToastError(
        'Please Select at least one Wicket Keeper',
      );
    }
    if (
      selectedPlayers?.length >= 9 &&
      selected_all_rounder_list.length !== 0 &&
      selected_batsman_list.length === 0 &&
      activeTab.includes('AR') &&
      !activeTab.includes('BAT')
    ) {
      return toastAlert.showToastError('Please Select at least one Batsman');
    }

    if (
      selectedPlayers?.length >= 9 &&
      selected_all_rounder_list.length !== 0 &&
      selected_bowlers_list.length === 0 &&
      activeTab.includes('AR') &&
      !activeTab.includes('BOWL')
    ) {
      return toastAlert.showToastError('Please Select at least one Bowler');
    }

    //bowler condition

    if (
      selectedPlayers?.length >= 9 &&
      selected_bowlers_list.length !== 0 &&
      selected_wicket_keepers_list.length === 0 &&
      activeTab.includes('BOWL') &&
      !activeTab.includes('WK')
    ) {
      return toastAlert.showToastError(
        'Please Select at least one Wicket Keeper',
      );
    }
    if (
      selectedPlayers?.length >= 9 &&
      selected_bowlers_list.length !== 0 &&
      selected_batsman_list.length === 0 &&
      !activeTab.includes('BAT') &&
      activeTab.includes('BOWL')
    ) {
      return toastAlert.showToastError('Please Select at least one Batsman');
    }
    if (
      selectedPlayers?.length >= 9 &&
      selected_bowlers_list.length !== 0 &&
      selected_all_rounder_list.length === 0 &&
      !activeTab.includes('AR') &&
      activeTab.includes('BOWL')
    ) {
      return toastAlert.showToastError(
        'Please Select at least one All Rounder',
      );
    }
    if (
      player?.length == 7 &&
      items?.teamName == contestData?.TeamsShortNames[0]?.split(' ').join('')
    ) {
      return toastAlert.showToastError(
        `Please select player ${contestData?.TeamsShortNames[1]} team`,
      );
    }
    if (
      playerTwo?.length == 7 &&
      items?.teamName == contestData?.TeamsShortNames[1]?.split(' ').join('')
    ) {
      return toastAlert.showToastError(
        `Please select player ${contestData?.TeamsShortNames[0]} team`,
      );
    }
    if (
      items?.teamName == contestData?.TeamsShortNames[0]?.split(' ').join('')
    ) {
      let array = [...player];
      array?.push(items);
      setPlayer(array);
    } else {
      let array2 = [...playerTwo];
      array2?.push(items);
      setPlayerTwo(array2);
    }
    setSelectedPlayers([...selectedPlayers, items?.pid]);
    setSelectedPlayersDetails([...selectedPlayerDetails, items]);
    setAvailableCredits(availableCredits - items?.fantasy_player_rating);
  };

  const removePlayerFromTeam = item => {
    const filterTeam = selectedPlayers?.filter(data => data !== item?.pid);
    const filterTeamDetails = selectedPlayerDetails?.filter(
      player => player?.pid !== item?.pid,
    );
    const filterTeamDetails1 = player?.filter(
      player => player?.pid !== item?.pid,
    );
    const filterTeamDetails2 = playerTwo?.filter(
      player => player?.pid !== item?.pid,
    );
    setAvailableCredits(availableCredits + item?.fantasy_player_rating);
    setSelectedPlayers(filterTeam);
    setSelectedPlayersDetails(filterTeamDetails);
    setPlayer(filterTeamDetails1);
    setPlayerTwo(filterTeamDetails2);
  };
  const onContinueClick = () => {
    if (selectedPlayers?.length < 11) {
      return toastAlert.showToastError('Please Select 11 Players');
    }
    // const selctedPlayerDetails = [];
    // allPlayers.forEach(player => {
    //   if (selectedPlayers.includes(player?.pid)) {
    //     selctedPlayerDetails.push(player);
    //   }
    // });

    NavigationService.navigate(SELECT_CAPTAIN, {
      matchDetails: route?.params?.cloneTeam
        ? route?.params?.contestData
        : route?.params,
      selectedPlayers: selectedPlayers,
      selctedPlayerDetails: selectedPlayerDetails,
      isEditMode: route?.params?.isEditMode,
      team_id: route?.params?.team_id,
      team_name: route?.params?.team_name,
      captain: route?.params?.captain,
      viceCaptain: route?.params?.viceCaptain,
      isCloneMode: route?.params?.isCloneMode,
      availableCredits: availableCredits,
    });
  };

  const onPreview = () => {
    // const selctedPlayerDetails = [];

    // allPlayers.forEach(player => {
    //   if (selectedPlayers?.includes(player?.pid)) {
    //     selctedPlayerDetails.push(player);
    //   }
    // });
    NavigationService.navigate(PLAYER_PREVIEW, {
      oldData: contestData,
      selectedPlayers: selectedPlayers,
      availableCredits: availableCredits,
      selectedPlayerDetails: selectedPlayerDetails,
      player: player,
      playerTwo: playerTwo,
      myTeam: false,
    });
  };
  const onDetail = (id, item) => {
    dispatch(getPlayerDetail(id));
    setSaveTeam(item);
    setIsVisible(true);
  };

  const renderItem = ({item}) => {
    const playerIcon =
      item?.playing_role === 'wk'
        ? wicket_keeperIcon
        : item?.playing_role === 'bowl'
        ? bowlerIcon
        : item?.playing_role === 'bat'
        ? batsmanIcon
        : item?.playing_role === 'all'
        ? all_rounderIcon
        : null;
    return selectedPlayers?.includes(item?.pid) ? (
      <View
        style={[
          styles.selectPlayerContainer,
          {backgroundColor: colors.lightPink},
        ]}>
        <Pressable
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
          onPress={() => removePlayerFromTeam(item)}>
          <TouchableOpacityView
            onPress={() => onDetail(item?.pid, item)}
            style={{flex: 1, alignItems: 'flex-start'}}>
            <FastImage
              source={playerIcon}
              style={styles.playerImage}
              resizeMode="contain"
            />
          </TouchableOpacityView>
          <View style={{flex: 1.1, alignItems: 'flex-start', marginLeft: 15}}>
            <AppText color={BLACK} numberOfLines={1} style={styles.playerName}>
              {item?.short_name.split(' ')[0].charAt(0).toUpperCase() +
                ' ' +
                item?.short_name.split(' ')[1]}
            </AppText>
            <AppText type={TEN} numberOfLines={1} weight={POPPINS_MEDIUM}>
              {item?.teamName}
            </AppText>
          </View>
          <View style={{flex: 1, alignItems: 'center', marginEnd: 0}}>
            <AppText weight={POPPINS_MEDIUM} style={styles.points}>
              {item?.fantasy_player_rating}
            </AppText>
          </View>
          <View style={styles.creditBtnView}>
            <AppText weight={POPPINS_MEDIUM}>
              {item?.fantasy_player_rating}
            </AppText>

            <FastImage
              resizeMode="contain"
              source={RED_MINUS}
              style={styles.plusIcon}
            />
          </View>
        </Pressable>
      </View>
    ) : (
      <Pressable
        style={styles.selectPlayerContainer}
        onPress={() => addPlayerInTeam(item)}>
        <TouchableOpacityView
          onPress={() => onDetail(item?.pid)}
          style={{flex: 1, alignItems: 'flex-start'}}>
          <FastImage
            source={playerIcon}
            style={styles.playerImage}
            resizeMode="contain"
          />
        </TouchableOpacityView>
        <View style={{flex: 1.1, alignItems: 'flex-start', marginLeft: 15}}>
          <AppText
            weight={POPPINS_MEDIUM}
            numberOfLines={1}
            style={styles.playerName}>
            {item?.short_name.split(' ')[0].charAt(0).toUpperCase() +
              ' ' +
              item?.short_name.split(' ')[1]}
          </AppText>
          <AppText  numberOfLines={1} weight={POPPINS_MEDIUM} type={TEN}>
            {item?.teamName}
            {/* <Text style={{color: '#21B5F6'}}>DC</Text> Sel By 91.84%**/}
          </AppText>
        </View>
        <View style={{flex: 1, alignItems: 'center', marginEnd: 0}}>
          <AppText style={[styles.points,{marginLeft:-5}]}>{item?.fantasy_player_rating}</AppText>
        </View>
        <View style={styles.creditBtnView}>
          <AppText weight={POPPINS_MEDIUM}>
            {item?.fantasy_player_rating}
          </AppText>

          <FastImage
            resizeMode="contain"
            source={GREEN_PLUS_ICON}
            style={styles.plusIcon}
          />
        </View>
      </Pressable>
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
        <View style={styles.topContainer}>
          <TouchableOpacityView
          style={{padding:5}}
          onPress={() => NavigationService.goBack()}>
            <FastImage
              tintColor={colors.black}
              resizeMode="contain"
              source={LEFT_ARROW}
              style={styles.leftArrow}
            />
          </TouchableOpacityView>
          <View style={{marginLeft: 10}}>
            <AppText weight={POPPINS_MEDIUM} type={FORTEEN}>
              Create Team
            </AppText>
            <LiveTime
              view={true}
              color={BLACKOPACITY}
              top={true}
              details={contestData}
            />
          </View>
        </View>
        <View style={styles.card}>
          <AppText
            style={{
              textAlign: 'center',
              marginBottom: 5,
            }}
            type={TEN}
            weight={POPPINS_MEDIUM}>
            Max 7 player from a team
          </AppText>
          <View style={styles.midContainer}>
            <View style={{justifyContent: 'center'}}>
              <AppText type={TEN} weight={POPPINS_BOLD}>
                {`${selectedPlayers?.length}/11`}
              </AppText>
              <AppText type={TEN}>Selection</AppText>
            </View>
            <View style={styles.teamView}>
              <FastImage
                source={{
                  uri:
                    route?.params?.TeamAlogo == undefined
                      ? TeamAlogo
                      : route?.params?.TeamAlogo,
                }}
                style={styles.teamLogo}
                resizeMode="contain"
              />
              <View>
                <AppText style={{paddingLeft: 5}}>
                  {TeamsShortNames && TeamsShortNames?.length !== 0
                    ? TeamsShortNames[0]
                    : ''}
                </AppText>
                <AppText weight={POPPINS_MEDIUM} style={{paddingLeft: 5}}>
                  {player?.length}
                </AppText>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <AppText type={TEN} weight={POPPINS}>
                {/* VS */}
              </AppText>
            </View>
            <View style={styles.teamView}>
              <View>
                <AppText style={{paddingRight: 5}}>
                  {' '}
                  {TeamsShortNames &&
                    TeamsShortNames.length >= 1 &&
                    TeamsShortNames[1]}
                </AppText>
                <AppText
                  weight={POPPINS_MEDIUM}
                  style={{
                    paddingRight: 5,
                    alignSelf: 'flex-end',
                  }}>
                  {playerTwo?.length}
                </AppText>
              </View>
              <FastImage
                source={{
                  uri:
                    route?.params?.TeamBlogo == undefined
                      ? TeamBlogo
                      : route?.params?.TeamBlogo,
                }}
                style={styles.teamLogo}
                resizeMode="contain"
              />
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <AppText type={TEN} weight={POPPINS_BOLD}>
                {availableCredits}
              </AppText>
              <AppText type={TEN} weight={POPPINS_MEDIUM}>
                Credit
              </AppText>
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 8,
              }}>
              {new Array(11).fill('').map((_, index) => {
                return index + 1 > selectedPlayerDetails?.length ? (
                  <PlayerBedge />
                ) : (
                  <PlayerRoleBadge
                    data={selectedPlayerDetails}
                    playerDetails={index + 1}
                  />
                );
              })}
            </View>
            <FastImage
              style={{
                height: 24,
                width: 24,
              }}
              resizeMode="contain"
              tintColor={colors.gray}
              source={StopIcon}
            />
          </View>
        </View>
        <View style={{paddingHorizontal: 10, bottom: 10}}>
          <View style={styles.tabContainer}>
            {Tabs?.map(data => {
              let act = activeTab.split(' ');
              return data?.includes(act[0]) ? (
                <View
                  style={{
                    flexDirection: 'column',
                    width: '25%',
                    height: 38,
                    justifyContent: 'space-evenly',
                    padding: 5,
                    alignItems: 'center',
                  }}>
                  <AppText
                    color={LIGHTBLUE}
                    weight={POPPINS_MEDIUM}
                    type={FORTEEN}>
                    {' '}
                    {data}
                  </AppText>
                  <LinearGradient
                    style={{height: 2, width: 65}}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={[
                      colors.borderBlue,
                      colors.linerProgress,
                    ]}></LinearGradient>
                </View>
              ) : (
                <TouchableOpacityView
                  style={[styles.tab]}
                  onPress={() => {
                    setActiveTab(data);
                  }}>
                  <AppText weight={POPPINS_MEDIUM} type={FORTEEN}>
                    {data}
                  </AppText>
                </TouchableOpacityView>
              );
            })}
          </View>
        </View>
        <View style={styles.playerListingHead}>
          <AppText type={TEN} weight={POPPINS_MEDIUM}>
            INFO
          </AppText>
          <AppText type={TEN} weight={POPPINS_MEDIUM}>
            PLAYERS
          </AppText>
          <AppText type={TEN} weight={POPPINS_MEDIUM}>
            POINTS
          </AppText>
          <AppText type={TEN} weight={POPPINS_MEDIUM}>
            CREDITS
          </AppText>
        </View>
        <View style={{flex: 1}}>
          <FlatList data={getPlayersData()} renderItem={renderItem} />
        </View>
        <View style={styles.buttonContainer}>
          <SecondaryButton
            onPress={onPreview}
            buttonStyle={styles.buttonStyle}
            title={'TEAM PREVIEW'}
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
            onPress={onContinueClick}
            title="CONTINUE"
          />
        </View>
      </CommonImageBackground>
      <PlayerDetailModal
        isVisible={isVisible}
        setIsVisible={() => setIsVisible(false)}
        removePlayerFromTeam={item => removePlayerFromTeam(item)}
        addPlayerInTeam={item => addPlayerInTeam(item)}
        selectedPlayers={selectedPlayers}
      />
    </AppSafeAreaView>
  );
};

export default SelectPlayer;
