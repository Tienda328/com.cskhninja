import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import MainCustomerScreen from '../screens/mainCustomer';
import AddKeyScreen from '../screens/addKey';
import screenName from '../constants/screenName';
import ProFileScreen from '../screens/profile';
import AddKeyStep2Screen from '../screens/addKeyStep2';
import AddCustomerScreen from '../screens/addCustomer';
import DetailKeyScreen from '../screens/DetailKey';
import EditKeyScreen from '../screens/editKey'

const Stack = createNativeStackNavigator();

class StackNavigator extends React.Component {

  render() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={screenName.TabNavigator} component={TabNavigator} />
        <Stack.Screen name={'MainCustomerScreen'} component={MainCustomerScreen} />
        <Stack.Screen name={'ProFileScreen'} component={ProFileScreen} />
        <Stack.Screen name={'AddKeyScreen'} component={AddKeyScreen} />
        <Stack.Screen name={'AddCustomerScreen'} component={AddCustomerScreen} />
        <Stack.Screen name={'AddKeyStep2Screen'} component={AddKeyStep2Screen} />
        <Stack.Screen name={'EditKeyScreen'} component={EditKeyScreen} />
        <Stack.Screen name={'DetailKeyScreen'} component={DetailKeyScreen} />
      </Stack.Navigator>
    );
  }
}

export default StackNavigator;
