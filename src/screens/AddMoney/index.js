import {View, StatusBar} from 'react-native';
import React, {useState} from 'react';
import Header from '../../common/Header';
import {AppSafeAreaView} from '../../common/AppSafeAreaView';
import {KeyBoardAware} from '../../common/KeyboardAware';
import CommonImageBackground from '../../common/commonImageBackground';
import {
  AppText,
  BLACK,
  LIGHTBLUE,
  POPPINS_MEDIUM,
  TWELVE,
} from '../../common/AppText';
import styles from './styles';
import InputBox from '../../common/InputBox';
import FastImage from 'react-native-fast-image';
import {horizontalLine, cross} from '../../helper/image';
import {TouchableOpacityView} from '../../common/TouchableOpacityView';

const AddMoney = () => {
  const [amount, setAmount] = useState('');
  const data = [
    {id: '1', rupay: '50'},
    {id: '2', rupay: '100'},
    {id: '3', rupay: '200'},
    {id: '4', rupay: '500'},
  ];
  return (
    <AppSafeAreaView hidden={false}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        networkActivityIndicatorVisible={true}
      />
      <KeyBoardAware>
        <CommonImageBackground common>
          <Header
            style={{
              marginTop: '12%',
            }}
            commonHeader
            title="Add Money"
          />
          <View style={styles.bottomContainer}>
            <View style={styles.box}>
              <View style={styles.mobileContainer}>
                <View>
                  <AppText type={TWELVE} color={LIGHTBLUE}>
                    Current Balances
                  </AppText>
                  <AppText type={TWELVE} color={LIGHTBLUE} style={styles.entry}>
                    Entry Fee
                  </AppText>
                </View>

                <View>
                  <AppText type={TWELVE} color={LIGHTBLUE}>
                    ₹0
                  </AppText>
                  <AppText color={LIGHTBLUE} type={TWELVE} style={styles.entry}>
                    ₹50
                  </AppText>
                </View>
              </View>
              <FastImage
                style={styles.horizontalLine}
                source={horizontalLine}
              />
              <View style={styles.middleContainer}>
                <AppText color={LIGHTBLUE} type={TWELVE} style={styles.entry}>
                  Join this contest by adding
                </AppText>
                <AppText color={LIGHTBLUE} type={TWELVE} style={styles.entry}>
                  ₹50
                </AppText>
              </View>
            </View>
            <View style={[styles.box, {flex: 1}]}>
              <AppText color={LIGHTBLUE} type={TWELVE}>
                Add cash to your account
              </AppText>
              <View style={{flexDirection: 'row'}}>
                <InputBox
                  placeholder="₹50"
                  style={{flex: 1, marginTop: 10}}
                  textInputBox={styles.textInputBox}
                  onChange={value => setAmount(value)}
                  closeImage={true}
                  value={amount}
                  onPressClose={() => setAmount('')}
                />
                <FastImage
                  style={{
                    height: 8,
                    width: 8,
                    alignSelf: 'center',
                    right: 20,
                    top: 4,
                  }}
                  resizeMode="contain"
                  source={cross}
                />
              </View>
              <View style={styles.buttonContainer}>
                {data?.map(item => {
                  return (
                    <TouchableOpacityView
                      onPress={() => setAmount(item.rupay)}
                      style={styles.rsContainer}>
                      <AppText
                        color={LIGHTBLUE}
                        weight={POPPINS_MEDIUM}
                        type={TWELVE}
                        style={styles.rs}>
                        + ₹{item.rupay}
                      </AppText>
                    </TouchableOpacityView>
                  );
                })}
                {/* <TouchableOpacityView style={styles.rsContainer}>
                  <AppText type={TWELVE} style={styles.rs}>
                    ₹50
                  </AppText>
                </TouchableOpacityView>
                <TouchableOpacityView style={styles.rsContainer}>
                  <AppText type={TWELVE} style={styles.rs}>
                    ₹100
                  </AppText>
                </TouchableOpacityView>
                <TouchableOpacityView style={styles.rsContainer}>
                  <AppText type={TWELVE} style={styles.rs}>
                    ₹200
                  </AppText>
                </TouchableOpacityView>
                <TouchableOpacityView style={styles.rsContainer}>
                  <AppText type={TWELVE} style={styles.rs}>
                    ₹500
                  </AppText>
                </TouchableOpacityView> */}
              </View>
            </View>
          </View>
        </CommonImageBackground>
      </KeyBoardAware>
    </AppSafeAreaView>
  );
};

export default AddMoney;
