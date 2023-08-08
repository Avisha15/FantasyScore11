import {Share, ToastAndroid} from 'react-native';
// import {Toast} from 'native-base';
import {poppinsMedium} from '../theme/typography';
import {appOperation} from '../appOperation';
import {useDispatch, useSelector} from 'react-redux';

export const shareToAny = (message: string) => {
  const shareOptions = {
    message: message,
  };

  Share.share(shareOptions);
};

export const validateEmail = (email: string) => {
  const expression =
    /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

  return expression.test(email);
};

export const validateMobile = (number: string) => {
  const expression = /^[0-9]*$/;
  return expression.test(number);
};
export function numberWithCommas(x) {
  return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
export const fixedToTwo = value => {
  let temp = value?.toFixed(2);
  return temp;
};
export const IMAGE_BASE_URL = 'http://65.0.134.70:3000/';

export const toastAlert = {
  showToastSuccess: (message, duration = 2500) => {},
  showToastError: (message: string, duration = 2500) => {
    ToastAndroid.show(message, ToastAndroid.BOTTOM, ToastAndroid.LONG);
  },
};

export const logError = error => {
  console.log(error);
};
