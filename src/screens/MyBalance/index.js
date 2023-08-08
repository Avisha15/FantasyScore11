import {View, StyleSheet, StatusBar} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  transactionIcon,
  managePayment,
  kycIcon,
} from '../../helper/image';
import PrimaryButton from '../../common/primaryButton';
import {AppSafeAreaView} from '../../common/AppSafeAreaView';
import Header from '../../common/Header';
import {poppinsBoldItalic} from '../../theme/typography';
import {
  AppText,
  FORTEEN,
  POPPINS_LIGHT,
  TWENTY_FOUR,
} from '../../common/AppText';
import Listing from '../../common/Profile/listing';
import CommonContainer from '../../common/Profile/commonContainer';
import ListingItem from '../../common/Profile/listingItem';
import {useDispatch, useSelector} from 'react-redux';
import NavigationService from '../../navigation/NavigationService';
import {
  MANAGE_PAYMENTS_SCREEN,
  ADD_MONEY_SCREEN,
  KYC_SCREEN,
  TRANSACTION_SCREEN,
} from '../../navigation/routes';
import {getKycDetails} from '../../actions/profileAction';
import {fixedToTwo} from '../../helper/utility';
import CommonImageBackground from '../../common/commonImageBackground';

const MyBalance = () => {
  const dispatch = useDispatch();
  const colors = useSelector(state => state.theme.colors);
  const userData = useSelector(state => {
    return state.profile.userData;
  });
  const userWalletData = useSelector(state => {
    return state.profile.userWalletData;
  });
  const ibatBalance = useSelector(state => {
    return state.profile.ibatBalance;
  });
  const kycDetails = useSelector(state => {
    return state.profile.kycDetails;
  });
  const {winning_amount, cash_bonus, total_balance} = userData ?? '';
  const {wallet_address, wallet_balance} = userWalletData ?? '';
  const isUserVerified =
    kycDetails?.mobile_verified == 1 &&
    kycDetails?.email_verified == 1 &&
    kycDetails?.pan_verified == 1 &&
    kycDetails?.bank_verified == 1;
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    dispatch(getKycDetails());
  }, []);
  return (
    <AppSafeAreaView hidden={false}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        networkActivityIndicatorVisible={true}
      />
      <CommonImageBackground common>
        <Header
          style={{
            marginTop: '12%',
          }}
          title="My Balance"
          commonHeader
        />
        <View style={{paddingHorizontal: 20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 30,
            }}>
            <View>
              <AppText
                type={FORTEEN}
                weight={POPPINS_LIGHT}>
                Your Total Balance
              </AppText>
              <AppText
                type={TWENTY_FOUR}
                weight={POPPINS_LIGHT}>
                ₹{Math.round(total_balance).toFixed(2)}
              </AppText>
            </View>
            <View>
              <PrimaryButton
                onPress={() => NavigationService.navigate(ADD_MONEY_SCREEN)}
                title="ADD CASH"
                buttonStyle={styles.button}
                titleStyle={styles.addCashButtonTitle}
                smallBtn={styles.smallBtn}
              />
            </View>
          </View>
        </View>

        <View style={{paddingHorizontal: 20}}>
          <View
            style={{
              marginTop: 30,
            }}>
            <CommonContainer
              style={{
                width: '100%',
                height: 215,
                marginTop: 15,
                paddingHorizontal: 0,
              }}>
              <ListingItem title={'Amount added'} info={'₹30'} />
              <ListingItem
                title={'Winnings'}
                info={`₹${fixedToTwo(winning_amount)}`}
                button
              />
              <ListingItem
                title={'Cash Bonus'}
                border
                info={`₹${fixedToTwo(cash_bonus)}`}
              />
            </CommonContainer>
          </View>
          <CommonContainer
            style={{
              width: '100%',
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <Listing
              onPressMain={() => NavigationService.navigate(TRANSACTION_SCREEN)}
              Icon={transactionIcon}
              Name={'Transaction History'}
              next
            />
          </CommonContainer>
          {isUserVerified && (
            <CommonContainer
              style={{
                width: '100%',
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <Listing
                onPressMain={() => NavigationService.navigate(KYC_SCREEN)}
                Icon={kycIcon}
                Name={'KYC Details'}
                next
              />
            </CommonContainer>
          )}
          <CommonContainer
            style={{
              width: '100%',
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <Listing
              onPressMain={() =>
                NavigationService.navigate(MANAGE_PAYMENTS_SCREEN)
              }
              Icon={managePayment}
              Name={'Manage Payments'}
              next
            />
          </CommonContainer>
        </View>
      </CommonImageBackground>
    </AppSafeAreaView>
  );
  60;
};

export default MyBalance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0E0F',
  },
  ImageBackground: {
    height: 185,
    width: '100%',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },

  addCashButtonTitle: {
    fontFamily: poppinsBoldItalic,
    fontSize: 12,
    fontWeight: '700',
  },
  button: {},
  smallBtn: {
    width: 97,
    height: 37,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
