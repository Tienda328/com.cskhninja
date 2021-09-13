import * as React from 'react';
import { Button, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainCustomerScreen  from '../screens/mainCustomer';
import ProfileScreen  from '../screens/profile';
import CopyrightManagementScreen  from '../screens/copyrightManagement';
import AddKeyScreen from '../screens/addKey';

export const routeName = {
  home: 'Home',
  profile: 'Profile',
  CopyrightManagement: 'CopyrightManagement',
  AddKey: 'AddKey',
};

const Tab = createBottomTabNavigator();

class TabNavigator extends React.Component {

  render (){
    return(
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused
              ? 'account-group'
              : 'account-group';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account';
          }else if (route.name === 'CopyrightManagement'){
            iconName = focused ? 'briefcase' : 'briefcase';
          }else if (route.name === 'AddKey'){
            iconName = focused ? 'alpha-k-box' : 'alpha-k-box';
          }

          // You can return any component that you like here!
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2E64FE',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
        <Tab.Screen name="Home" component={MainCustomerScreen} />
        <Tab.Screen name="CopyrightManagement" component={CopyrightManagementScreen} />
        <Tab.Screen name="AddKey" component={AddKeyScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    )
  }
   
}
export default TabNavigator;