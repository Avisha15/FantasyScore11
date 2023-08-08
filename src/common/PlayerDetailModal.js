import React from 'react';
import ReactNativeModal from 'react-native-modal';
import {useSelector} from 'react-redux';
import {SpinnerSecond} from './SpinnerSecond';
import {ImageBackground, StyleSheet, View, FlatList} from 'react-native';
import {
  PANT,
  closeIcon,
  ProfileBackgroundImageTwo,
} from '../helper/image';
import {TouchableOpacityView} from './TouchableOpacityView';
import FastImage from 'react-native-fast-image';
import {
  AppText,
  BLACK,
  EIGHTEEN,
  FORTEEN,
  POPPINS,
  POPPINS_SEMI_BOLD,
  SIXTEEN,
  TEN,
  WHITE,
} from './AppText';
import {poppinsBoldItalic} from '../theme/typography';
import LinearGradient from 'react-native-linear-gradient';
import PrimaryButton from './primaryButton';
import {LIGHTPINK} from './AppText';
import {NewColor, colors} from '../theme/color';
import {flexOne} from '../theme/dimens';

const PlayerDetailModal = ({
  isVisible,
  setIsVisible,
  selectedPlayers,
  removePlayerFromTeam,
  addPlayerInTeam,
  onPress,
}) => {
  const isLoading = useSelector(state => {
    return state.auth.isLoading;
  });
  const playerDetail = useSelector(state => {
    return state.match.playerDetail;
  });
  const playerRole = role => {
    if (role === 'wk') return 'WICKET KEEPER';
    if (role === 'bowl') return 'BOWLER';
    if (role === 'bat') return 'BATSMAN';
    if (role === 'all') return 'ALL ROUNDER';
  };
  const data = [
    {
      id: 1,
      date: 'NOV 06, 2022',
      team: 'MI',
      selby: '20.50',
      point: '325',
      credit: '10.0',
    },
  ];
  const item = {
    pid: playerDetail?.profile?.player?.pid,
    fantasy_player_rating: playerDetail?.profile?.player?.fantasy_player_rating,
  };
  const renderItem = ({item}) => {
    return (
      <LinearGradient
        colors={[
          colors.playerDetailsLinerOne,
          colors.playerDetailsLinerTwo,
          colors.playerDetailsLinerThree,
        ]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.renderContainer}>
        <AppText color={BLACK} type={TEN} style={styles.textDate}>
          {item.date}
        </AppText>
        <View style={styles.singleLine} />
        <View style={styles.aboutPlayerView}>
          <View style={{flex: 0.5}}>
            <AppText
              style={{
                opacity: 0.5,
              }}>
              vs.
            </AppText>
            <AppText>{item.team}</AppText>
          </View>
          <View style={styles.titleView}>
            <View>
              <AppText style={styles.titleText}>SEL BY</AppText>
              <AppText>{item.selby}%</AppText>
            </View>
            <View>
              <AppText style={styles.titleText}>POINTS</AppText>
              <AppText>{item.point}</AppText>
            </View>
            <View>
              <AppText style={styles.titleText}>CREDIT</AppText>
              <AppText>{item.credit}</AppText>
            </View>
          </View>
        </View>
      </LinearGradient>
    );
  };
  return (
    <ReactNativeModal
      isVisible={isVisible}
      style={{margin: 0}}
      onBackButtonPress={setIsVisible}
      onBackdropPress={setIsVisible}
      animationIn={'bounceInUp'}
      animationOut={'bounceOutDown'}>
      <ImageBackground
        resizeMode={'cover'}
        source={ProfileBackgroundImageTwo}
        style={styles.top}>
        <View style={styles.topContainer}>
          <TouchableOpacityView
            style={styles.closeContainer}
            onPress={setIsVisible}>
            <FastImage
              tintColor={'white'}
              resizeMode="contain"
              source={closeIcon}
              style={styles.leftArrow}
            />
          </TouchableOpacityView>
          <AppText
            style={{
              marginTop: 2,
              marginLeft: 15,
            }}
            color={WHITE}
            type={FORTEEN}>
            Player Info
          </AppText>
        </View>
        <View style={styles.card}>
          <View style={styles.playerIconContainer}>
            <FastImage
              source={PANT}
              style={styles.playerIcon}
              resizeMode="cover"
            />
          </View>
          <View style={styles.nameContainer}>
            <AppText color={WHITE} type={SIXTEEN} weight={POPPINS_SEMI_BOLD}>
              {playerDetail?.profile?.player?.short_name}
            </AppText>
            <AppText color={LIGHTPINK}>
              {playerDetail?.profile?.player?.nationality} |
              <AppText color={WHITE}>
                {playerRole(playerDetail?.profile?.player?.playing_role)}
              </AppText>
            </AppText>
          </View>
          <View
            style={{
              marginRight: 15,
            }}>
            <AppText color={WHITE}>points</AppText>
            <AppText color={WHITE} type={SIXTEEN}>
              {playerDetail?.profile?.player?.fantasy_player_rating}
            </AppText>
          </View>
          <View>
            <AppText color={WHITE}>CREDITS</AppText>
            <AppText color={WHITE} type={SIXTEEN}>
              {playerDetail?.profile?.player?.fantasy_player_rating}
            </AppText>
          </View>
        </View>
      </ImageBackground>

      <View
        style={{
          backgroundColor: NewColor.linerWhite,
          flex: flexOne,
          paddingHorizontal: 20,
        }}>
        <AppText
          style={{
            marginTop: '5%',
          }}
          weight={POPPINS}
          type={EIGHTEEN}>
          Recent match status
        </AppText>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{
            marginTop: '5%',
          }}
        />
        <PrimaryButton
          buttonStyle={{marginBottom: 10}}
          onPress={() => {
            selectedPlayers?.includes(playerDetail?.profile?.player?.pid)
              ? removePlayerFromTeam(item)
              : addPlayerInTeam(item);
          }}
          title={
            selectedPlayers?.includes(playerDetail?.profile?.player?.pid)
              ? 'REMOVE'
              : 'ADD'
          }
        />
      </View>
      <SpinnerSecond loading={isLoading} />
    </ReactNativeModal>
  );
};

export default PlayerDetailModal;
const styles = StyleSheet.create({
  top: {
    height: 200,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    paddingHorizontal: 20,
  },
  leftArrow: {
    height: 12,
    width: 12,
    resizeMode: 'contain',
  },
  closeContainer: {
    height: 25,
    width: 25,
    borderRadius: 100,
    backgroundColor: ' rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  playerIconContainer: {
    height: 98,
    width: 98,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: '#ffffff20',
  },
  playerIcon: {
    height: 88,
    width: 88,
  },
  nameContainer: {
    alignSelf: 'center',
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
  },
  editButton: {
    alignSelf: 'center',
    marginTop: 10,
    height: 45,
  },
  editButtonTitle: {
    fontSize: 14,
    fontFamily: poppinsBoldItalic,
    // fontStyle: 'italic',
  },
  renderContainer: {
    borderRadius: 16,
  },
  textDate: {
    marginLeft: 15,
    paddingVertical: 10,
  },
  singleLine: {
    height: 0.5,
    backgroundColor: NewColor.linerBlacklight,
  },
  aboutPlayerView: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  titleView: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flex: 1,
  },
  titleText: {
    fontSize: 10,
    opacity: 0.5,
  },
});
