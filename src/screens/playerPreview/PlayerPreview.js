import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, ImageBackground, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {AppSafeAreaView} from '../../common/AppSafeAreaView';
import {
  AppText,
  EIGHTEEN,
  FORTEEN,
  POPPINS,
  POPPINS_BOLD,
  POPPINS_MEDIUM,
  TEN,
  THIRTEEN,
  TWELVE,
  WHITE,
} from '../../common/AppText';
import {TouchableOpacityView} from '../../common/TouchableOpacityView';
import {
  all_rounderIcon,
  batsmanIcon,
  bowlerIcon,
  CAPTAIN,
  green_ground,
  LEFT_ARROW,
  LINEAR_GRADIENT,
  PANT,
  player_placeholder,
  VICE_CAPTAIN,
  wicket_keeperIcon,
} from '../../helper/image';
import {toastAlert} from '../../helper/utility';
import NavigationService from '../../navigation/NavigationService';
import {SELECT_CAPTAIN, SELECT_PLAYER} from '../../navigation/routes';
import styles from './styles';
import moment from 'moment';
import {colors} from '../../theme/color';
import {useDispatch} from 'react-redux';
import {getTab} from '../../slices/matchSlice';
import {LiveTime} from '../../common/LiveTime';
const PlayerPreview = () => {
  const dispatch = useDispatch();
  const route = useRoute();

  let players_List = route?.params?.selectedPlayerDetails ?? [];

  let wicket_keepers_list = players_List?.filter(item => {
    return item?.playing_role === 'wk';
  });
  let bowlers_list = players_List?.filter(item => {
    return item?.playing_role === 'bowl';
  });
  let batsman_list = players_List?.filter(item => {
    return item?.playing_role === 'bat';
  });
  let all_rounder_list = players_List?.filter(item => {
    return item?.playing_role === 'all';
  });
  const onContinueClick = () => {
    if (players_List?.length < 11) {
      return toastAlert.showToastError('Please Select 11 Players');
    }

    NavigationService.navigate(SELECT_CAPTAIN, {
      matchDetails: route?.params?.oldData,
      selectedPlayers: route?.params?.selectedPlayers,
      selctedPlayerDetails: route?.params?.selectedPlayerDetails,
    });
  };
  return (
    <AppSafeAreaView statusColor={'black'}>
      <ImageBackground
        resizeMode="cover"
        style={styles.secondImage}
        source={green_ground}>
        <ImageBackground
          style={styles.card}
          resizeMode="cover"
          source={LINEAR_GRADIENT}>
          <View style={styles.top}>
            <TouchableOpacityView
              style={{padding: 2}}
              onPress={() => NavigationService.goBack()}>
              <FastImage
                source={LEFT_ARROW}
                resizeMode="contain"
                style={styles.leftArrow}
              />
            </TouchableOpacityView>
            <View style={{flexDirection: 'column', paddingHorizontal: 20}}>
              <AppText
                weight={POPPINS}
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: 'white',
                  textAlign: 'left',
                }}>
                {`${
                  route?.params?.myTeam
                    ? route?.params?.teamName
                    : 'Create Team'
                }`}
              </AppText>
              <LiveTime
                top={true}
                view={true}
                color={WHITE}
                details={route?.params?.oldData}
              />
            </View>
          </View>
          <LinearGradient
            style={{
              height: 1,
              width: '108%',
              right: 13,
              opacity: 0.5,
              top: 10,
            }}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={[
              colors.linerLineBlue,
              colors.linerLinePick,
            ]}></LinearGradient>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flex: 1,
                marginRight: 20,
              }}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <AppText
                  type={TEN}
                  weight={POPPINS_BOLD}
                  style={styles.colorWhite}>
                  {`${route?.params?.selectedPlayers?.length}/11`}
                </AppText>
                <AppText
                  style={{color: 'white', fontSize: 9}}
                  weight={POPPINS_BOLD}>
                  Selection
                </AppText>
              </View>
              <View style={styles.teamView}>
                <FastImage
                  source={{uri: route?.params?.oldData?.TeamAlogo}}
                  style={styles.teamLogo}
                  resizeMode="contain"
                />
                <View
                  style={{
                    marginLeft: 5,
                  }}>
                  <AppText style={{color: 'white'}}>
                    {route?.params?.oldData?.TeamsShortNames &&
                      route?.params?.oldData?.TeamsShortNames.length > 0 &&
                      route?.params?.oldData?.TeamsShortNames[0]}
                  </AppText>
                  <AppText
                    style={{
                      color: 'white',
                    }}
                    type={TWELVE}>
                    {route?.params?.player?.length}
                  </AppText>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flex: 1,
                marginLeft: 20,
              }}>
              <View style={styles.teamView}>
                <View
                  style={{
                    marginRight: 5,
                  }}>
                  <AppText style={{color: 'white'}}>
                    {' '}
                    {route?.params?.oldData?.TeamsShortNames &&
                      route?.params?.oldData?.TeamsShortNames.length > 0 &&
                      route?.params?.oldData?.TeamsShortNames[1]}
                  </AppText>
                  <AppText
                    style={{
                      color: 'white',
                      alignSelf: 'flex-end',
                      marginRight: 2,
                    }}
                    type={TWELVE}>
                    {route?.params?.playerTwo?.length}
                  </AppText>
                </View>
                <FastImage
                  source={{uri: route?.params?.oldData?.TeamBlogo}}
                  style={styles.teamLogo}
                  resizeMode="contain"
                />
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <AppText
                  type={TEN}
                  weight={POPPINS_BOLD}
                  style={styles.colorWhite}>
                  {route?.params?.availableCredits}
                </AppText>
                <AppText
                  style={{color: 'white', fontSize: 9}}
                  weight={POPPINS_BOLD}>
                  Credit
                </AppText>
              </View>
            </View>
          </View>
        </ImageBackground>
        <ScrollView contentContainerStyle={{justifyContent: 'center', flex: 1}}>
          <AppText
            type={FORTEEN}
            style={[
              styles.title,
              {marginTop: route?.params?.myTeam ? '-15%' : 10},
            ]}
            weight={POPPINS}
            color={WHITE}>
            WICKET KEEPERS ({wicket_keepers_list?.length})
          </AppText>
          <View style={styles.playerContainer}>
            {wicket_keepers_list.length > 0 ? (
              wicket_keepers_list?.map((item, index) => {
                console.log(item, '=');
                let space =
                  index % 2 == 0
                    ? {backgroundColor: '#21B5F6'}
                    : {backgroundColor: '#6A37FF'};
                return (
                  <View
                    style={[
                      styles.singlePlayerContainer,
                      {
                        marginLeft: index == 0 ? 0 : 20,
                      },
                    ]}
                    key={item?._id}>
                    <FastImage
                      style={{
                        height: 18,
                        width: 18,
                        position: 'absolute',
                        left: index == 0 ? -8 : 2,
                      }}
                      resizeMode="contain"
                      source={
                        item?.vice_caption == true
                          ? VICE_CAPTAIN
                          : item?.caption == true
                          ? CAPTAIN
                          : null
                      }
                    />
                    <FastImage
                      source={wicket_keeperIcon}
                      style={styles.playerImage}
                      resizeMode="contain"
                    />

                    <AppText
                      style={[styles.playerName, space]}
                      type={TEN}
                      color={WHITE}>
                      {item?.short_name.split(' ')[0].charAt(0).toUpperCase() +
                        ' ' +
                        item?.short_name.split(' ')[1]}
                    </AppText>
                    <AppText weight={POPPINS_MEDIUM} color={WHITE}>
                      {item?.fantasy_player_rating} cr
                    </AppText>
                  </View>
                );
              })
            ) : (
              <TouchableOpacityView
                onPress={() => {
                  dispatch(getTab('WICKET KEEPERS'));
                  NavigationService.goBack();
                }}>
                <FastImage
                  source={player_placeholder}
                  style={styles.playerImage}
                  resizeMode="contain"
                />
              </TouchableOpacityView>
            )}
          </View>
          <AppText
            type={FORTEEN}
            style={styles.title2}
            weight={POPPINS}
            color={WHITE}>
            BATSMAN ({batsman_list?.length})
          </AppText>
          <View style={styles.playerContainer}>
            {batsman_list.length > 0 ? (
              batsman_list?.map((item, index) => {
                let space =
                  index % 2 == 0
                    ? {backgroundColor: '#21B5F6'}
                    : {backgroundColor: '#6A37FF'};

                return (
                  <View
                    style={[
                      styles.singlePlayerContainer,
                      {
                        marginLeft: index == 0 ? 0 : 20,
                      },
                    ]}
                    key={item?._id}>
                    <FastImage
                      style={{
                        height: 18,
                        width: 18,
                        position: 'absolute',
                        left: index == 0 ? -3 : -12,
                      }}
                      resizeMode="contain"
                      source={
                        item?.vice_caption == true
                          ? VICE_CAPTAIN
                          : item?.caption == true
                          ? CAPTAIN
                          : null
                      }
                    />
                    <FastImage
                      source={batsmanIcon}
                      style={styles.playerImage}
                      resizeMode="contain"
                    />
                    <AppText
                      style={[styles.playerName, space]}
                      type={TEN}
                      color={WHITE}>
                      {item?.short_name.split(' ')[0].charAt(0).toUpperCase() +
                        ' ' +
                        item?.short_name.split(' ')[1]}
                    </AppText>
                    <AppText weight={POPPINS_MEDIUM} color={WHITE}>
                      {item?.fantasy_player_rating} cr
                    </AppText>
                  </View>
                );
              })
            ) : (
              <TouchableOpacityView
                onPress={() => {
                  dispatch(getTab('BATSMEN'));
                  NavigationService.goBack();
                }}>
                <FastImage
                  source={player_placeholder}
                  style={styles.playerImage}
                  resizeMode="contain"
                />
              </TouchableOpacityView>
            )}
          </View>
          <AppText
            type={FORTEEN}
            style={styles.title2}
            weight={POPPINS}
            color={WHITE}>
            ALL ROUNDERS ({all_rounder_list?.length})
          </AppText>
          <View style={[styles.playerContainer,{marginTop:5}]}>
            {all_rounder_list.length > 0 ? (
              all_rounder_list?.map((item, index) => {
                let space =
                  index % 2 == 0
                    ? {backgroundColor: '#21B5F6'}
                    : {backgroundColor: '#6A37FF'};

                return (
                  <View
                    style={[
                      styles.singlePlayerContainer,
                      {
                        marginLeft: index == 0 ? 0 : 20,
                      },
                    ]}
                    key={item?._id}>
                    <FastImage
                      style={{
                        height: 18,
                        width: 18,
                        position: 'absolute',
                        left: 0,
                      }}
                      resizeMode="contain"
                      source={
                        item?.vice_caption == true
                          ? VICE_CAPTAIN
                          : item?.caption == true
                          ? CAPTAIN
                          : null
                      }
                    />
                    <FastImage
                      source={all_rounderIcon}
                      style={styles.playerImage}
                      resizeMode="contain"
                    />
                    <AppText
                      style={[styles.playerName, space]}
                      type={TEN}
                      color={WHITE}>
                      {item?.short_name.split(' ')[0].charAt(0).toUpperCase() +
                        ' ' +
                        item?.short_name.split(' ')[1]}
                    </AppText>
                    <AppText weight={POPPINS_MEDIUM} color={WHITE}>
                      {item?.fantasy_player_rating} cr
                    </AppText>
                  </View>
                );
              })
            ) : (
              <TouchableOpacityView
                onPress={() => {
                  dispatch(getTab('ALL ROUNDERS'));
                  NavigationService.goBack();
                }}>
                <FastImage
                  source={player_placeholder}
                  style={styles.playerImage}
                  resizeMode="contain"
                />
              </TouchableOpacityView>
            )}
          </View>
          <AppText
            type={TWELVE}
            style={styles.title2}
            weight={POPPINS}
            color={WHITE}>
            BOWLERS ({bowlers_list?.length})
          </AppText>
          <View style={[styles.playerContainer,{marginTop:5}]}>
            {bowlers_list.length > 0 ? (
              bowlers_list?.map((item, index) => {
                let space =
                  index % 2 == 0
                    ? {backgroundColor: '#21B5F6'}
                    : {backgroundColor: '#6A37FF'};

                return (
                  <View
                    style={[
                      styles.singlePlayerContainer,
                      {
                        marginLeft: index == 0 ? 0 : 20,
                      },
                    ]}
                    key={item?._id}>
                    <FastImage
                      style={{
                        height: 18,
                        width: 18,
                        position: 'absolute',
                        left: 0,
                      }}
                      resizeMode="contain"
                      source={
                        item?.vice_caption == true
                          ? VICE_CAPTAIN
                          : item?.caption == true
                          ? CAPTAIN
                          : null
                      }
                    />
                    <FastImage
                      source={bowlerIcon}
                      style={styles.playerImage}
                      resizeMode="contain"
                    />
                    <AppText
                      style={[styles.playerName, space]}
                      type={TEN}
                      color={WHITE}>
                      {item?.short_name.split(' ')[0].charAt(0).toUpperCase() +
                        ' ' +
                        item?.short_name.split(' ')[1]}
                    </AppText>
                    <AppText weight={POPPINS_MEDIUM} color={WHITE}>
                      {item?.fantasy_player_rating} cr
                    </AppText>
                  </View>
                );
              })
            ) : (
              <TouchableOpacityView
                onPress={() => {
                  dispatch(getTab('BOWLERS'));
                  NavigationService.goBack();
                }}>
                <FastImage
                  source={player_placeholder}
                  style={styles.playerImage}
                  resizeMode="contain"
                />
              </TouchableOpacityView>
            )}
          </View>
        </ScrollView>
        {route?.params?.myTeam ? (
          <></>
        ) : (
          <View style={styles.buttonContainer}>
            <TouchableOpacityView
              onPress={() => NavigationService.goBack()}
              style={[
                styles.btn2,
                styles.createContest,
                {
                  width: '47%',
                },
              ]}>
              <AppText
                style={{
                  marginTop: 3,
                }}
                type={EIGHTEEN}
                color={WHITE}
                weight={POPPINS_BOLD}>
                CLOSE
              </AppText>
            </TouchableOpacityView>
            <TouchableOpacityView
              onPress={onContinueClick}
              style={[
                styles.btn,
                {
                  width: '47%',
                },
              ]}>
              <View
                style={[
                  styles.btn,
                  {
                    width: '100%',
                  },
                ]}>
                <AppText
                  style={{
                    marginTop: 3,
                  }}
                  type={EIGHTEEN}
                  weight={POPPINS_BOLD}>
                  CREATE TEAM
                </AppText>
              </View>
            </TouchableOpacityView>
          </View>
        )}
      </ImageBackground>
    </AppSafeAreaView>
  );
};

export default PlayerPreview;
