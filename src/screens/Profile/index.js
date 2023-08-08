import {View, ImageBackground, FlatList, ScrollView} from 'react-native';
import React from 'react';
import {
  contest_position,
  cricketKit,
  placeholderImage,
  PriceCupBlue,
  Profilebackground,
  ProfileBackgroundImage,
  reward,
} from '../../helper/image';
import {
  AppText,
  POPPINS,
  POPPINS_MEDIUM,
  POPPINS_SEMI_BOLD,
  SIXTEEN,
  TWELVE,
  WHITE,
} from '../../common/AppText';
import {useSelector} from 'react-redux';
import {AppSafeAreaView} from '../../common/AppSafeAreaView';
import LinearGradient from 'react-native-linear-gradient';
import ActivityCard from '../../common/Profile/activityCard';
import Level from '../../common/Profile/level';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import SecondaryButton from '../../common/secondaryButton';
import NavigationService from '../../navigation/NavigationService';
import {
  MY_BALANCE,
  PROFILE_EDIT,
  ADD_MONEY_SCREEN,
} from '../../navigation/routes';
import {IMAGE_BASE_URL} from '../../helper/utility';
import {StatusBar} from 'native-base';
import PrimaryButton from '../../common/primaryButton';
import {NewColor, colors} from '../../theme/color';

const data = [
  {
    image: PriceCupBlue,
    title: 'Played Contest',
    earning: '10',
  },
  {
    image: cricketKit,
    title: 'Match Played',
    earning: '10',
  },
  {
    image: reward,
    title: 'Total Series',
    earning: '14',
  },
  {
    image: contest_position,
    title: 'Total Sports',
    earning: '21',
  },
];

const Profile = props => {
  const userData = useSelector(state => {
    return state.profile.userData;
  });
  console.log(userData, 'userDatauserDatauserDatauserData');

  const {mobile_number, full_name, total_balance, cash_bonus, winning_amount} =
    userData ?? '';
  const data1 = [
    {
      title: 'Total Balance',
      earning: `${total_balance}`,
      color1: '#9E96FF',
      color2: '#DF9DFE',
    },
    {
      title: 'Cash Bonus',
      earning: `${cash_bonus}`,
      color1: '#3FAC8A',
      color2: '#9CCF75',
    },
    {
      title: 'Winning Amount',
      earning: `${winning_amount}`,
      color1: '#FB8D89',
      color2: '#FFB879',
    },
  ];
  return (
    <AppSafeAreaView statusColor={'transparent'} hidden={false}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        networkActivityIndicatorVisible={true}
      />

      <ScrollView style={{backgroundColor: NewColor.linerWhite}}>
        <ImageBackground
          source={Profilebackground}
          resizeMode={'cover'}
          style={styles.ImageBackground}>
          <View style={styles.secondView}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              colors={[
                colors.profileOne,
                colors.profileTwo,
                colors.profileThree,
              ]}
              style={styles.profileImageView}>
              <FastImage
                style={styles.profileImage}
                source={
                  userData?.logo
                    ? {uri: `${IMAGE_BASE_URL}${userData?.logo}`}
                    : placeholderImage
                }
                resizeMode={'cover'}
              />
            </LinearGradient>
            <View style={styles.informationView}>
              <AppText
                color={WHITE}
                type={SIXTEEN}
                numberOfLines={1}
                weight={POPPINS_MEDIUM}>
                {full_name}
              </AppText>
              <AppText
                color={WHITE}
                type={TWELVE}
                numberOfLines={1}
                weight={POPPINS}>
                {mobile_number}
              </AppText>
            </View>
            <SecondaryButton
              title="Edit"
              onPress={() => NavigationService.navigate(PROFILE_EDIT)}
              buttonStyle={styles.editButton}
              titleStyle={styles.editButtonTitle}
              buttonViewStyle={{
                height: 25,
                backgroundColor: NewColor.linerWhite,
                borderColor: colors.borderLightBlue,
                borderRadius: 16,
                borderWidth: 1,
              }}
            />
          </View>
        </ImageBackground>
        <View style={styles.backgroundColorContainer}>
          <View style={styles.topView}>
            <View style={styles.balanceCard}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}>
                {data1.map((item, index) => {
                  return (
                    <LinearGradient
                      style={{
                        height: 80,
                        borderRadius: 16,
                        backgroundColor: 'green',
                        overflow: 'hidden',
                        display: 'flex',
                        justifyContent: 'center',
                        width: '31%',
                      }}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      colors={[item.color1, item.color2]}>
                      <View
                        style={{
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}>
                        <AppText color={WHITE} weight={POPPINS_SEMI_BOLD}>
                          {item.earning == `₹${undefined}` ||
                          item?.earning == `${undefined}`
                            ? '₹00'
                            : `₹${Math.round(item.earning).toFixed(2)}`}
                        </AppText>
                        <AppText color={WHITE} type={TWELVE} weight={POPPINS}>
                          {item.title}
                        </AppText>
                      </View>
                    </LinearGradient>
                  );
                })}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginTop: 20,
                  width: '100%',
                  paddingHorizontal: 5,
                }}>
                <SecondaryButton
                  onPress={() => NavigationService.navigate(ADD_MONEY_SCREEN)}
                  buttonStyle={styles.buttonStyle}
                  titleStyle={{color: colors.black, marginTop: -2}}
                  btnStyle={{
                    backgroundColor: NewColor.linerWhite,
                    borderColor: '#AD53CC',
                    height: 45,
                  }}
                  title={'ADD CASH'}
                />
                <PrimaryButton
                  buttonStyle={styles.buttonStyle}
                  onPress={() => {
                    NavigationService.navigate(MY_BALANCE);
                  }}
                  title="WITHDRAW"
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.topView}>
          <Level data={userData} />
          <AppText type={SIXTEEN} weight={POPPINS_SEMI_BOLD} style={{top: 10}}>
            Your Activity
          </AppText>

          <FlatList
            data={data}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{
              marginTop: 10,
            }}
            renderItem={({item, index}) => (
              <ActivityCard
                key={item?.title}
                rowReverse={false}
                title={item.title}
                image={item.image}
                value={item.earning}
                index={index}
              />
            )}
          />
        </View>
      </ScrollView>
      {/* </ImageBackground> */}
    </AppSafeAreaView>
  );
};

export default Profile;
