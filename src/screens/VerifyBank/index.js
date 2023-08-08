import {View} from 'react-native';
import React, {useState} from 'react';
import Header from '../../common/Header';
import {AppSafeAreaView} from '../../common/AppSafeAreaView';
import {KeyBoardAware} from '../../common/KeyboardAware';
import CommonImageBackground from '../../common/commonImageBackground';
import {AppText, FORTEEN} from '../../common/AppText';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import InputBox from '../../common/InputBox';
import PrimaryButton from '../../common/primaryButton';
import DropdownComponent from '../../common/Dropdown';
import {universalPaddingHorizontal} from '../../theme/dimens';
import {RootState} from '../../libs/rootReducer';
import {toastAlert} from '../../helper/utility';
import {updateKyc} from '../../actions/profileAction';
import {StatusBar} from 'native-base';

const VerifyBank = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state?.profile?.isLoading);
  const [accountNo, setAccountNo] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [bank, setBank] = useState('');
  const [branch, setBranch] = useState('');
  const [state, setState] = useState('Rajasthan');
  const userData = useSelector(state => {
    return state.profile.userData;
  });
  console.log(userData?._id, 'adasdasd');
  const data = [
    {value: 'Delhi', label: 'Delhi'},
    {value: 'Jaipur', label: 'Jaipur'},
    {value: 'Mumbai', label: 'Mumbai'},
    {value: 'Punjab', label: 'Punjab'},
  ];
  const onChangeValue = value => {
    setState(value?.value);
  };

  const colors = useSelector((state: RootState) => {
    return state.theme.colors;
  });
  const onSubmit = () => {
    if (!bank || !accountNo || !ifsc || !branch || !state)
      return toastAlert.showToastError('Please fill all Value');
    const data = {
      id: userData?._id,
      data: {
        name: bank,
        ac_number: accountNo,
        ifsc: ifsc,
        branch: branch,
        state: state,
      },
    };

    dispatch(updateKyc(data));
  };
  return (
    <AppSafeAreaView hidden={false}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        networkActivityIndicatorVisible={true}
      />
      <CommonImageBackground common>
        <Header
          commonHeader
          title="Verify Bank Account"
          style={{padding: universalPaddingHorizontal, marginTop: '10%'}}
        />
        <KeyBoardAware style={styles.bottomContainer}>
          <AppText type={FORTEEN} style={[styles.withdraw, {marginLeft: 2}]}>
            Enter Your Bank Details
          </AppText>
          <View style={styles.box}>
            <InputBox
              placeholder="Enter your account number"
              value={accountNo}
              placeholderTextColor={colors.grey}
              labelStyle={styles.label}
              label="Account Number"
              returnKeyType="next"
              onChange={value => setAccountNo(value)}
              textInputBox={styles.textInputBox}
            />
            <InputBox
              placeholder="Enter 11 digit IFSC code"
              value={ifsc}
              placeholderTextColor={colors.grey}
              labelStyle={[styles.label, {marginTop: 15}]}
              label="IFSC Code"
              returnKeyType="next"
              onChange={value => setIfsc(value)}
              textInputBox={styles.textInputBox}
            />

            <InputBox
              placeholder="Enter your bank name"
              value={bank}
              placeholderTextColor={colors.grey}
              labelStyle={[styles.label, {marginTop: 15}]}
              label="Bank Name"
              returnKeyType="next"
              onChange={value => setBank(value)}
              textInputBox={styles.textInputBox}
            />
            <InputBox
              placeholder="Your branch name"
              value={branch}
              placeholderTextColor={colors.grey}
              labelStyle={[styles.label, {marginTop: 15}]}
              label="Branch Name"
              returnKeyType="next"
              onChange={value => setBranch(value)}
              textInputBox={styles.textInputBox}
            />
            <DropdownComponent
              label={'State'}
              value={state}
              placeholder="Rajasthan"
              items={data}
              onChangeValue={onChangeValue}
              style={{marginBottom: 10}}
            />
          </View>
        </KeyBoardAware>
        <View
          style={{
            paddingHorizontal: universalPaddingHorizontal,
            marginBottom:10
          }}>
          <PrimaryButton
            onPress={onSubmit}
            buttonStyle={styles.button}
            title="SUBMIT"
          />
        </View>
      </CommonImageBackground>
    </AppSafeAreaView>
  );
};

export default VerifyBank;
