import {View, StyleSheet, FlatList} from 'react-native';
import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import InputBox from '../common/InputBox';
import {KeyBoardAware} from '../common/KeyboardAware';
import FastImage from 'react-native-fast-image';
import {universalPaddingHorizontal} from '../theme/dimens';
import {
  AppText,
  BLACK,
  FORTEEN,
  POPPINS_MEDIUM,
  SIXTEEN,
  TWELVE,
} from '../common/AppText';
import {AppSafeAreaView} from '../common/AppSafeAreaView';
import CommonHeader from '../components/matchCard/commonHeader/CommonHeader';
import {prizepool} from '../helper/image';
import {StatusBar} from 'native-base';
import CommonImageBackground from '../common/commonImageBackground';
import PrimaryButton from '../common/primaryButton';
import {Common_Tabs, MY_CONTEST} from '../navigation/routes';
import NavigationService from '../navigation/NavigationService';
import {NewColor, colors} from '../theme/color';
import {poppinsMedium} from '../theme/typography';

const CreateContest = () => {
  const route = useRoute();
  const [name, setName] = useState('');
  const [contestSize, setContestSize] = useState('');
  const [entryAmount, setEntryAmount] = useState('');
  const [activeTab, setActiveTab] = useState(2);
  const [selectNumberData, setSelectNumberData] = useState([]);
  // const data = [
  //   {
  //     id: 1,
  //     key: 10,
  //   },
  // ];
  let getMinusAmount = ((contestSize * entryAmount) / 100) * 10;
  let getPrizePoll = contestSize * entryAmount;
  let PrizePoll = getPrizePoll - getMinusAmount;
  let ContestSizeHalf = (contestSize / 100) * 50;


  useEffect(() => {
    for (let index = 0; index < ContestSizeHalf; index++) {
      let data = {
        id: 1,
        key: index + 1,
      };
      setSelectNumberData(Object.assign(selectNumberData, {[index]: data}));
    }
  }, [ContestSizeHalf]);

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.circleTopView}>
        <View style={[styles.circleView, {marginLeft: index == 0 ? null : 5}]}>
          <AppText style={{marginTop: 2}} color={BLACK}>
            {item.key}
          </AppText>
        </View>
      </View>
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
          activeTab={activeTab}
          setActiveTab={e => setActiveTab(e)}
          allContest={true}
        />
        <KeyBoardAware style={styles.mainContainer}>
          <AppText type={FORTEEN} style={styles.withdraw}>
            Create Contest
          </AppText>

          <View style={styles.box}>
            <InputBox
              placeholder="Enter your contest name"
              value={name}
              placeholderTextColor={'grey'}
              labelStyle={styles.label}
              label="Contest Name"
              returnKeyType="next"
              onChange={value => setName(value)}
              textInputBox={styles.textInputBox}
            />
            <View style={styles.dateContainer}>
              <InputBox
                placeholder="Enter size"
                value={contestSize}
                placeholderTextColor={'grey'}
                labelStyle={[styles.label, {}]}
                label="Contset Size"
                returnKeyType="next"
                onChange={value => setContestSize(value)}
                textInputBox={styles.textInputBox}
                style={{flex: 1, marginEnd: 10}}
              />
              <InputBox
                placeholder="Enter entry fess"
                value={entryAmount}
                placeholderTextColor={'grey'}
                labelStyle={[styles.label, {}]}
                label="Entry"
                returnKeyType="done"
                onChange={value => setEntryAmount(value)}
                textInputBox={styles.textInputBox}
                style={{flex: 1, marginStart: 10}}
              />
            </View>
          </View>
          <View style={styles.prizeContainer}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.prizeView}>
                  <FastImage
                    source={prizepool}
                    resizeMode="contain"
                    tintColor={colors.black}
                    style={{height: 24, width: 28}}
                  />
                </View>
                <View style={{alignSelf: 'center'}}>
                  <View style={{flexDirection: 'row'}}>
                    <AppText type={TWELVE} style={{marginLeft: 10}}>
                      Prize Pool
                    </AppText>
                  </View>
                </View>
              </View>

              <AppText
                type={TWELVE}
                weight={POPPINS_MEDIUM}
                style={{
                  alignSelf: 'center',
                  marginRight: 10,
                }}>
                {PrizePoll}
              </AppText>
            </View>
          </View>
          <AppText
            style={{
              marginTop: 10,
            }}
            type={SIXTEEN}
            weight={POPPINS_MEDIUM}>
            Select the number of winners
          </AppText>
          <FlatList
            data={selectNumberData?.length ? selectNumberData : []}
            renderItem={renderItem}
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}
          />
        </KeyBoardAware>
        <View
          style={{
            paddingHorizontal: universalPaddingHorizontal,
            marginBottom: 10,
          }}>
          <PrimaryButton
            onPress={() => NavigationService.navigate(MY_CONTEST)}
            title="CREATE CONTEST"
          />
        </View>
      </CommonImageBackground>
    </AppSafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: universalPaddingHorizontal,
    bottom: 70,
  },
  prizeContainer: {
    borderWidth: 1,
    borderColor: colors.borderLightBlue,
    borderRadius: 16,
    marginTop: 10,
  },
  prizeView: {
    backgroundColor: NewColor.linerBlackFive,
    height: 45,
    width: 45,
    marginHorizontal: 3,
    marginVertical: 3,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperContainer: {
    flex: 1,
    backgroundColor: 'black',
    padding: 0,
  },
  backgroundImageContainer: {
    height: 160,

    width: '100%',
    backgroundColor: 'transparent',
    padding: 0,
    position: 'relative',
  },
  bgImage: {
    height: '100%',

    width: '100%',
  },
  withdraw: {
    color: '#ffffff',
    marginTop: 20,
  },
  wallet: {
    color: '#ffffff',
    marginTop: 15,
  },

  box: {
    borderWidth: 1,
    borderColor: colors.borderLightBlue,
    borderRadius: 16,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  label: {
    marginTop: 0,
    marginBottom: 5,
  },
  textInputBox: {
    fontSize: 14,
    fontFamily: poppinsMedium,
    color: colors.black,
    marginTop: 5,
    flex: 1,
  },
  boxContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: 'row',
  },
  bottomBoxContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  image: {
    height: 24,
    width: 22,
    alignSelf: 'center',
  },

  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    alignSelf: 'center',
    width: '100%',
    // marginBottom: 10,
  },
  textInputStyle: {
    height: 40,
    width: 157,
  },
  circleView: {
    height: 30,
    width: 50,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleTopView: {
    marginTop: 10,
  },
});
export default CreateContest;
