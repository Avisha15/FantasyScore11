import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import store from './libs/configStore';
import Navigator from './navigation/Navigator';
import SplashScreen from 'react-native-splash-screen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {onAppStart} from './helper/app';
import RootComponent from './RootComponent';
onAppStart();
const App = () => {
  useEffect(() => {
    onAppStart(store);
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }, []);
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <RootComponent>
        <Navigator />
        </RootComponent>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
