
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
import LinearGradient from 'react-native-linear-gradient';
import colors from '../constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Width = Dimensions.get('screen').width;

function StatisticSection({ data }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.titleSection}>
        Doanh thu Theo Ngày
      </Text>
      <View style={styles.bodyStatistic}>
        <View style={styles.considered}>
          <TouchableOpacity
            activeOpacity={0.8}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.item}
              colors={['#37B76F', '#088A08', '#0B6121']}>
              <View>
                <Text style={styles.content}>
                  20
                  <Text style={styles.txtPhanTram}>%</Text>
                </Text>
                <Text style={styles.titleBox}>Tổng doanh thu</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.waitConsider}>
          <TouchableOpacity
            activeOpacity={0.8}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.item}
              colors={['#58FA58', '#01DF01', '#04B404']}>
              <View>
                <Text style={styles.content}>
                  92
                  <Text style={styles.txtPhanTram}>%</Text>
                </Text>
                <Text style={styles.titleBox}>Doanh thu phần mềm</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.customerBusy}>
          <TouchableOpacity
            activeOpacity={0.8}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.item}
              colors={['#FAAC58', '#DF7401', '#FF8000']}>

              <View>
                <Text style={styles.content}>
                  55
                  <Text style={styles.txtPhanTram}>%</Text>
                </Text>
                <Text style={styles.titleBox}>Doanh thu dịch vụ</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.rejectConsider}>
          <TouchableOpacity
            activeOpacity={0.8}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.item}
              colors={['#FA5858', '#FE2E2E', '#FF0000']}>
              <View>
                <Text style={styles.content}>
                  55
                  <Text style={styles.txtPhanTram}>%</Text>
                </Text>
                <Text style={styles.titleBox}>Tổng key</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
      
    </View>
  );
}

class Main extends React.Component {
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
  // AddCustomer = () => {
  //   this.props.navigation.navigate('AddCustomerScreen')
  // };

  render() {
    const { search } = this.state

    return (
      <View style={[styles.containerAll]}>
        <NaviHerderFull title={'TRANG CHỦ'}
          buttonRight={true}
          buttonRightIcon={false} />
        <View style={styles.containerAll}>
          <Image
            style={{ width: '100%', height: '100%', position: 'absolute' }}
            source={require('../resource/image/background-login.png')}
          />
          {/* <Search value={search} onChangeText={(text) => this.onChangeTextSearch(text)} /> */}
          <StatisticSection />
          <View style={styles.viewNinja}>
            <Text style={styles.txtNinja}>-----NINJA * GROUP-----</Text>
          </View>
          <View style={styles.containerButton}>

            
          <TouchableOpacity style={styles.containerAddkey}
            onPress={() => this.props.navigation.navigate('AddKey')}
          >
            <Text style={styles.txtCustomer}>THÊM KEY</Text>
          </TouchableOpacity>
       
          <TouchableOpacity style={styles.containerCustomer}
           onPress={() => this.props.navigation.navigate('CustomerScreen')}
          >
            <Text style={styles.txtCustomer}>DANH SÁCH KHÁCH HÀNG</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.containerManage}
           onPress={() => this.props.navigation.navigate('CopyrightManagement')}
          >
            <Text style={styles.txtCustomer}>QUẢN LÝ BẢN QUYỀN</Text>
          </TouchableOpacity>
          </View>
        </View>

      </View>
    )
  }

};

export default Main;

const styles = StyleSheet.create({
  containerAll: {
    flex: 1
  },
  containerCustomer:{
    justifyContent:'center',
    borderRadius:20,
    alignItems:'center',
    backgroundColor:'#04B4AE',
    marginHorizontal:20,
    marginBottom:20,
  },
  txtNinja:{
  color:'#fff',
  fontSize:20,
  fontWeight:'700'
  },
  viewNinja:{
    alignItems:'center',
    marginTop:20,
  },
  containerAddkey:{
    justifyContent:'center',
    borderRadius:20,
    alignItems:'center',
    marginBottom:20,
    backgroundColor:'#3ADF00',
    marginHorizontal:20,
  },
  containerManage:{
    justifyContent:'center',
    borderRadius:20,
    alignItems:'center',
    marginHorizontal:20,
    backgroundColor:'#0404B4',
  },
  txtCustomer:{
    color:'#fff',
    fontSize:15,
    fontWeight:'600',
    paddingVertical:15
  },
  iconCustomer: {
    color: '#fff',
    marginLeft: 10
  },
  containerButton:{
  flex:1,
  justifyContent:'center' 
  },

  titleBox: {
    alignSelf: 'center',
    color: colors.white,
    fontWeight: '500',
  },
  rejectConsider: {
    width: (Width * 167) / 414,
    height: 103,
    position: 'absolute',
    bottom: 12,
    right: 0,
  },
  customerBusy: {
    width: (Width * 173) / 414,
    height: 85,
    position: 'absolute',
    bottom: 12,
    left: 0,
  },
  content: {
    color: colors.white,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  waitConsider: {
    width: (Width * 192) / 414,
    height: 95,
    position: 'absolute',
    top: 12,
    right: 0,
  },
  considered: {
    position: 'absolute',
    top: 12,
    left: 0,
    width: (Width * 148) / 414,
    height: 113,
  },
  item: {
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
    overflow: 'hidden',
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  bodyStatistic: {
    alignSelf: 'center',
    width: (Width * (414 - 64)) / 414,
    height: 232,
    padding: 12,
  },
  sectionHeader: {
    marginTop: 12,
  },
  titleSection: {
    fontSize: 16,
    color:'#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  txtPhanTram: { fontSize: 20 },
  containerAll: { flex: 1 },
  view: {
    width: '100%',
    height: '100%',
  },
});
