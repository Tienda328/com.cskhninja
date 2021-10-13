
import React from 'react';
import {
  View,
  Alert,
  Text, 
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import NaviHerderFull from '../components/naviHerderFull';
import TabSales from '../components/TabSales';
import TabUtilities from '../components/TabUtilities';
import ChartTest from '../components/chartTest';
import Guest from '../api/guest';
import { stringMd5 } from 'react-native-quick-md5';
import MenuMain from '../components/menuMain';
import common from '../utils/common';
import {
  getDayMenu,
} from '../redux/actions';
import { connect } from 'react-redux';
import LOCALE_KEY, {
  getLocale,
  setLocale,
} from '../repositories/local/appLocale';

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
      dataRestKey: [],
      totalmoney: null,
      list_reportbank: [],
      list_reportsoftware: [],
      refreshing: false,
      list_reportteam: [],
      nameTitle: 'Tháng này',
      role: null,
      leader: null,
      list_reportmyteam: [],
      emailSearch:'',
      dataReportday:[],
    };
  }

  onCloseModal = async (item) => {
    await this.setState({
      modalVisible: false,
      nameTitle: item.title
    });
    const day = this.getDay(this.state.nameTitle)
    this.getData(day.startdate, day.enddate)
    await  setLocale(LOCALE_KEY.dayMenu, this.state.nameTitle);
  }
  onShow = () => {
    this.setState({
      modalVisible: true,
    });
  }

  async componentDidMount() {
    const dayMenu = await getLocale(LOCALE_KEY.dayMenu);
    await this.setState({
      nameTitle: dayMenu
    });
    const day = this.getDay(this.state.nameTitle)
    await  setLocale(LOCALE_KEY.dayMenu, this.state.nameTitle);
    this.getData(day.startdate, day.enddate);
    this.getVersion()
  }
  clickReset=(item)=>{
    this.props.navigation.navigate('UpdateMachineCodeScreen',{item})
  }

  getResetKey = async () => {
    const {emailSearch}=this.state
    const pass_word = await getLocale(LOCALE_KEY.pass_word);
    const email = await getLocale(LOCALE_KEY.email);
    const md5 = stringMd5(pass_word);
    const timeStamp = common.timeStamp();
    const token = common.createToken(timeStamp);
    const objPost = {
      email: email,
      password: md5,
      function: "resetkey",
      time: timeStamp,
      token: token,
      variable: `{'keyword':'${emailSearch}','page':'1','pagesize':'3'}`
    };
    try {
      const response = await Guest.resetkey(objPost);
      const data = JSON.parse(response.data)
      await this.setState({
        dataRestKey: data,
      })

    } catch (e) {
      console.log(e);
    }
  }

  clickAllSale = async () => {
    this.props.navigation.navigate('ListSaleALlScreen')
  }
  clickAllUtilites = async () => {
    const {list_reportmyteam, leader, emailSearch}=this.state
    const item ={
      list_reportmyteam,
      leader,
      emailSearch
    }

    this.props.navigation.navigate('UtilitiesScreen',{item})
  }

  _onRefresh() {
    const date = new Date();
    const today = common.formatDate(date);
    const day = common.firstMonth()
    this.setState({ refreshing: true, nameTitle: 'Tháng này', emailSearch:'' }, () => this.getData(day, today));
  }

  getDay = (title) => {
    const date = new Date();
    const today = common.formatDate(date);
    if (title === '7 ngày qua') {
      //7 ngày qua
      const day = common.lastDay(5)
      const itemDay = {
        startdate: day,
        enddate: today
      }
      return itemDay
    }
    else if (title === 'Hôm nay') {
      //hôm nay
      const day = common.lastDay(-1)
      const itemDay = {
        startdate: day,
        enddate: day
      }
      return itemDay
    }
    else if (title === 'Hôm qua') {
      //hom qua
      const day = common.lastDay(0)
      const itemDay = {
        startdate: day,
        enddate: day
      }
      return itemDay
    }
    else if (title === 'Tháng này') {
      const day = common.firstMonth()
      const itemDay = {
        startdate: day,
        enddate: today
      }
      return itemDay
    } else {
      // tháng trước
      const dayEnd = common.lastMonth()
      const day = common.firstLastMonth()
      const itemDay = {
        startdate: day,
        enddate: dayEnd
      }
      return itemDay
    }
  };

  getVersion = async () => {
    const pass_word = await getLocale(LOCALE_KEY.pass_word);
    const email = await getLocale(LOCALE_KEY.email);
    const md5 = stringMd5(pass_word);
    const timeStamp = common.timeStamp();
    const token = common.createToken(timeStamp);
    const objPost = {
      email: email,
      password: md5,
      function: "checkversion",
      time: timeStamp,
      token: token,
      variable: `{'type':'${'android'}','you':'${'1.0.1'}'}`
    };
    try {
      const response = await Guest.reportsale(objPost);
      if (response.status === true) {
        console.log('dung roi')
      } else if (response.status === false) {
        console.log('sai roi')
        // Alert.alert(
        //   "Thông báo",
        //   "Email hoặc mật khẩu không đúng, hãy thử lại",
        //   [
        //     { text: "OK", onPress: () => { } }
        //   ]
        // );
      }
    } catch (e) {
      console.log(e);
    }
  }

  getData = async (startdate, enddate) => {
    const pass_word = await getLocale(LOCALE_KEY.pass_word);
    const role = await getLocale(LOCALE_KEY.role);
    const leader = await getLocale(LOCALE_KEY.leader);
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
      variable: `{'startdate':'${startdate}','enddate':'${enddate}'}`
    };
    try {
      const response = await Guest.reportsale(objPost);
      const data = JSON.parse(response.data)
      await this.setState({
        refreshing: false,
        totalmoney: data.totalmoney,
        totalmoneyapprove: data.totalmoneyapprove,
        totalkey: data.totalkey,
        list_reportbxh: data.list_reportbxh,
        list_reportbank: data.list_reportbank,
        list_reportsoftware: data.list_reportsoftware,
        list_reportteam: data.list_reportteam,
        list_reportmyteam: data.list_reportmyteam,
        role: role,
        leader: leader,
        dataReportday:data.list_reportday,
      })
    } catch (e) {
      console.log(e);
    }
  }
  onChangeTextEmail = (text) => {
    this.setState({
      emailSearch: text,
    });
};

  currentPage = (currentpage) => {
    this.indexPage = currentpage.i;
  };
  render() {
    const { modalVisible, nameTitle, totalmoney, totalmoneyapprove, totalkey, list_reportbxh,emailSearch,
      list_reportbank, list_reportsoftware, dataRestKey, leader,dataReportday, list_reportteam, role, list_reportmyteam } = this.state;
    return (
      <View style={[styles.containerAll]}>
        <NaviHerderFull title={'TRANG CHỦ'}
          buttonRight={true}
          nameIcon={'bell'} />

        <ScrollView style={styles.containerAll}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
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
              <Text style={styles.txtValue}>{totalkey ? totalkey : '0'}</Text>
            </View>
            <View style={[styles.containerKeyAll, { marginHorizontal: 10 }]} >
              <Text style={styles.txtTitle}>Doanh số</Text>
              <Text style={styles.txtValue}>{totalmoney ? common.formatNumber(totalmoney) : '0 đ'}</Text>
            </View>
            <View style={[styles.containerKeyAll, { marginRight: 10, backgroundColor: '#F7941D' }]} >
              <Text style={styles.txtTitle}>Doanh số đã duyệt</Text>
              <Text style={styles.txtValue}>{totalmoneyapprove ? common.formatNumber(totalmoneyapprove) : '0 đ'}</Text>
            </View>
          </View>
          <ChartTest  dataReportday={dataReportday}/>
          <TabSales style={{ height: 310 }}
            role={role}
            dataProduct={list_reportsoftware}
            datatBank={list_reportbank}
            dataTeam={list_reportteam}
            clickAll={this.clickAllSale}
            datatBXH={list_reportbxh}
          />
          <TabUtilities
            style={{ height: 445 }}
            leader={leader}
            clickUtilites={this.clickAllUtilites}
            onChangeText={(text) => this.onChangeTextEmail(text)}
            clickSearch={this.getResetKey}
            value={emailSearch}
            clickReset={this.clickReset}
            dataRestKey={dataRestKey}
            dataMyTeam={list_reportmyteam} />
        </ScrollView>

      </View>
    )
  }

};

// const mapStateToProps = (state) => ({
//   appState: state.appState,
// });
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
  containetText: {
    flexDirection: 'row',
    marginBottom: 10
  },

});
