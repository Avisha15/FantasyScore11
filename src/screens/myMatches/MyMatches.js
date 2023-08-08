import React, {useEffect, useState} from 'react';
import {FlatList, View, RefreshControl} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {AppSafeAreaView} from '../../common/AppSafeAreaView';
import {SpinnerSecond} from '../../common/SpinnerSecond';
import {TouchableOpacityView} from '../../common/TouchableOpacityView';
import MatchCard from '../../components/matchCard/MatchCard';
import {personIcon, combine, notification} from '../../helper/image';
import {getMyMatches} from '../../slices/matchSlice';
import styles from './styles';
import {
  AppText,
  EIGHTEEN,
  FIRST,
  FORTEEN,
  LIGHTPINK,
  POPPINS_MEDIUM,
  THIRTEEN,
  TWELVE,
} from '../../common/AppText';
import {flexOne, universalPaddingHorizontal} from '../../theme/dimens';
import {StatusBar} from 'native-base';
import CommonImageBackground from '../../common/commonImageBackground';
import {colors} from '../../theme/color';
import NavigationService from '../../navigation/NavigationService';
import {
  BOTTOM_TAB_HOMESCREEN,
  Notification__SCREEN,
} from '../../navigation/routes';
import PrimaryButton from '../../common/primaryButton';
export const ListEmptyComponent = ({title, activeTab}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {activeTab == 'Live' ? (
        <AppText
          style={{textAlign: 'center'}}
          type={FORTEEN}
          weight={POPPINS_MEDIUM}>
          {title
            ? title
            : `You haven't joined any that are live.\n Join contests for any of the upcoming matches`}
        </AppText>
      ) : (
        <></>
      )}
      {activeTab == 'Upcoming' ? (
        <AppText
          style={{textAlign: 'center'}}
          type={FORTEEN}
          weight={POPPINS_MEDIUM}>
          {title
            ? title
            : `You haven't joined any upcoming contests \n Join contests for any of the upcoming matches`}
        </AppText>
      ) : (
        <></>
      )}

      <PrimaryButton
        onPress={() => NavigationService.navigate(BOTTOM_TAB_HOMESCREEN)}
        smallBtn={styles.joinButtonMyContest}
        title="VIEW UPCOMING MATCHES"
        type={TWELVE}
      />
    </View>
  );
};
const MyMatches = () => {
  const dispatch = useDispatch();
  const tabData = ['Upcoming', 'Live', 'Completed'];
  const [activeTab, setActiveTab] = useState('Upcoming');
  const data = useSelector(state => state?.match?.myMatchesData);
  const isLoading = useSelector(state => state?.match?.isLoading);
  useEffect(() => {
    dispatch(getMyMatches(activeTab == 'Upcoming' ? 'Scheduled' : activeTab));
  }, [activeTab]);
  const onRefresh = () => {
    if (activeTab == 'Upcoming') {
      dispatch(getMyMatches('Scheduled'));
    } else if (activeTab == 'Live') {
      dispatch(getMyMatches('Live'));
    } else {
      dispatch(getMyMatches('Completed'));
    }
  };
  const renderItem = ({item}) => {
    return (
      <MatchCard
        details={item}
        isFromMyMatch={true}
        tab={activeTab}
        myMatches={true}
      />
    );
  };
  
  const changeTab = title => {
    setActiveTab(title);
    dispatch(getMyMatches(title == 'Upcoming' ? 'Scheduled' : title));
  };
  return (
    <AppSafeAreaView hidden={false}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        networkActivityIndicatorVisible={true}
      />
      <CommonImageBackground common>
        <View style={styles.top}>
          <FastImage source={personIcon} style={styles.userLogo} />
          <FastImage
            source={combine}
            style={styles.logo}
            resizeMode="contain"
          />
          <TouchableOpacityView
            onPress={() => NavigationService.navigate(Notification__SCREEN)}
            style={styles.rightImageContainer}>
            <FastImage
              tintColor={colors.black}
              source={notification}
              style={styles.bellIcon}
            />
          </TouchableOpacityView>
        </View>

        <View style={styles.tabContainer}>
          {tabData.map(title => {
            return title == activeTab ? (
              <View style={styles.renderConatainer}>
                <AppText
                  type={THIRTEEN}
                  weight={POPPINS_MEDIUM}
                  color={LIGHTPINK}>
                  {title}
                </AppText>
                <LinearGradient
                  style={{height: 2, width: 102}}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[colors.borderBackColor, colors.borderPick]}
                />
              </View>
            ) : (
              <TouchableOpacityView
                style={styles.tabs}
                onPress={() => changeTab(title)}>
                <AppText type={THIRTEEN} weight={POPPINS_MEDIUM}>
                  {title}
                </AppText>
              </TouchableOpacityView>
            );
          })}
        </View>
        <View
          style={{
            paddingHorizontal: universalPaddingHorizontal,
            flex: flexOne,
          }}>
          <FlatList
            data={data}
            style={{flex: flexOne, marginTop: 10}}
            contentContainerStyle={{flexGrow: flexOne}}
            keyExtractor={(item, index) => index?.toString()}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={onRefresh} />
            }
            ListEmptyComponent={
              isLoading ? <></> : <ListEmptyComponent activeTab={activeTab} />
            }
            renderItem={renderItem}
          />
        </View>
      </CommonImageBackground>
      <SpinnerSecond loading={isLoading} />
    </AppSafeAreaView>
  );
};

export default MyMatches;
