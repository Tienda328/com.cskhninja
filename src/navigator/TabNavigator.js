import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen  from '../screens/main';
import ProfileScreen  from '../screens/profile';
import CopyrightManagementScreen  from '../screens/copyrightManagement';
import CustomerScreen  from '../screens/customer';
import TabbarHome from '../resource/image/tabbar_home.svg';
import TabbarHomeActive from '../resource/image/tabbar_home_active.svg';
import AddKeyScreen from '../screens/addKey';

const styles = StyleSheet.create({
  tabbarItemCenter: {
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    padding: 7,
    marginBottom: 10,
    borderRadius: 37,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 6,
    shadowOpacity: 0.16,
    elevation: 3,
  },
});

export const routeName = {
  home: 'Home',
  profile: 'Profile',
  CopyrightManagement: 'CopyrightManagement',
  Customer: 'Customer',
  AddKey: 'AddKey',
};

const Tab = createBottomTabNavigator();

class TabNavigator extends React.Component {
  
  tabbarIcon = (route, focused, color, size) => {
   let iconName;
          if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account';
          }else if (route.name === 'CopyrightManagement'){
            iconName = focused ? 'briefcase' : 'briefcase';
          }else if (route.name === 'Customer'){
            iconName = focused ? 'account-box' : 'account-box';
          }else if (route.name === 'AddKey'){
            return (
              <View style={styles.tabbarItemCenter}>
                {focused ? <MaterialCommunityIcons name={'alarm-plus'} size={35} color={color} /> :<MaterialCommunityIcons name={'alarm-plus'} size={35} color={color} />}
              </View>
            );
          }
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
    }


  render (){

    return(
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return this.tabbarIcon(route, focused, color, size );
        },
        tabBarActiveTintColor: '#2E64FE',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
    
      })}>
        <Tab.Screen name="Home" component={MainScreen}  options={{
          tabBarVisible: false
        }}  />
        <Tab.Screen name="Customer" component={CustomerScreen} />
        <Tab.Screen name="AddKey" component={AddKeyScreen} />
        <Tab.Screen name="CopyrightManagement" component={CopyrightManagementScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    )
  }
   
}
export default TabNavigator;