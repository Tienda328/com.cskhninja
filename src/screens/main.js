
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
  RefreshControl,
  Dimensions
} from 'react-native';
import NaviHerderFull from '../components/naviHerderFull';

import TabSales from '../components/TabSales';
import TabUtilities from '../components/TabUtilities';
import ChartTest from '../components/chartTest';
import colors from '../constants/colors';
import ItemComponentTitle from '../components/itemComponentTitle';
import Guest from '../api/guest';
import { stringMd5 } from 'react-native-quick-md5';
import MenuMain from '../components/menuMain';
import common from '../utils/common';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LOCALE_KEY, {
  getLocale,
} from '../repositories/local/appLocale';
const Width = Dimensions.get('screen').width;

const dataMenu = [
  { id: '1', title: '7 ngày qua' },
  { id: '2', title: 'Hôm nay' },
  { id: '3', title: 'Hôm qua' },
  { id: '4', title: 'Tháng này' },
  { id: '5', title: 'Tháng trước' },
];

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      modalVisible: false,
      totalkey: null,
      totalmoneyapprove: null,
      list_reportbxh: [],
      totalmoney: null,
      list_reportbank: [],
      list_reportsoftware: [],
      refreshing:false,
      list_reportteam: [],
      nameTitle: 'Hôm nay'
    };
  }

  onCloseModal = (item) => {
    this.setState({
      modalVisible: false,
      nameTitle: item.title
    });
  }
  onShow = () => {
    this.setState({
      modalVisible: true,
    });
  }

  componentDidMount() {
    // this.setState({
    //   isLoading: true
    // }, () => this.getData())
    this.getData()
  }
  onRefresh = async () => {
    console('fsfds')
    // await this.setState({ refreshing: true });
    // this.getData();
  };
  refreshControl() {
    const { refreshing } = this.state;
    return (
      <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />
    );
  }
  getData = async () => {
    const pass_word = await getLocale(LOCALE_KEY.pass_word);
    const email = await getLocale(LOCALE_KEY.email);
    const md5 = stringMd5(pass_word);
    const timeStamp = common.timeStamp();
    const token = common.createToken(timeStamp);
    const objPost = {
      email: email,
      password: md5,
      function: "reportsale",
      time: timeStamp,
      token: token,
      variable: `{'startdate':'09/01/2021','enddate':'09/30/2021'}`
    };
    try {
      const response = await Guest.reportsale(objPost);
      const data = JSON.parse(response.data)
      const dataWare = data.list_reportsoftware !== [] ? data.list_reportsoftware : []
      console.log('dssdds', dataWare)
      await this.setState({
        totalmoney: data.totalmoney,
        totalmoneyapprove: data.totalmoneyapprove,
        totalkey: data.totalkey,
        list_reportbxh: data.list_reportbxh,
        list_reportbank: data.list_reportbank,
        list_reportsoftware: data.list_reportsoftware,
        list_reportteam: data.list_reportteam
      })
    } catch (e) {
      console.log(e);
    }
  }

  currentPage = (currentpage) => {
    this.indexPage = currentpage.i;
  };
  render() {
    const { modalVisible, nameTitle, totalmoney, totalmoneyapprove, totalkey, list_reportbxh,
      list_reportbank, list_reportsoftware, list_reportteam, refreshing } = this.state
    return (
      <View style={[styles.containerAll]}>
        <NaviHerderFull title={'TRANG CHỦ'}
          buttonRight={true}
          nameIcon={'bell'} />

        <ScrollView style={styles.containerAll}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={refreshing}
          //     onRefresh={this.refreshControl}
          //   />
          // }

        >
          <MenuMain
            modalVisible={modalVisible}
            ClickShow={this.onShow}
            ClickHide={this.onCloseModal}
            dataMenu={dataMenu}
            nameTitle={nameTitle}
          />
          <View style={styles.containetText}>
            <View style={[styles.containerKeyAll, { marginLeft: 10, backgroundColor: '#FE2E2E' }]}>
              <Text style={styles.txtTitle}>Tổng key</Text>
              <Text style={styles.txtValue}>{totalkey}</Text>
            </View>
            <View style={[styles.containerKeyAll, { marginHorizontal: 10 }]} >
              <Text style={styles.txtTitle}>Doanh số</Text>
              <Text style={styles.txtValue}>{common.formatNumber(totalmoney)}</Text>
            </View>
            <View style={[styles.containerKeyAll, { marginRight: 10, backgroundColor: '#F7941D' }]} >
              <Text style={styles.txtTitle}>Doanh số đã duyệt</Text>
              <Text style={styles.txtValue}>{common.formatNumber(totalmoneyapprove)}</Text>
            </View>
          </View>
          <ChartTest />
          <TabSales
            dataTeam={list_reportteam}
            datatBXH={list_reportbxh}
            datatBank={list_reportbank}
            dataProduct={list_reportsoftware} />
          <TabUtilities />

        </ScrollView>

      </View>
    )
  }

};

export default Main;
const styles = StyleSheet.create({
  containerAll: {
    flex: 1,
    backgroundColor: '#F2F2F2'
  },
  txtTitle: {
    color: '#fff',
    fontSize: 12,
    paddingTop: 10
  },
  txtValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    paddingTop: 5,
    paddingBottom: 10
  },
  containerKeyAll: {
    flex: 1,
    backgroundColor: '#0101DF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtFirst: {
    fontSize: 15,
    fontWeight: '600',
    paddingVertical: 10,
    marginLeft: 20,
  },
  containerKeyAll2: {
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red'
  },
  containetText: {
    flexDirection: 'row',
    marginBottom: 10
  },
  containerFirst: {
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10
  }

});
