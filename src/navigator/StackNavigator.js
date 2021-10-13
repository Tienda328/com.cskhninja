import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import MainScreen from '../screens/main';
import AddKeyScreen from '../screens/addKey';
import screenName from '../constants/screenName';
import ProFileScreen from '../screens/profile';
import AddCustomerScreen from '../screens/addCustomer';
import DetailKeyScreen from '../screens/DetailKey';
import EditKeyScreen from '../screens/editKey';
import CustomerScreen from '../screens/customer';
import DetailCustomerScreen from '../screens/detailCustomer';
import EditCustomerScreen from '../screens/editCustomer';
import DetailProfileScreen from '../screens/detailProfile';
import ListSaleALlScreen from '../screens/listSaleALl';
import UtilitiesScreen from '../screens/utilities';
import UpdateMachineCodeScreen from '../screens/updateMachineCode';

const Stack = createNativeStackNavigator();
class StackNavigator extends React.Component {

  render() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled:true
        }}>
        <Stack.Screen name={screenName.TabNavigator} component={TabNavigator} />
        <Stack.Screen name={'MainScreen'} component={MainScreen} />
        <Stack.Screen name={'ProFileScreen'} component={ProFileScreen} />
        <Stack.Screen name={'AddKeyScreen'} component={AddKeyScreen} />
        <Stack.Screen name={'AddCustomerScreen'} component={AddCustomerScreen} />
        <Stack.Screen name={'EditKeyScreen'} component={EditKeyScreen}
        options={{
          gestureEnabled: true,
        }}
        />
        <Stack.Screen name={'DetailKeyScreen'} component={DetailKeyScreen} />
        <Stack.Screen name={'CustomerScreen'} component={CustomerScreen} />
        <Stack.Screen name={'DetailCustomerScreen'} component={DetailCustomerScreen} />
        <Stack.Screen name={'ListSaleALlScreen'} component={ListSaleALlScreen} />
        <Stack.Screen name={'UtilitiesScreen'} component={UtilitiesScreen} />
        <Stack.Screen name={'EditCustomerScreen'} component={EditCustomerScreen} />
        <Stack.Screen name={'DetailProfileScreen'} component={DetailProfileScreen} />
        <Stack.Screen name={'UpdateMachineCodeScreen'} component={UpdateMachineCodeScreen} />
      </Stack.Navigator>
    );
  }
}

export default StackNavigator;
