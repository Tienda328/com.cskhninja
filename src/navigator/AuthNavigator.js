import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
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
      </Stack.Navigator>
    );
  }
}

export default AuthNavigator;
