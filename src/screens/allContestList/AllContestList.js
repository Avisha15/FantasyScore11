import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState, useRef} from 'react';
import {FlatList, View} from 'react-native';
import {appOperation} from '../../appOperation';
import {AppSafeAreaView} from '../../common/AppSafeAreaView';
import {
  AppText,
  BLACK,
  POPPINS,
  POPPINS_MEDIUM,
  SIXTEEN,
} from '../../common/AppText';
import {SpinnerSecond} from '../../common/SpinnerSecond';
import CommonHeader from '../../components/matchCard/commonHeader/CommonHeader';
import ContestCard from '../../components/matchCard/contestCard/ContestCard';
import styles from './styles';
import RBSheet from 'react-native-raw-bottom-sheet';
import FilterSheet from '../../components/filterSheet/FilterSheet';
import MatchRemainder from '../../components/matchCard/matchRemainder/MatchRemainder';
import {Screen} from '../../theme/dimens';
import {useSelector} from 'react-redux';
import {StatusBar} from 'native-base';
import CommonImageBackground from '../../common/commonImageBackground';
const AllContestList = ({}) => {
  const route = useRoute();
  const filterSheet = useRef();
  const sheet = useRef();
  const [allContestList, setAllContestList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(2);
  const contestData = useSelector(state => state?.match?.contestData);
  const getAllContestList = async () => {
    try {
      const res = await appOperation.customer.getAllContest(
        route?.params?.matchId,
        route?.params?.contestId,
      );
      setIsLoading(false);
      if (res.success) {
        setAllContestList(res?.data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getAllContestList();
  }, []);
  const renderAllContestList = ({item}) => {
    return (
      <ContestCard
        details={item}
        totalTeamCount={route?.params?.totalTeamCount}
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
        <CommonHeader
          allContest={true}
          style={{
            marginBottom: 0,
          }}
          details={route?.params?.matchDetails}
          showPopup={() => sheet.current?.open()}
          activeTab={activeTab}
          setActiveTab={e => setActiveTab(e)}
        />
        <View style={{marginHorizontal: 10, flex: 1}}>
          {/* <AppText color={BLACK} type={SIXTEEN} weight={POPPINS_MEDIUM}>
            {route?.params?.contestName}
          </AppText> */}
          <AppText
            color={BLACK}
            weight={POPPINS_MEDIUM}
            type={SIXTEEN}
            style={{
              opacity: 0.6,
              marginBottom: 15,
              marginTop:'-8%'
            }}>
            {allContestList?.length} Contest available
          </AppText>
          <FlatList
            data={allContestList}
            contentContainerStyle={{flexGrow: 1}}
            renderItem={renderAllContestList}
          />
        </View>
      </CommonImageBackground>
      <RBSheet
        ref={sheet}
        closeOnDragDown={true}
        height={201}
        customStyles={{
          container: {
            backgroundColor: '#172C66',
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
      <SpinnerSecond loading={isLoading} />
    </AppSafeAreaView>
  );
};

export default AllContestList;
