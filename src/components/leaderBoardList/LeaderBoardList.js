import React, {useEffect, useState, useRef} from 'react';
import {View, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';

import {
  AppText,
  BLACKOPACITY,
  EIGHT,
  EIGHTEEN,
  TEN,
} from '../../common/AppText';
import {DUMMY_USER, PANT} from '../../helper/image';
import styles from './styles';
import {useSelector} from 'react-redux';
import {SpinnerSecond} from '../../common/SpinnerSecond';
import {RefreshControl} from 'react-native-gesture-handler';
import {colors} from '../../theme/color';

const LeaderBoardList = ({matchId, id}) => {
  const wsRef = useRef(null);
  const userData = useSelector(state => {
    return state.profile.userData;
  });
  const [leaderBoards, setLeaderBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [onRefresh, setOnrefresh] = useState(false);
  const [myDataleader, setMyDataleader] = useState([]);
  let url = `ws://65.0.134.70:3000/leader-board?limit=10&skip=0&matchid=${matchId}&contest_category_id=${id}&user_id=${userData?._id}`;
  useEffect(() => {
    console.log('999999999999');
    if (matchId && id) {
      wsRef.current = new WebSocket(url);
      wsRef.current.onopen = () => {};
      wsRef.current.onclose = e => {
        setLoading(false);
        wsRef.current = new WebSocket(url);
      };
      wsRef.current.onerror = e => {
        setLoading(false);
        wsRef.current = new WebSocket(url);
      };
      return () => {
        wsRef.current.close();
      };
    }
  }, [matchId, id]);
  let getPrizeList = () => {
    try {
      setOnrefresh(true);
      if (matchId && id) {
        wsRef.current = new WebSocket(url);
        wsRef.current.onopen = () => {};
        wsRef.current.onclose = e => {
          setLoading(false);
          wsRef.current = new WebSocket(url);
        };
        wsRef.current.onerror = e => {
          setLoading(false);
          wsRef.current = new WebSocket(url);
        };
        return () => {
          wsRef.current.close();
        };
      }
    } catch (error) {
      console.log(error);
    } finally {
      setOnrefresh(false);
    }
  };
  useEffect(() => {
    if (!wsRef.current) return;
    wsRef.current.onmessage = e => {
      const parseData = JSON.parse(e?.data);

      setLeaderBoards(parseData?.data);
      setLoading(false);
    };
  });
  useEffect(() => {
    let Mydata = leaderBoards?.map(item => {
      return item?.email === userData?.email &&
        item?.full_name === userData?.full_name &&
        item?.mobile_number === userData?.mobile_number
        ? item
        : {};
    });
    const filteredData = Mydata.filter(item => Object.keys(item).length !== 0);
    setMyDataleader(filteredData);
  }, [leaderBoards]);
  const filteredArray = leaderBoards.filter(item => !Array.isArray(item));

  const renderLeaderBoard = ({item, index}) => {
    return (
      <View
        style={[
          styles.leaderBoardContainer,
          {
            backgroundColor:
            filteredArray?.length == 1 
                ? colors.borderLightBlue
                : null,
                borderBottomWidth:1,
                borderBottomColor:colors.lightgry
          },
        ]}>
        <View style={styles.underView}>
          <FastImage
            style={styles.userImg}
            resizeMode="contain"
            source={PANT}
          />
          <View style={{flex: 1, marginLeft: 6}}>
            <AppText>{`${
              item?.full_name
                ? item?.full_name
                : item?.mobile_number?.replace(
                    /(?!^.*)[^a-zA-Z\s](?=.{2})/g,
                    'x',
                  )
            } (${item?.total_points})`}</AppText>
            <AppText type={TEN} color={BLACKOPACITY}>
              {item?.team_details?.name}
            </AppText>
          </View>
          <AppText style={{}}>
            {item?.contest_category_details?.WinningAmount}
          </AppText>
        </View>
      </View>
    );
  };
  const mydataleaderboard = () => {
    return (
      myDataleader &&
      myDataleader?.map(item => {
        return (
          <View
            style={[
              styles.leaderBoardContainer,
              {
                backgroundColor: colors.borderLightBlue,
              },
            ]}>
            <View style={styles.underView}>
              <FastImage
                style={styles.userImg}
                resizeMode="contain"
                source={PANT}
              />
              <View style={{flex: 1, marginLeft: 6}}>
                <AppText>{`${
                  item?.created_by?.full_name
                    ? item?.created_by?.full_name
                    : item?.created_by?.mobile_number?.replace(
                        /(?!^.*)[^a-zA-Z\s](?=.{2})/g,
                        'x',
                      )
                } (${item?.total_points})`}</AppText>
                <AppText type={TEN} color={BLACKOPACITY}>
                  {item?.created_by?.username}
                </AppText>
              </View>
              <AppText style={{}}>
                {item?.contest_category_details?.WinningAmount}
              </AppText>
            </View>
          </View>
        );
      })
    );
  };
  return (
    <>
      <View style={styles.head}>
        <AppText type={TEN}>{`ALL TEAMS (${leaderBoards?.length})`}</AppText>
        <AppText type={TEN}>WINNINGS</AppText>
      </View>
      <View>
        {loading ? (
          <SpinnerSecond loading />
        ) : (
          <FlatList
            data={filteredArray}
            renderItem={renderLeaderBoard}
            keyExtractor={(item, index) => index?.toString()}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              filteredArray?.length == 1 ? null : mydataleaderboard
            }
            refreshControl={
              <RefreshControl refreshing={onRefresh} onRefresh={getPrizeList} />
            }
          />
        )}
      </View>
    </>
  );
};

export default LeaderBoardList;
