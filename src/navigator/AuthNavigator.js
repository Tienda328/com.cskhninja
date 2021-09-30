import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import ResetPassWordScreen from '../screens/resetPassWord';
import screenName from '../constants/screenName';

const Stack = createNativeStackNavigator();

class AuthNavigator extends React.Component {
  render() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={screenName.LoginScreen} component={LoginScreen} />
        <Stack.Screen name={screenName.ResetPassWordScreen} component={ResetPassWordScreen} />
      </Stack.Navigator>
    );
  }
}

export default AuthNavigator;
