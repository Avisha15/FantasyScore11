import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  AppText,
  BLACK,
  EIGHT,
  ELEVEN,
  POPPINS,
  POPPINS_BOLD,
  POPPINS_LIGHT,
  POPPINS_MEDIUM,
  TEN,
} from '../../../common/AppText';
import {TouchableOpacityView} from '../../../common/TouchableOpacityView';
import {FILTER_ICON, LEFT_ARROW, wallet, notified} from '../../../helper/image';
import moment from 'moment';
import NavigationService from '../../../navigation/NavigationService';
import styles from './styles';
import {useSelector} from 'react-redux';
import CommonTabs from '../commonTabs/CommonTabs';
import {MY_BALANCE} from '../../../navigation/routes';
import {colors} from '../../../theme/color';
import {LiveTime} from '../../../common/LiveTime';
const DATA = [
  {
    id: 1,
    title: 'ENTRY',
  },
  {
    id: 2,
    title: 'SPORTS',
  },
  {
    id: 3,
    title: 'PRIZE POOL',
  },
  {
    id: 4,
    title: '%WINNER',
  },
];

const CommonHeader = ({
  showPopup,
  showFilter,
  activeTab,
  setActiveTab,
  allContest,
  walletIco,
  style,
  completeMatch,
}) => {
  const details = useSelector(state => state?.match?.contestData);
  const myTeam = useSelector(state => state?.match?.myTeams);
  const myContest = useSelector(state => state?.match?.myContest);
  const [time, setTime] = useState({
    time: '',
    hour: 0,
    minute: 0,
  });
  const renderItem = ({item}) => {
    return (
      <AppText type={TEN} weight={POPPINS_MEDIUM} style={styles.entryTitle}>
 
        {item?.title}
      </AppText>
    );
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.card}>
        <View style={styles.matchImage}>
          {/*<FastImage source={SHAPE} style={styles.shape} />**/}
          <View style={styles.teamContainer}>
            <TouchableOpacityView 
            style={{height:20,width:20, flex:1}}
            onPress={() => NavigationService.goBack()}>
              <FastImage
                tintColor={colors.black}
                source={LEFT_ARROW}
                resizeMode="contain"
                style={styles.leftArrow}
              />
            </TouchableOpacityView>
            <View style={{flexDirection: 'row', marginLeft: 20, }}>
              <FastImage
                source={{uri: details?.TeamAlogo}}
                style={styles.teamImage}
                resizeMode="contain"
              />
              <View
                style={{
                  alignItems: 'center',
                  marginHorizontal: 15,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <AppText weight={POPPINS_BOLD}>
                    {details?.TeamsShortNames[0]}
                  </AppText>
                  <AppText
                    type={TEN}
                    style={{marginHorizontal: 5}}
                    weight={POPPINS}>
                    VS
                  </AppText>
                  <AppText weight={POPPINS_BOLD}>
                    {details?.TeamsShortNames[1]}
                  </AppText>
                </View>
                <View
                  style={{
                    // width: completeMatch ? 85: null,
                    // height: 18,
                    backgroundColor:
                      details?.Status === 'Live' ||
                      details?.match_details?.status_str === 'Live'
                        ? colors.green
                        : colors.lightgry,
                    borderRadius: 4,
                    marginTop: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal:10,
                    paddingVertical:0
                  }}>
                  <LiveTime
                    view={true}
                    top={true}
                    details={details}
                    color={BLACK}
                    type={TEN}
                    completeMatch={completeMatch}
                  />
                </View>
              </View>
              <FastImage
                source={{uri: details?.TeamBlogo}}
                style={styles.teamImage}
                resizeMode="contain"
              />
            </View>
            <View style={[styles.rightImageContainer,{flex:1.2, justifyContent:'flex-end'}]}>
              {walletIco ? (
                <></>
              ) : (
                <TouchableOpacityView onPress={showPopup}>
                  <FastImage
                    tintColor={colors.black}
                    source={notified}
                    style={styles.bellIcon}
                  />
                </TouchableOpacityView>
              )}
              <TouchableOpacityView
                onPress={() => NavigationService.navigate(MY_BALANCE)}>
                <FastImage
                  tintColor={colors.black}
                  source={wallet}
                  style={styles.walletIcon}
                />
              </TouchableOpacityView>
            </View>
          </View>
        </View>
      </View>
      {allContest ? (
        <></>
      ) : (
        <View
          style={{
            marginTop: '-10%',
          }}>
          <CommonTabs
            totalCount={[myContest?.length, myTeam?.length]}
            activeTab={activeTab}
            setActiveTab={e => setActiveTab(e)}
            filterShow={false}
            completeMatch={completeMatch}
            details={details}
          />
        </View>
      )}
      {activeTab === 2 ? (
        <View></View>
      ) : activeTab === 3 ? (
        <></>
      ) : (
        <View style={styles.filterContainer}>
          <AppText
            weight={POPPINS_LIGHT}
            style={{marginRight: 20, opacity: 0.8}}
            type={ELEVEN}>
            Sort By:
          </AppText>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={DATA}
            horizontal
            renderItem={renderItem}
          />
          <TouchableOpacityView onPress={showFilter}>
            <FastImage
              source={FILTER_ICON}
              tintColor={colors.black}
              style={styles.filterIcon}
            />
          </TouchableOpacityView>
        </View>
      )}
    </View>
  );
};

export default CommonHeader;
