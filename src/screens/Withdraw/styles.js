import {StyleSheet} from 'react-native';

import {Screen} from '../../theme/dimens';

const styles = StyleSheet.create({
  bottomContainer: {
    marginHorizontal: 20,
  },
  withdraw: colors => ({
    color: colors.white,
    marginTop: Screen.Height / 24,
  }),
  wallet: colors => ({
    color: 'white',
    marginTop: 15,
  }),

  box: colors => ({
    borderWidth: 2,
    borderColor: '#122B47',
    borderRadius: 16,
    marginVertical: 10,
  }),
  textInputBox: {
    height: 45,
    width: 330,
    fontSize:12,
    fontWeight:'300'
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
  button: {
    marginTop: Screen.Height / 2.4,
  },
  otp: colors => ({
    color: colors.white,
    marginTop: 4,
  }),
  image: {
    height: 24,
    width: 22,
    alignSelf: 'center',
  },
  rightText: colors => ({
    color: colors.white,
  }),
  rightContainer: {
    marginLeft: 10,
    alignSelf: 'center',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ammount: colors => ({
    color: colors.code,
    marginTop: 4,
  }),
});

export default styles;
