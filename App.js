/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import MainNavigator from './src/navigator/mainNavigator';
 import {Provider} from 'react-redux';
 import store from './src/redux/store';
//  import codePush from 'react-native-code-push';
 
 const App: () => React$Node = () => {
   return (
     <Provider store={store}>
       <MainNavigator />
     </Provider>
   );
 };
 
//  let codePushOptions = {
//    installMode: codePush.InstallMode.IMMEDIATE,
//    checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
//  };

export default App;
 
//  export default codePush(codePushOptions)(App);
 