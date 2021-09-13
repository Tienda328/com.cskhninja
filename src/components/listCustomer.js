/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import { View, StyleSheet, Text, FlatList } from 'react-native';
 import ItemCustomer from './itemCustomer'

 const DATA = [
    {
      id: 'bd7acbea-c1b1-abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: 'bd7acbea-c1b-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3a91aa97f63',
      title: 'Second Item',
    },
    {
      id: '586946-145571e29d72',
      title: 'Third Item',
    },
  
  ];
 
 class SplashScreen extends React.Component {
   constructor(props) {
     super(props);
   }
 
   renderItem = ({ item }) => (
    <ItemCustomer  />
  );

   render() {
     return (
       <View style={styles.container}>
       <FlatList
                  data={DATA}
                  renderItem={(item)=>this.renderItem(item)}
                  keyExtractor={item => item.id}
                />
       </View>
     );
   }
 }
 
 export default SplashScreen;
 const styles = StyleSheet.create({
   container: {
     flex: 1,
   },
 });
 