import {View, StatusBar} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../common/Header';
import {AppSafeAreaView} from '../../common/AppSafeAreaView';
import {KeyBoardAware} from '../../common/KeyboardAware';
import CommonImageBackground from '../../common/commonImageBackground';
import {
  AppText,
  ELEVEN,
  FORTEEN,
  GRY,
  POPPINS_MEDIUM,
  THIRTEEN,
} from '../../common/AppText';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import InputBox from '../../common/InputBox';
import PrimaryButton from '../../common/primaryButton';
import DropdownComponent from '../../common/Dropdown';
import {upload} from '../../helper/image';
import FastImage from 'react-native-fast-image';
import {Primary, universalPaddingHorizontal} from '../../theme/dimens';
import {toastAlert} from '../../helper/utility';
import ImagePicker from 'react-native-image-crop-picker';
import {TouchableOpacityView} from '../../common/TouchableOpacityView';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {appOperation} from '../../appOperation';
import {updateKyc} from '../../actions/profileAction';
import {colors} from '../../theme/color';

const VerifyPAN = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state?.profile?.isLoading);

  const [name, setName] = useState('');
  const [pan, setPan] = useState('');
  const [dob, setDob] = useState('');
  const [state, setState] = useState('Rajasthan');
  const [panImage, setPanImage] = useState('');
  const [reason, setReason] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const data = [
    {value: 'Delhi', label: 'Delhi'},
    {value: 'Jaipur', label: 'Jaipur'},
    {value: 'Mumbai', label: 'Mumbai'},
    {value: 'Punjab', label: 'Punjab'},
  ];
  const onChangeValue = value => {
    setState(value?.value);
  };

  const onSubmit = () => {
    if (!name || !pan || !dob || !state) {
      return toastAlert.showToastError('Please fill all value');
    }
    const data = {
      type: 'pan',
      data: {
        name: name,
        pan_number: pan,
        state: state,
        dob: dob,
      },
      file: imageUrl,
    };
    dispatch(updateKyc(data));
  };
  const openPicker = async () => {
    ImagePicker.openCamera({
      width: 485,
      height: 485,
      cropping: true,
    }).then(image => {
      const data = {
        uri: image.path,
        name: image.modificationDate + '.' + image.mime.split('/')[1],
        type: image.mime,
      };

      setImageData(data);
    });
  };
  const uploadImage = async () => {
    try {
      const uploadData = new FormData();
      uploadData.append('file', imageData);
      const res = await appOperation.customer.uploadImg(uploadData);
      if (res?.code == 200) {
        setImageUrl(res?.data);
      }
    } catch (e) {
      console.log('error in upload', e);
    }
  };
  useEffect(() => {
    if (imageData) {
      uploadImage();
    }
  }, [imageData]);
  const handleConfirm = date => {
    setDob(moment(date).format('DD-MM-YYYY'));
    setIsDatePickerVisible(false);
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
          style={{padding: universalPaddingHorizontal, marginTop: '10%'}}
          commonHeader
          title="Verify PAN Card"
        />
        <KeyBoardAware style={styles.bottomContainer}>
          <AppText
            weight={POPPINS_MEDIUM}
            type={FORTEEN}
            style={[styles.withdraw, {marginLeft: 2}]}>
            Enter Your PAN Card Details
          </AppText>
          <View style={styles.box}>
            <InputBox
              placeholder="Enter your name"
              value={name}
              placeholderTextColor={colors.grey}
              labelStyle={styles.label}
              label="Name"
              returnKeyType="next"
              onChange={value => setName(value)}
              textInputBox={styles.textInputBox}
            />

            <InputBox
              placeholder="Enter your PAN Number"
              value={pan}
              placeholderTextColor={colors.grey}
              labelStyle={[styles.label, {marginTop: 20}]}
              label="PAN Number"
              returnKeyType="next"
              onChange={value => setPan(value)}
              textInputBox={styles.textInputBox}
            />
            {/* <InputBox
              placeholder="Enter your DOB"
              value={pan}
              placeholderTextColor={colors.grey}
              labelStyle={[styles.label(colors), {marginTop: 20}]}
              label="DOB"
              returnKeyType="next"
              onChange={value => setPan(value)}
              textInputBox={styles.textInputBox(colors)}
            /> */}
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={() => setIsDatePickerVisible(false)}
              maximumDate={moment().subtract(18, 'years').toDate()}
            />
            <AppText
              weight={POPPINS_MEDIUM}
              style={{
                paddingVertical: 10,
                marginTop: 10,
              }}
              type={ELEVEN}>
              DOB
            </AppText>
            <TouchableOpacityView
              onPress={() => setIsDatePickerVisible(true)}
              style={{
                borderWidth: 1,
                borderRadius: 5,
                borderColor: colors.borderLightBlue,
                height: Primary.Height,
                paddingHorizontal: 15,
                justifyContent: 'center',
              }}>
              {!dob ? (
                <AppText color={GRY}>Enter Your Dob</AppText>
              ) : (
                <AppText color={GRY}>{dob}</AppText>
              )}
            </TouchableOpacityView>

            <DropdownComponent
              label={'State'}
              value={state}
              placeholder="Rajasthan"
              items={data}
              setValue={setState}
              onChangeValue={onChangeValue}
            />
          </View>
          <AppText
            weight={POPPINS_MEDIUM}
            type={THIRTEEN}
            style={styles.upload}>
            Upload your PAN Card
          </AppText>
          <TouchableOpacityView
            onPress={openPicker}
            style={styles.uploadContainer}>
            <FastImage
              style={imageData?.uri ? styles.image2 : styles.image}
              resizeMode="contain"
              tintColor={colors.black}
              source={imageData?.uri ? {uri: imageData?.uri} : upload}
            />
          </TouchableOpacityView>
        </KeyBoardAware>
        <View
          style={{
            paddingHorizontal: universalPaddingHorizontal,
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

export default VerifyPAN;
