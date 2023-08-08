/* eslint-disable react/self-closing-comp */
import React from 'react';
import {Dimensions, Modal, Pressable, StyleSheet, View} from 'react-native';
import {
  AppText,
  EIGHTEEN,
  FORTEEN,
  LIGHTBLUE,
  POPPINS_BOLD,
  POPPINS_BOLD_ITALIC,
  SEMI_BOLD,
  SIXTEEN,
  THIRTEEN,
} from './AppText';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {CLOSE_WHITE_ICON} from '../helper/image';
import {poppinsBoldItalic} from '../theme/typography';
import {
  getContestList,
  getMyJoinedContest,
  getMyTeam,
  joinContest,
  setContestData,
} from '../slices/matchSlice';
import NavigationService from '../navigation/NavigationService';
import {
  ADD_MONEY_SCREEN,
  MY_BALANCE,
  MY_CONTEST,
  PAYMENT_OPTIONS_SCREEN,
} from '../navigation/routes';
import {fixedToTwo} from '../helper/utility';
import SecondaryButton from './secondaryButton';
import {border} from 'native-base/lib/typescript/theme/styled-system';
import {TouchableOpacityView} from './TouchableOpacityView';
import LinearGradient from 'react-native-linear-gradient';
import {NewColor, colors} from '../theme/color';

const Confirmation = ({
  isModalVisible,
  setIsModalVisible,
  details,
  matchDetails,
  onClose,
  selectedTeam,
  teamLength,
}) => {
  const dispatch = useDispatch();
  const myTeam = useSelector(state => state?.match?.myTeams);
  const userData = useSelector(state => {
    return state.profile.userData;
  });
  const selectedMatch = useSelector(state => state?.match?.selectedMatch);
  const contestData = useSelector(state => state?.match?.contestData);
  const {EnteryFee, UsableBonusPercantage, contest_category_id, inner_data_id} =
    selectedMatch ?? '';
  const {_id: matchDetails_id} = matchDetails ?? '';

  const {match_id, matchid, _id} = myTeam[0] ?? '';
  // console.log(_id,'matchDetails_idmatchDetails_id')

  const {cash_bonus, total_balance} = userData ?? '';
  // console.log(total_balance,'userDatauserDatauserDatauserData')
  let usable = (Number(EnteryFee) * Number(UsableBonusPercantage)) / 100;
  let usableBonus = `${
    EnteryFee == 0 ? 0 : cash_bonus >= usable ? usable : cash_bonus
  }`;
  let payAmount = `${Number(EnteryFee) - Number(usableBonus)}`;

  const onSubmit = () => {
    if (payAmount <= total_balance) {
      const data = {
        match_id: teamLength == true ? selectedTeam?.match_id : match_id,
        matchid: teamLength == true ? selectedTeam?.matchid : matchid,
        teams_id: [teamLength == true ? selectedTeam?._id : _id],
        contest_category_id: contest_category_id,
        match_contest_category_id: inner_data_id,
        method: 'wallet',
        amount: payAmount,
      };
      setIsModalVisible(false);
      console.log(data, 'datadatadatadatadata');
      dispatch(joinContest(data));
      dispatch(getMyJoinedContest(contestData?._id));
      let outputObject = {};
      dispatch(
        getContestList(outputObject, match_id),
      );
      dispatch(
        getMyTeam(teamLength == true ? selectedTeam?.match_id : match_id),
      );
      // dispatch(
      //   getMyJoinedContest(
      //     teamLength == true ? selectedTeam?.match_id : match_id,
      //   ),
      // );
      onClose ? onClose() : null;
      setTimeout(() => {
        dispatch(setContestData(matchDetails));
        NavigationService.navigate(MY_CONTEST);
      }, 1000);
    } else {
      setIsModalVisible(false);
      onClose ? onClose() : null;
      NavigationService.navigate(MY_BALANCE, {
        ...selectedMatch,
        matchDetails: matchDetails,
        usableBonus,
        payAmount,
        total_balance,
        value: payAmount,
      });
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        setIsModalVisible(!isModalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalContainer}>
          <View style={styles.modalTopSection}>
            <AppText type={SIXTEEN} weight={POPPINS_BOLD_ITALIC}>
              CONFIRMATION
            </AppText>
            <Pressable
              style={{
                position: 'absolute',
                right: 0,
                height: 42,
                width: 42,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setIsModalVisible(false)}>
              <FastImage
                source={CLOSE_WHITE_ICON}
                style={styles.closeWhiteIcon}
                resizeMode="contain"
                tintColor={colors.black}
              />
            </Pressable>
          </View>
          <View
            style={{
              paddingHorizontal: 10,
              borderBottomWidth: 1,
              borderBottomColor: colors.borderLightBlue,
              paddingBottom: 10,
            }}>
            <View style={styles.center}>
              <AppText type={SIXTEEN} weight={SEMI_BOLD}>
                Contest Fee
              </AppText>
              <AppText type={SIXTEEN} color={LIGHTBLUE} weight={SEMI_BOLD}>
                ₹{`${EnteryFee}`}
              </AppText>
            </View>
            {/* <View style={[styles.center, {marginTop: 15}]}>
              <AppText type={FORTEEN} weight={SEMI_BOLD}>
                Current Balance
              </AppText>
              <AppText type={FORTEEN} style={{opacity: 0.5}} weight={SEMI_BOLD}>
                ₹{`${fixedToTwo(total_balance)}`}
              </AppText>
            </View> */}
            <View style={[styles.center, {marginTop: 5}]}>
              <AppText type={FORTEEN} weight={SEMI_BOLD}>
                Usable Balance{'\n'}(Unutilized + Winning + Bonus)
              </AppText>
              <AppText type={FORTEEN} weight={SEMI_BOLD}>
                - ₹ {usableBonus}
              </AppText>
            </View>
          </View>
          <View style={[styles.center, {marginTop: 10, paddingHorizontal: 10}]}>
            <AppText
              type={FORTEEN}
              style={{color: '#4DFF7F'}}
              weight={SEMI_BOLD}>
              To Pay
            </AppText>
            <AppText
              style={{color: '#4DFF7F'}}
              type={FORTEEN}
              weight={SEMI_BOLD}>
              ₹{payAmount}
            </AppText>
          </View>
          <View style={styles.detailsStyle}>
            <AppText weight={SEMI_BOLD}>
              By Joining this contest, you accept Fantasy Score 11’s T&C and
              confirm that you are not a resident of Assam, Odisha, Nagaland,
              Andhra Pradesh, Sikkim, Telangana.
            </AppText>
          </View>
          <TouchableOpacityView
            onPress={onSubmit}
            style={[
              styles.btn,
              {
                width: '90%',
                alignSelf: 'center',
              },
            ]}>
            <LinearGradient
              style={[
                styles.btn,
                {
                  width: '100%',
                },
              ]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#5389C4', '#7F3291']}>
              <AppText
                type={EIGHTEEN}
                style={{
                  color: 'white',
                }}
                weight={POPPINS_BOLD}>
                {payAmount <= total_balance ? 'Join contest' : 'Add cash'}
              </AppText>
            </LinearGradient>
          </TouchableOpacityView>
          {/* <SecondaryButton
            title={payAmount <= total_balance ? 'Join contest' : 'Add cash'}
            onPress={onSubmit}
            buttonStyle={styles.editButton}
            titleStyle={styles.editButtonTitle}
            btnStyle={{
              borderWidth:0,
            }}
            buttonViewStyle={{height: 45, 
              borderRadius:8,
              backgroundColor:'#5389C4'}}
          /> */}
        </View>
      </View>
    </Modal>
  );
};

export default Confirmation;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: NewColor.linerBlacklight,
  },
  modalContainer: {
    width: Dimensions.get('window').width - 20,
    // height: 243,
    backgroundColor: NewColor.linerWhite,
    borderRadius: 16,
    overflow: 'hidden',
    // justifyContent: 'space-between',
    paddingBottom: 20,
  },
  modalTopSection: {
    height: 54,
    backgroundColor: NewColor.linerBlackFive,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 10,
  },
  closeWhiteIcon: {
    height: 12,
    width: 12,
  },
  center: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  editButton: {width: '90%', alignSelf: 'center', marginTop: 10, height: 50},
  editButtonTitle: {
    fontSize: 18,
    fontFamily: poppinsBoldItalic,
    // fontStyle: 'italic',
  },
  detailsStyle: {
    borderWidth: 1,
    borderColor: colors.borderLightBlue,
    marginHorizontal: 20,
    paddingHorizontal: 17,
    paddingVertical: 15,
    borderRadius: 16,
    marginVertical: 10,
    backgroundColor: NewColor.linerBlackFive,
  },
  btn: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});
