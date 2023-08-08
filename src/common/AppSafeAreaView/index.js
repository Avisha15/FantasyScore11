import React from 'react';
import {Platform, StatusBar, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {RootState} from '../../libs/rootReducer';
import {AppSafeAreaViewProps} from '../../types/common';

const AppSafeAreaView = ({
  children,
  style,
  statusColor,
  hidden,
}: AppSafeAreaViewProps) => {
  const colors = useSelector((state: RootState) => {
    return state.theme.colors;
  });
 
  return Platform.OS === 'ios' ? (
    <View style={[{flex: 1}, style]}>
      <SafeAreaView
        style={{
          flex: 0,
          backgroundColor: statusColor ? statusColor : colors.white,
        }}
      />
      <SafeAreaView
        edges={['right', 'left']}
        style={{
          flex: 1,
        }}>
        {children}
      </SafeAreaView>
    </View>
  ) : (
    <View style={[{flex: 1, backgroundColor:'black'}, style]}>
      <StatusBar
        translucent={false}
        backgroundColor={statusColor ? 'black' : "black"}
        barStyle={statusColor ? "light-content" : "dark-content"}
        hidden={hidden}
      />
      {children}
    </View>
  );
};

export {AppSafeAreaView};
