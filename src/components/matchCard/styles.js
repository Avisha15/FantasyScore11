import {StyleSheet} from 'react-native';
import {NewColor, colors} from '../../theme/color';

const styles = StyleSheet.create({
  cardContainer: {
    height: 140,
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 15,
    position: 'relative',
    borderWidth: 2,
    borderColor: colors.borderLightBlue,
  },
  cardContainerTwo: {
    height: 115,
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 15,
    position: 'relative',
    borderWidth: 2,
    borderColor: colors.borderLightBlue,
  },
  matchImage: {
    height: 111 - 22,
    width: '100%',
  },
  notifiedIcon: {
    height: 16,
    width: 16,
    position: 'absolute',
    right: 10,
    top: 5,
  },
  seriesNametext: {
    position: 'absolute',
    paddingHorizontal: 15,
    top: 5,
  },
  linerLine: {
    height: 0.7,
    width: '95%',
    alignSelf: 'center',
    top: 30,
  },
  teamShortNameText: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  teamShortNameTextTwo: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  bottom: {
    height: 28,
    backgroundColor: NewColor.linerBlackFive,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 22,
  },
  teamContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 25,
    marginTop: 20,
  },
  teamImage: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },
  textStyle: {
    flex: 1,
    paddingLeft: 5,
    marginTop:3
  },
  teamName: {
    lineHeight: 15,
    marginTop: 15,
  },
  timeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  lineUpOut: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greenCircle: {
    height: 8,
    width: 8,
    backgroundColor: colors.green,
    marginRight: 5,
    borderRadius: 50,
  },
  contestName: {
    height: 16,
    width: 'auto',
    minWidth: 38,
    borderWidth: 1,
    borderColor: colors.green,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  teamShortName: {
    fontSize: 12,
    color: 'white',
  },
  completeView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dotView: {
    height: 8,
    width: 8,
    marginRight: 5,
    borderRadius: 100,
    backgroundColor: colors.green,
  },
  teamConunt: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
