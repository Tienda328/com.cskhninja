import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import MainScreen from '../screens/main';
import AddKeyScreen from '../screens/addKey';
import screenName from '../constants/screenName';
import ProFileScreen from '../screens/profile';
import AddKeyStep2Screen from '../screens/addKeyStep2';
import AddCustomerScreen from '../screens/addCustomer';
import DetailKeyScreen from '../screens/DetailKey';
import EditKeyScreen from '../screens/editKey';
import CustomerScreen from '../screens/customer';
import DetailCustomerScreen from '../screens/detailCustomer';
import EditCustomerScreen from '../screens/editCustomer';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

class StackNavigator extends React.Component {

  render() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={'LoginScreen'} component={LoginScreen} />
        <Stack.Screen name={screenName.TabNavigator} component={TabNavigator} />
        <Stack.Screen name={'MainScreen'} component={MainScreen} />
        <Stack.Screen name={'ProFileScreen'} component={ProFileScreen} />
        <Stack.Screen name={'AddKeyScreen'} component={AddKeyScreen} />
        <Stack.Screen name={'AddCustomerScreen'} component={AddCustomerScreen} />
        <Stack.Screen name={'AddKeyStep2Screen'} component={AddKeyStep2Screen} />
        <Stack.Screen name={'EditKeyScreen'} component={EditKeyScreen} />
        <Stack.Screen name={'DetailKeyScreen'} component={DetailKeyScreen} />
        <Stack.Screen name={'CustomerScreen'} component={CustomerScreen} />
        <Stack.Screen name={'DetailCustomerScreen'} component={DetailCustomerScreen} />
        <Stack.Screen name={'EditCustomerScreen'} component={EditCustomerScreen} />
      </Stack.Navigator>
    );
  }
}

export default StackNavigator;
