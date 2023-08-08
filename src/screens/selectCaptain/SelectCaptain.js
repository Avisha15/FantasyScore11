import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, ImageBackground} from 'react-native';
import FastImage from 'react-native-fast-image';
import {FlatList} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {appOperation} from '../../appOperation';
import {AppSafeAreaView} from '../../common/AppSafeAreaView';
import {
  AppText,
  BLACK,
  BLACKOPACITY,
  FIFTEEN,
  FORTEEN,
  LIGHTBLUE,
  POPPINS,
  POPPINS_BOLD,
  POPPINS_BOLD_ITALIC,
  POPPINS_MEDIUM,
  POPPINS_SEMI_BOLD,
  TEN,
  THIRTEEN,
  WHITE,
} from '../../common/AppText';
import {SpinnerSecond} from '../../common/SpinnerSecond';
import {TouchableOpacityView} from '../../common/TouchableOpacityView';
import {
  DUMMY_USER,
  GROUND,
  LEFT_ARROW,
  LINEAR_GRADIENT,
  PANT,
} from '../../helper/image';
import {toastAlert} from '../../helper/utility';
import NavigationService from '../../navigation/NavigationService';
import {
  MY_CONTEST,
  PLAYER_PREVIEW,
  Single_Ipl_Card,
} from '../../navigation/routes';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
import Header from '../../common/Header';
import {getMyTeam, setContestData} from '../../slices/matchSlice';
import Confirmation from '../../common/Confirmation';
import {StatusBar} from 'native-base';
import CommonImageBackground from '../../common/commonImageBackground';
import moment from 'moment';
import {NewColor, colors} from '../../theme/color';
import SecondaryButton from '../../common/secondaryButton';
import PrimaryButton from '../../common/primaryButton';
import {LiveTime} from '../../common/LiveTime';

const SelectCaptain = () => {
  const route = useRoute();
  const [captainId, setCaptainId] = useState(null);
  const [viceCaptainId, setViceCaptainId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const myTeam = useSelector(state => state?.match?.myTeams);
  const selectedMatch = useSelector(state => state?.match?.selectedMatch);
  const isContestEntry = useSelector(state => state?.match?.isContestEntry);
  const contestData = useSelector(state => state?.match?.contestData);
  const [isAdd, setIsAdd] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (route?.params?.isEditMode) {
      route?.params?.selctedPlayerDetails &&
        route?.params?.selctedPlayerDetails?.find(e => {
          return (
            e?.vice_caption == true ? setViceCaptainId(e?.pid) : null,
            e?.caption == true ? setCaptainId(e?.pid) : null
          );
        });
    }
  }, []);

  const onSelectCaptain = id => {
    if (viceCaptainId == id) {
      setViceCaptainId(null);
    }
    setCaptainId(id);
  };
  const onSelectViceCaptain = id => {
    if (captainId == id) {
      setCaptainId(null);
    }
    setViceCaptainId(id);
  };

  const renderPlayer = ({item}) => {
    return (
      <View style={styles.playerContainer}>
        <FastImage
          source={PANT}
          resizeMode="contain"
          style={styles.playerImage}
        />
        <View style={{flex: 1, marginLeft:-10}}>
          <AppText numberOfLines={1}>
            {item?.short_name.split(' ')[0].charAt(0).toUpperCase() +
              ' ' +
              item?.short_name.split(' ')[1]}
          </AppText>
          <AppText style={{textTransform: 'uppercase'}} type={TEN}>
            <AppText
              type={TEN}
              color={LIGHTBLUE}
              style={{
                textTransform: 'uppercase',
              }}>
              {item?.teamName} |
            </AppText>{' '}
            {item?.playing_role}
          </AppText>
        </View>
        <View style={{flex: 1, alignItems: 'center', }}>
          <AppText type={TEN}>{item?.fantasy_player_rating}</AppText>
        </View>
        {item?.pid !== captainId ? (
          <View style={{alignItems: 'center', marginRight: -7}}>
            <TouchableOpacityView
              onPress={() => onSelectCaptain(item?.pid)}
              style={[styles.roleBedge]}>
              <AppText style={{marginTop: 2}} color={BLACK} type={TEN}>
                {'C'}
              </AppText>
            </TouchableOpacityView>
          </View>
        ) : (
          <TouchableOpacityView
            onPress={() => onSelectCaptain(item?.pid)}
            style={{alignItems: 'center', marginRight: 0, marginRight: -7}}>
            <LinearGradient
              colors={[colors.borderBackColor, colors.linerProgress]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={[styles.roleBedge2]}>
              <AppText style={{marginTop: 2}} color={WHITE} type={TEN}>
                2X
              </AppText>
            </LinearGradient>
          </TouchableOpacityView>
        )}
        {item.pid !== viceCaptainId ? (
          <View style={{flex: 0.7, alignItems: 'flex-end', marginRight: 15}}>
            <TouchableOpacityView
              onPress={() => onSelectViceCaptain(item?.pid)}
              style={[styles.roleBedge]}>
              <AppText style={{marginTop: 2}} color={BLACK} type={TEN}>
                VC
              </AppText>
            </TouchableOpacityView>
          </View>
        ) : (
          <TouchableOpacityView
            onPress={() => onSelectViceCaptain(item?.pid)}
            style={{flex: 0.7, alignItems: 'flex-end', marginRight: 15}}>
            <LinearGradient
              colors={[colors.borderBackColor, colors.linerProgress]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={[styles.roleBedge2]}>
              <AppText style={{marginTop: 2}} color={WHITE} type={TEN}>
                1.5X
              </AppText>
            </LinearGradient>
          </TouchableOpacityView>
        )}
      </View>
    );
  };
  const saveTeam = async () => {
    if (!captainId) {
      return toastAlert.showToastError('Please Select Captain');
    }
    if (!viceCaptainId) {
      return toastAlert.showToastError('Please Select Vice Captain');
    }
    if (route?.params?.isEditMode) {
      try {
        setIsLoading(true);
        const res = await appOperation.customer.editTeam({
          match_id: route?.params?.matchDetails?._id?.toString(),
          matchid: route?.params?.matchDetails?.MatchId?.toString(),
          name: route?.params?.team_name,
          caption: captainId,
          vice_caption: viceCaptainId,
          pid: route?.params?.selectedPlayers,
          team_id: route?.params?.team_id,
        });
        setIsLoading(false);
        if (res?.code == 200) {
          // await dispatch(getMyTeam(route?.params?.matchDetails?._id));
          toastAlert.showToastError(res?.message);
          if (isContestEntry) {
            setIsAdd(true);
          } else {
            setTimeout(() => {
              dispatch(setContestData(route?.params?.matchDetails));
              NavigationService.navigate(MY_CONTEST);
            }, 1000);
          }
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        setIsLoading(true);

        const res = await appOperation.customer.saveTeam({
          match_id: route?.params?.matchDetails?._id?.toString(),
          matchid: route?.params?.matchDetails?.MatchId?.toString(),
          name: `T${myTeam?.length + 1}`,
          caption: captainId,
          vice_caption: viceCaptainId,
          pid: route?.params?.selectedPlayers,
        });
        console.log(res, 'resresres');

        setIsLoading(false);
        if (res?.code == 200) {
          toastAlert.showToastError(res?.message);
          dispatch(getMyTeam(route?.params?.matchDetails?._id));
          if (isContestEntry) {
            setIsAdd(true);
          } else {
            setTimeout(() => {
              dispatch(setContestData(route?.params?.matchDetails));
              NavigationService.navigate(MY_CONTEST);
            }, 1000);
          }
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }
  };
  const onPreview = () => {
    let player = [];
    let playerTwo = [];
    route?.params?.selctedPlayerDetails?.map(i => {
      return i?.teamName == contestData?.TeamsShortNames[0]?.split(' ').join('')
        ? player?.push(i)
        : playerTwo?.push(i);
    });
    NavigationService.navigate(PLAYER_PREVIEW, {
      selectedPlayerDetails: route?.params?.selctedPlayerDetails,
      oldData: route?.params?.matchDetails,
      selectedPlayers: route?.params?.selectedPlayers,
      captainId: captainId,
      viceCaptainId: viceCaptainId,
      availableCredits: route?.params?.availableCredits,
      playerTwo: playerTwo,
      player: player,
    });
  };
  return (
    <AppSafeAreaView>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        networkActivityIndicatorVisible={true}
      />
      <CommonImageBackground common>
        <View
          style={{
            flexDirection: 'column',
            paddingHorizontal: 15,
            marginTop: '10%',
          }}>
          <TouchableOpacityView onPress={() => NavigationService.goBack()}>
            <FastImage
              source={LEFT_ARROW}
              resizeMode="contain"
              style={{height: 16, width: 16, top: 10}}
              tintColor={colors.black}
            />
          </TouchableOpacityView>
          <View
            style={{
              flexDirection: 'column',
              paddingHorizontal: 30,
              bottom: 15,
            }}>
            <AppText
              weight={POPPINS_MEDIUM}
              type={FORTEEN}
              style={{
                textAlign: 'left',
              }}>
              Create Team
            </AppText>

            <LiveTime
              color={BLACKOPACITY}
              view={true}
              top={true}
              details={route?.params?.matchDetails}
            />
          </View>
        </View>
        <AppText
          weight={POPPINS_SEMI_BOLD}
          type={FORTEEN}
          style={styles.heading}>
          Choose Captain & Vice Captain
        </AppText>
        <AppText
          color={BLACKOPACITY}
          weight={POPPINS}
          style={styles.subHeading}>
          C will get 2x points & VC will get 1.5x points
        </AppText>
        <View style={styles.playerHeadingBar}>
          <AppText
            style={{
              flex: 1,
            }}
            weight={POPPINS}></AppText>
          <AppText
            type={TEN}
            style={{
              flex: 1.5,
              textAlign: 'left',
            }}
            weight={POPPINS}>
            Type
          </AppText>
          <AppText
            type={TEN}
            style={{flex: 1, textAlign: 'center', marginRight: 15}}
            weight={POPPINS}>
            POINTS
          </AppText>
          <AppText
            type={TEN}
            style={[
              {
                marginLeft: 5,
                marginRight: 5,
                textAlign: 'center',
                marginRight: 15,
              },
            ]}
            weight={POPPINS}>
            CAP
          </AppText>
          <AppText
            type={TEN}
            style={[{flex: 0.7, textAlign: 'right', marginRight: 15}]}
            weight={POPPINS}>
            V.CAP
          </AppText>
        </View>

        <View style={{flex: 1}}>
          <FlatList
            data={route?.params?.selctedPlayerDetails}
            renderItem={renderPlayer}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View style={styles.btnContainer}>
          <SecondaryButton
            onPress={() => onPreview()}
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
            onPress={saveTeam}
            title="SAVE"
          />
        </View>
      </CommonImageBackground>
      <Confirmation
        isModalVisible={isAdd}
        details={selectedMatch}
        setIsModalVisible={setIsAdd}
        matchDetails={route?.params?.matchDetails}
        teamLength={false}
      />
      <SpinnerSecond loading={isLoading} />
    </AppSafeAreaView>
  );
};

export default SelectCaptain;
