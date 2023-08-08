import {Dimensions, StyleSheet} from 'react-native';
import {NewColor, colors} from '../../theme/color';

const styles = StyleSheet.create({
  card: {
    height: 150,
    width: Dimensions.get('window').width,
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftArrow: {
    height: 16,
    width: 16,
  },
  timeLeft: {
    color: 'white',
  },
  text: {
    fontSize: 10,
    fontWeight: '400',
    color: 'white',
    textAlign: 'left',
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  teamNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 20,
    // padding: 5,
    // paddingBottom: 10,
  },
  teamName: {
    color: 'white',
    opacity: 0.9,
  },
  teamLogo: {
    height: 45,
    width: 45,
  },
  midContainer: {
    padding: 15,
    paddingTop: 0,
    paddingBottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  teamView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorWhite: {
    color: 'white',
  },
  bottomContainer: {
    padding: 15,
    paddingTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  secondImage: {
    flex: 1,
  },
  groundContainer: {
    flex: 1,

  },
  playerImage: {
    height: 58,
    width: 42,
  },
  singlePlayerContainer: {
    alignItems: 'center',
    marginTop: 0,
  },
  playerName: {
    padding: 2,
    paddingHorizontal: 5,
    borderRadius: 2,
  },
  playerContainer: {
    flexDirection: 'row',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent:'center'
    // justifyContent: 'space-around',
  },
  title: {
    textAlign: 'center',
    marginTop: 20,
  },
  title2: {
    textAlign: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    paddingHorizontal: 10,
    // backgroundColor: 'black',
    height: 60,
    marginTop:5
  },
  btn: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: NewColor.linerWhite,
  },
  btn2: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  createContest: {
    borderWidth: 1,
    borderColor: NewColor.linerWhite,
  },
});

export default styles;
