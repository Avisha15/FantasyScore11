import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, ImageBackground, Pressable, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  AppText,
  EIGHT,
  FORTEEN,
  POPPINS,
  POPPINS_BOLD,
  POPPINS_MEDIUM,
  POPPINS_SEMI_BOLD,
  TEN,
  TWELVE,
  WHITE,
} from '../../../common/AppText';
import {TouchableOpacityView} from '../../../common/TouchableOpacityView';
import {
  CAPTAIN,
  COPY,
  GRASS,
  PANT,
  PENCIL,
  SHARE,
  VICE_CAPTAIN,
} from '../../../helper/image';
import styles from './styles';
import {PLAYER_PREVIEW, SELECT_PLAYER} from '../../../navigation/routes';
import {useDispatch, useSelector} from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import SelectContest from '../selectContest/SelectContest';
import NavigationService from '../../../navigation/NavigationService';
import {getShareUrl, getTab} from '../../../slices/matchSlice';
import {colors} from '../../../theme/color';
import {shareToAny} from '../../../helper/utility';

export const shareTeamMessage = (userName, s1, s2, series, id) => {
  let temp = `Pick my Battle Infinity team with just one tap!\n\n${userName}'s team for ${s1} VS ${s2} | ${series}\n Sport:Cricket\nhttps://www.battleinfinity.io/${id}`;
  return temp;
};

const MyTeam = ({item, isFromSelect = false, onSelectTeam, isTeamSelected}) => {
  const dispatch = useDispatch();
  const contestData = useSelector(state => state?.match?.contestData);
  const userData = useSelector(state => {
    return state.profile.userData;
  });
  const shareLink = useSelector(state => state?.match?.shareLink);
  const {Status} = contestData ?? '';
  const [wiketKiper, setWiketKiper] = useState(0);
  const [batsman, setBatsman] = useState(0);
  const [allRounder, setAllRounder] = useState(0);
  const [bowler, setBowler] = useState(0);
  const [captain, setCaptain] = useState(null);
  const [viceCaptain, setViceCaptain] = useState(null);
  const [teamDetails, setTeamDetails] = useState(null);
  const [availableCredits, setAvailableCredits] = useState(100);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const selectContestRef = useRef(null);
  const {username} = userData ?? '';
  useEffect(() => {
    const batsman = item?.players?.filter(
      player => player.playing_role == 'bat',
    );
    const bowler = item?.players?.filter(
      player => player.playing_role == 'bowl',
    );
    const wicketKiper = item?.players?.filter(
      player => player.playing_role == 'wk',
    );
    const allRounder = item?.players?.filter(
      player => player.playing_role == 'all',
    );

    const captain = item?.players?.find(item => item.caption);
    const viceCaptain = item?.players?.find(item => item?.vice_caption);
    setCaptain(captain);
    setViceCaptain(viceCaptain);
    setBatsman(batsman.length);
    setBowler(bowler.length);
    setWiketKiper(wicketKiper?.length);
    setAllRounder(allRounder?.length);
  }, []);
  useEffect(() => {
    const firstTeam = item?.players?.filter(
      e =>
        e?.primary_team?.abbr ==
        contestData?.TeamsShortNames[0]?.split(' ').join(''),
    );
    const secondTeam = item?.players?.filter(
      e => e?.primary_team?.abbr == contestData?.TeamsShortNames[1],
    );
    setTeamDetails({
      firstTeamName: contestData?.TeamsShortNames[0],
      secondTeamName: contestData?.TeamsShortNames[1],
      firstTeamCount: firstTeam?.length,
      secondTeamCount: secondTeam?.length,
    });
    // const teams = [...new Set(item?.players?.map(data => data?.country))];
    // const firstTeamName = teams[0];
    // const secondTeamName = teams[1];
    // const firstTeamCount = item?.players?.filter(
    //   item => item?.country == firstTeamName,
    // )?.length;
    // const secondTeamCount = item?.players?.filter(
    //   item => item?.country == secondTeamName,
    // )?.length;
    // setTeamDetails({
    //   firstTeamName: firstTeamName,
    //   secondTeamName: secondTeamName,
    //   firstTeamCount: firstTeamCount,
    //   secondTeamCount: secondTeamCount,
    // });
  }, []);
  useEffect(() => {
    dispatch(getShareUrl(item?._id));
  }, []);
  const onCardClick = () => {
    if (isFromSelect) {
      return onSelectTeam(item);
    } else {
      let selectedPlayers = item?.players?.map(k => {
        return k?.pid;
      });

      let usedCredit = 0;
      item?.players.forEach(
        player => (usedCredit = usedCredit + player?.fantasy_player_rating),
      );
      let availableCredits = Number(100) - Number(usedCredit);
      let player = [];
      let playerTwo = [];
      item?.players?.map(i => {
        return i?.primary_team?.abbr ==
          contestData?.TeamsShortNames[0]?.split(' ').join('')
          ? player?.push(i)
          : playerTwo?.push(i);
      });
      NavigationService.navigate(PLAYER_PREVIEW, {
        oldData: contestData,
        selectedPlayers: selectedPlayers,
        availableCredits: availableCredits,
        selectedPlayerDetails: item?.players,
        player: player,
        playerTwo: playerTwo,
        myTeam: true,
        teamName: item?.name,
      });
    }
  };
  const onEdit = () => {
    let player = [];
    let playerTwo = [];
    item?.players?.map(i => {
      return i?.primary_team?.abbr ==
        contestData?.TeamsShortNames[0]?.split(' ').join('')
        ? player?.push(i)
        : playerTwo?.push(i);
    });
    dispatch(getTab(''));
    NavigationService.navigate(SELECT_PLAYER, {
      contestData,
      isEditMode: true,
      selectedPlayers: item?.players,
      team_id: item?._id,
      team_name: item?.name,
      captain: captain?.pid,
      viceCaptain: viceCaptain?.pid,
      cloneTeam: true,
      player: player,
      playerTwo: playerTwo,
    });
  };
  const onCloneTeam = () => {
    let player = [];
    let playerTwo = [];
    item?.players?.map(i => {
      return i?.primary_team?.abbr ==
        contestData?.TeamsShortNames[0]?.split(' ').join('')
        ? player?.push(i)
        : playerTwo?.push(i);
    });
    dispatch(getTab(''));
    NavigationService.navigate(SELECT_PLAYER, {
      contestData,
      isCloneMode: true,
      selectedPlayers: item?.players,
      captain: captain?.pid,
      viceCaptain: viceCaptain?.pid,
      cloneTeam: true,
      player: player,
      playerTwo: playerTwo,
    });
  };

  return (
    <Pressable
      style={[
        styles.card,
        isFromSelect &&
          isTeamSelected && {
            borderColor: colors.borderBlue,
            borderWidth: 1,
          },
      ]}
      onPress={onCardClick}>
      <ImageBackground style={styles.topContainer} source={GRASS}>
        <View style={styles.top}>
          <AppText color={WHITE} type={TWELVE} weight={POPPINS}>
            {item?.name}
          </AppText>
          <View style={{flexDirection: 'row'}}>
            {Status !== 'Completed' && Status !== 'Live' && (
              <TouchableOpacityView style={{padding: 5}} onPress={onEdit}>
                <FastImage source={PENCIL} style={styles.icon} />
              </TouchableOpacityView>
            )}
            {Status !== 'Completed' && Status !== 'Live' && (
              <TouchableOpacityView style={{padding: 5}} onPress={onCloneTeam}>
                <FastImage source={COPY} style={styles.icon} />
              </TouchableOpacityView>
            )}
            <TouchableOpacityView
              style={{
                padding: 5,
              }}
              onPress={() =>
                shareToAny(
                  shareTeamMessage(
                    username,
                    teamDetails?.firstTeamName,
                    teamDetails?.secondTeamName,
                    contestData?.SeriesName,
                    shareLink,
                  ),
                )
              }>
              <FastImage source={SHARE} style={styles.icon} />
            </TouchableOpacityView>
          </View>
        </View>
        <View style={styles.midContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <AppText type={FORTEEN} color={WHITE} weight={POPPINS_BOLD}>
                {teamDetails?.firstTeamCount}
              </AppText>
              <AppText color={WHITE} weight={POPPINS_MEDIUM}>
                {teamDetails?.firstTeamName}
              </AppText>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 15,
              }}>
              <AppText
                type={FORTEEN}
                color={WHITE}
                style={{fontSize: 15}}
                weight={POPPINS_BOLD}>
                {teamDetails?.secondTeamCount}
              </AppText>
              <AppText color={WHITE} weight={POPPINS_MEDIUM}>
                {teamDetails?.secondTeamName}
              </AppText>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.playerContainer}>
              <FastImage source={CAPTAIN} style={styles.captainBedge} />
              <View style={{alignItems: 'center'}}>
                <FastImage source={PANT} style={styles.playerImage} />
                <View style={styles.playerName}>
                  <AppText
                    style={{textAlign: 'center'}}
                    color={WHITE}
                    type={EIGHT}
                    weight={POPPINS_SEMI_BOLD}>
                    {captain?.short_name}
                  </AppText>
                </View>
              </View>
            </View>
            <View style={styles.playerContainer}>
              <FastImage source={VICE_CAPTAIN} style={styles.captainBedge} />
              <View style={{alignItems: 'center'}}>
                <FastImage source={PANT} style={styles.playerImage} />
                <View style={styles.playerName}>
                  <AppText
                    style={{textAlign: 'center'}}
                    color={WHITE}
                    type={EIGHT}
                    weight={POPPINS_SEMI_BOLD}>
                    {viceCaptain?.short_name}
                  </AppText>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.bottom}>
        <AppText type={TEN} weight={POPPINS}>
          {` WK (${wiketKiper})`}
        </AppText>
        <AppText type={TEN} weight={POPPINS}>
          {`BAT (${batsman})`}
        </AppText>
        <AppText type={TEN} weight={POPPINS}>
          {`AR (${allRounder})`}
        </AppText>
        <AppText type={TEN} weight={POPPINS}>
          {`BOWL(${bowler})`}
        </AppText>
      </View>
      <RBSheet
        ref={selectContestRef}
        closeOnDragDown={false}
        openDuration={100}
        height={Dimensions.get('window').height}
        customStyles={{
          container: {
            backgroundColor: 'black',
          },
          draggableIcon: {
            backgroundColor: 'transparent',
            display: 'none',
          },
        }}>
        <SelectContest
          contestDetails={contestData}
          // matchDetails={matchDetails}
          onClose={() => selectContestRef?.current?.close()}
        />
      </RBSheet>
    </Pressable>
  );
};

export default MyTeam;
