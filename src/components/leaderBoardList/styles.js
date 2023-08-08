import {StyleSheet} from 'react-native';
import {NewColor, colors} from '../../theme/color';

const styles = StyleSheet.create({
  head: {
    height: 33,
    backgroundColor: NewColor.linerBlackFive,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  userImg: {
    height: 38,
    width: 38,
  },
  leaderBoardContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  underView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default styles;
