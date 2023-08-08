
import React, {useMemo, useState} from 'react';
import {FlatList, View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {TouchableOpacityView} from '../../../common/TouchableOpacityView';
import styles from './styles';
import {AppText, FORTEEN, LIGHTBLUE} from '../../../common/AppText';
import {colors} from '../../../theme/color';

const CommonTabs = ({activeTab, setActiveTab, totalCount, completeMatch, details}) => {
  const data = [
    {
      id: 1,
      title: 'Contest',
    },
    {
      id: 2,
      title: `My Contest (${totalCount[0]})`,
    },
    {
      id: 3,
      title: `My Team (${totalCount[1]})`,
    },
  ];
  const dataTwo = [
    {
      id: 2,
      title: `My Contest (${totalCount[0]})`,
    },
    {
      id: 3,
      title: `My Team (${totalCount[1]})`,
    },
  ];
  return (
    <View style={styles.container}>
      {completeMatch ||  details?.Status == 'Live' ? (
        <>
          {dataTwo?.map(item => {
            return item.id == activeTab ? (
              <View
                style={{
                  flexDirection: 'column',
                  width: '50%' ,
                  height: 38,
                  justifyContent: 'space-evenly',
                  padding: 5,
                  alignItems: 'center',
                }}>
                <AppText type={FORTEEN} color={LIGHTBLUE}>
                  {item?.title}
                </AppText>
                <LinearGradient
                  style={{height: 2, width: 102}}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[
                    colors.borderBackColor,
                    colors.borderPick,
                  ]}></LinearGradient>
              </View>
            ) : (
              <TouchableOpacityView
                style={[
                  styles.tabs,
                  {
                    width:'50%' ,
                  },
                ]}
                onPress={() => setActiveTab(item?.id)}>
                <AppText type={FORTEEN}>{item?.title}</AppText>
              </TouchableOpacityView>
            );
          })}
        </>
      ) : (
        <>
          {data?.map(item => {
            return item.id == activeTab ? (
              <View
                style={{
                  flexDirection: 'column',
                  width: '33%',
                  height: 38,
                  justifyContent: 'space-evenly',
                  padding: 5,
                  alignItems: 'center',
                }}>
                <AppText type={FORTEEN} color={LIGHTBLUE}>
                  {item?.title}
                </AppText>
                <LinearGradient
                  style={{height: 2, width: 102}}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[
                    colors.borderBackColor,
                    colors.borderPick,
                  ]}></LinearGradient>
              </View>
            ) : (
              <TouchableOpacityView
                style={[
                  styles.tabs,
                  {
                    width: '33%',
                  },
                ]}
                onPress={() => setActiveTab(item?.id)}>
                <AppText type={FORTEEN}>{item?.title}</AppText>
              </TouchableOpacityView>
            );
          })}
        </>
      )}
    </View>
  );
};

export default CommonTabs;
