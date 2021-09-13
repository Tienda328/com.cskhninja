
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import NaviHerderFull from '../components/naviHerderFull';
import Search from '../components/search';
import ListCustomer from '../components/listCustomer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class MainCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        search: '',
    };
}
onChangeTextSearch = (text) => {
  this.setState({
    search: text,
  });
};
AddCustomer =() => {
  this.props.navigation.navigate('AddCustomerScreen')
};

  render() {
    const {search}= this.state
  
    return (
        <View style={[styles.containerAll]}>
          <NaviHerderFull title={'TRANG CHỦ'} 
          buttonRight={true} 
          buttonRightIcon={false} 
          onPressRight={this.AddCustomer} />
          <Search value={search} onChangeText={(text) => this.onChangeTextSearch(text)} />
          <ListCustomer />

        </View>
    )
  }

};

export default MainCustomer;

const styles = StyleSheet.create({
  containerAll: {
    flex: 1
  },
  iconCustomer:{
    color:'#fff',
    marginLeft:10
  },
  iconAdd:{
    color:'#fff',
    marginRight:10
  },
  bntAddCustomer:{
    flexDirection:'row',
    marginHorizontal:20,
    borderRadius:10,
    marginTop:20,
    alignItems:'center',
    backgroundColor:'#013ADF'
  },
  txtAddCustomer:{
    flex:1,
    marginLeft:10,
    paddingVertical:10,
    color:'#fff',
    fontWeight:'600',
    fontSize:18

  }
});
