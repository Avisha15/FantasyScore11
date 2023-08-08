import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {appOperation} from '../../appOperation';
import {AppText, TEN} from '../../common/AppText';
import {toastAlert} from '../../helper/utility';
import styles from './styles';
import {SpinnerSecond} from '../../common/SpinnerSecond';
import {RefreshControl} from 'react-native-gesture-handler';
const Winnings = ({id, getScore}) => {
  const data = [{}, {}, {}];
  const [prizeList, setPrizeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [onRefresh, setOnrefresh] = useState(false);
  const getPrizeList = async () => {
    try {
      setOnrefresh(true);
      getScore();
      const res = await appOperation.customer.getPrizeList(id);
      // console.log(res);
      if (res.code == 200) {
        // toastAlert.showToastError(res?.message);
        setPrizeList(res?.data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      setOnrefresh(false);
    }
  };
  useEffect(() => {
    getPrizeList();
  }, []);
  const renderWinnings = ({item}) => {
    return (
      <View style={[styles.winningContainer]}>
        <AppText>{`#${item?.StartRank}-${item?.EndRank}`}</AppText>
        <AppText style={{fontSize: 12}}>₹{Math.round(item?.Price)}</AppText>
      </View>
    );
  };
console.log(prizeList,'=prizeListprizeListprizeList');
  return (
    <>
      <View style={styles.head}>
        <AppText type={TEN}>RANK</AppText>
        <AppText type={TEN}>WINNINGS</AppText>
      </View>
      <View>
        {loading ? (
          <SpinnerSecond loading />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={prizeList}
            renderItem={renderWinnings}
            contentContainerStyle={{flex: 1}}
            refreshControl={
              <RefreshControl refreshing={onRefresh} onRefresh={getPrizeList} />
            }
          />
        )}
      </View>
    </>
  );
};

export default Winnings;
