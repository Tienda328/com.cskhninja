
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions
} from 'react-native';
import NaviHerderFull from '../components/naviHerderFull';
import TabView from '../components/tabView';
import ChartTest from '../components/chartTest';
import colors from '../constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import LOCALE_KEY, {
  getLocale,
} from '../repositories/local/appLocale';
const Width = Dimensions.get('screen').width;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }
  render() {
    const { search } = this.state
    return (
      <View style={[styles.containerAll]}>
        <NaviHerderFull title={'TRANG CHỦ'}
          buttonRight={true}
          nameIcon={'bell'} />
             
        <View style={styles.containerAll}>
          <TouchableOpacity style={styles.containerFirst}>
            <Text style={styles.txtFirst}>Tháng Trước</Text>
          </TouchableOpacity>
          <View style={styles.containetText}>
            <View style={styles.containerKeyAll}>
            <Text style={styles.txtTitle}>Tổng doanh thu</Text>
            <Text style={styles.txtValue}>200</Text>
            </View>
            <View style={styles.containerKeyAll2} >
            <Text  style={styles.txtTitle}>Tổng key</Text>
            <Text style={styles.txtValue}>200</Text>
            </View>
          </View>
          <ChartTest/>
          <TabView/>
        </View>

      </View>
    )
  }

};

export default Main;

const styles = StyleSheet.create({
  containerAll: {
    flex: 1,
    backgroundColor:'#F2F2F2'
  },
  txtTitle:{
    color:'#fff',
    fontSize:13,
    paddingTop:10
  },
  txtValue:{
    color:'#fff',
    fontSize:14,
    fontWeight:'400',
    paddingTop:5,
    paddingBottom:10
  },
  containerKeyAll:{
    flex:1,
    backgroundColor:'#0101DF',
    marginLeft:20,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    marginRight:10
  },
  txtFirst:{
    fontSize:15,
    fontWeight:'600',
    paddingVertical:10,
    marginLeft:20,
  },
  containerKeyAll2:{
    flex:1,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    marginRight:20,
    marginLeft: 10,
    backgroundColor:'red'
  },
  containetText:{
    flexDirection:'row',
    marginBottom:10
  },
  containerFirst:{
    marginVertical:10,
    backgroundColor:'#fff',
    borderRadius:10
  }
 
});
