
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Image
} from 'react-native';
import NaviHerderFull from '../components/naviHerderFull';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ItemManage from '../components/itemManage';
import Search from '../components/search';
import TextInputModal from '../components/textInputModal';
import LOCALE_KEY, {
  getLocale,
} from '../repositories/local/appLocale';
import Guest from '../api/guest';
import FilterDateComponent from '../components/FilterDateComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import common from '../utils/common';
import { stringMd5 } from 'react-native-quick-md5';
import { connect } from 'react-redux';
import {
    getIsDay,
} from '../redux/actions';
import MenuMain from '../components/menuMain';
import LoadingComponent from '../components/LoadingComponent';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const dataMenu = [
  { id: '1', title: '7 ngày qua' },
  { id: '2', title: 'Hôm nay' },
  { id: '34', title: 'Hôm qua' },
  { id: '4', title: 'Tháng này' },
  { id: '5', title: 'Tháng trước' },
];


const DataType = [
  {
    id: '111',
    type: '1',
    name: 'Phần mềm',
  },
  {
    id: '112',
    type: '2',
    name: 'Dịch vụ',
  },
]
const DataBill = [
  {
    id: '11dd1',
    typeBill: '0',
    name: 'All',
  },
  {
    id: '11sd2',
    typeBill: '1',
    name: 'Up',
  },
  {
    id: '112ssd',
    typeBill: '2',
    name: 'Chưa up',
  },
]
const DataApprove = [
  {
    id: '11dsdds1',
    typeApprove: '0',
    name: 'All',
  },
  {
    id: '1eewe12',
    typeApprove: '1',
    name: 'Đã duyệt',
  },
  {
    id: '112wewesd',
    typeApprove: '2',
    name: 'Chưa duyệt',
  },
]
class CopyrightManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      type: 1,
      fromDate: null,
      page: 1,
      count: null,
      total: null,
      typeApprove: '0',
      typeBill: '0',
      isNoData: true,
      typeBQ: 'Chọn loại bản quyền',
      textBill: 'Chọn loại hóa đơn',
      textApprove: 'Chọn loại duyệt thanh toán',
      valueUser:'Chọn nhân viên',
      userid:'0',
      dataUser:[],
      modalVisible: false,
      modalVisibleMenu: false,
      dataKey: [],
      dataTypyBQ: [],
      disableTypeBQ: true,
      dataBQ: [],
      goiBQ: 'Gói bản quyền',
      hid: null,
      isLoading: false,
      disablePhanMem: true,
      phanmem: 'Chọn phần mềm',
      motorCode: '',
      fromDateStart: null,
      isFetching: false,
      productid: '0',
      visible: false,
      nameTitleMenu: 'Tháng này',
      startDate: null,
      endDate: null,
      role:null,

    };
  }

  clickCall =()=> {
    const { typeBill, typeApprove } = this.state;
    this.getKey('', '0', typeBill, typeApprove)
  }
  clickItemId = (item) => {
    const callBack =this.clickCall.bind(this)
    this.props.navigation.navigate('DetailKeyScreen',{item})
};

  renderItem = ({ item, index }) => (
    <ItemManage navigation={this.props.navigation} clickItemId={this.clickItemId} item={item} index={index} />
  );
  getDay = (id) => {
    const date = new Date();
    const today = common.formatDate(date);
    if (id === '1') {
      //7 ngày qua
      const day = common.lastDay(5)
      const itemDay = {
        startdate: day,
        enddate: today
      }
      return itemDay
    }
    else if (id === '2') {
      //hôm nay
      const day = common.lastDay(-1)
      const itemDay = {
        startdate: day,
        enddate: day
      }
      return itemDay
    }
    else if (id === '3') {
      //hom qua
      const day = common.lastDay(0)
      const itemDay = {
        startdate: day,
        enddate: day
      }
      return itemDay
    }
    else if (id === '4') {
      //tháng này
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

async  componentDidMount() {
    const { typeBill, typeApprove, userid } = this.state;
    const date = new Date();
    const today = common.formatDate(date);
    const role = await getLocale(LOCALE_KEY.role);
    if(role==='Admin'){
       this.getLoaduser();
    }
    const day = common.firstMonth()
    this.setState({
      isLoading: true,
      startDate: day,
      endDate: today,
      role:role,
    }, () => this.getKey('', '0', typeBill, typeApprove))
  }
  clickItemUser=item=>{
    this.setState({
      valueUser: item.name,
      userid: item.id,
    })
  }
  clickItemType = async item => {
    if (item.name === 'Phần mềm') {
      this.setState({
        typeBQ: item.name,
        type: 1,
        disablePhanMem: false,
        disableTypeBQ: true,
        goiBQ: 'Gói bản quyền',
        phanmem: 'Chọn phần mềm',
      })
    } else {
      this.setState({
        typeBQ: item.name,
        type: 2,
        disableTypeBQ: true,
        disablePhanMem: false,
        goiBQ: 'Gói bản quyền',
        phanmem: 'Chọn phần mềm',
      })
    }
    await this.clickType();
  };

  clickItemBill = async item => {
    this.setState({
      typeBill: item.typeBill,
      textBill: item.name,
    })
  };
  clickItemApprove = async item => {
    this.setState({
      typeApprove: item.typeApprove,
      textApprove: item.name,
    })
  };
  clickType = async () => {
    const { type } = this.state;
    const pass_word = await getLocale(LOCALE_KEY.pass_word);
    const email = await getLocale(LOCALE_KEY.email);
    const md5 = stringMd5(pass_word);
    const timeStamp = common.timeStamp();
    const token = common.createToken(timeStamp)
    const objPost = {
      email: email,
      password: md5,
      function: "loadproduct",
      time: timeStamp,
      token: token,
      variable: `{'type':'${type}'}`
    };
    try {
      const response = await Guest.loadproduct(objPost);
      const data = JSON.parse(response.data)
      this.setState({
        dataBQ: data
      })

    } catch (e) {
      console.log(e);
    }
  };
  clickItemPhanMem = async item => {
    this.setState({
      phanmem: item.name,
      hid: item.title,
      productid: item.id,
      disableTypeBQ: false,
    })
  };

  clickItemGoiBQ = item => {
    this.setState({
      goiBQ: item.name,
      planid: item.id,
      price: item.price
    })
  };
  getKey = async (search, productid, bill, approve) => {
    const { startDate, endDate,userid } = this.state
    const pass_word = await getLocale(LOCALE_KEY.pass_word);
    const email = await getLocale(LOCALE_KEY.email);
    const md5 = stringMd5(pass_word);
    const timeStamp = common.timeStamp();
    const token = common.createToken(timeStamp)

    const objPost = {
      email: email,
      password: md5,
      function: "viewallkey",
      time: timeStamp,
      token: token,
      variable: `{'keyword':'${search}','startdate':'${startDate}','enddate':'${endDate}','userid':'${userid}','productid':'${productid}','bill':'${bill}','approve':'${approve}','page':'1','pagesize':'50'}`
    }
    try {
      const response = await Guest.viewallkey(objPost);

      const data = JSON.parse(response.data)
      this.setState({
        dataKey: data.list_sale,
        isLoading: false,
        isFetching: false,
        count: data.count,
        total: data.total,
      })

    } catch (e) {
      console.log(e);
    }
  }

  getLoaduser = async () => {
    const pass_word = await getLocale(LOCALE_KEY.pass_word);
    const email = await getLocale(LOCALE_KEY.email);
    const md5 = stringMd5(pass_word);
    const timeStamp = common.timeStamp();
    const token = common.createToken(timeStamp)

    const objPost = {
      email: email,
      password: md5,
      function: "loaduser",
      time: timeStamp,
      token: token,
    }
    try {
      const response = await Guest.loaduser(objPost);
      const data = JSON.parse(response.data)
      this.setState({
        dataUser:data
      })

    } catch (e) {
      console.log(e);
    }
  }
  handleLoadMore = () => {
    this.setState({
      isLoading: true,
      page: this.state.page + 1
    }, () => this.getataMore())
  }
  getataMore = async () => {
    const { search, productid, startDate, typeApprove, endDate, typeBill, page } = this.state;
    await this.setState({
      isLoading: false,
    })
    const pass_word = await getLocale(LOCALE_KEY.pass_word);
    const email = await getLocale(LOCALE_KEY.email);
    const md5 = stringMd5(pass_word);
    const timeStamp = common.timeStamp();
    const token = common.createToken(timeStamp)
    const objPost = {
      email: email,
      password: md5,
      function: "viewallkey",
      time: timeStamp,
      token: token,
      variable: `{'keyword':'${search}','startdate':'${startDate}','enddate':'${endDate}','userid':'0','productid':'${productid}','bill':'${typeBill}','approve':'${typeApprove}','page':'${page}','pagesize':'50'}`

    }
    try {
      const response = await Guest.viewallkey(objPost);
      const data = JSON.parse(response.data)
      if (data.list_sale !== '[]') {
        const dataFull = this.state.dataKey.concat(data.list_sale)
        this.setState({
          dataKey: dataFull,
        })
      }
    } catch (e) {
      console.log(e);
    }
  }

  onChangeTextSearch = (text) => {
    this.setState({
      search: text,
    });
  };
  onFilter = () => {
    this.setState({ modalVisible: true });
  }
  onCloseFilter = () => {
    this.setState({ modalVisible: false });
  }
  renderFooter = () => {
    return (this.state.isLoading ?
      <View style={styles.loader}>
        <ActivityIndicator size='large' />
      </View> : null
    )
  }
  onClickFilter = () => {
    const { search, productid, fromDateStart, typeApprove, fromDate, typeBill,startDate, endDate } = this.state;
    const dataStart = fromDateStart !== null ? common.formatDate(fromDateStart) : startDate
    const dataEnd = fromDate !== null ? common.formatDate(fromDate) : endDate
    this.setState({
      modalVisible: false,
      isLoading: true,
      startDate: dataStart,
      endDate: dataEnd
    }, () => this.getKey(search, productid, typeBill, typeApprove))

  }

  onRefresh = () => {
    const date = new Date();
    const today = common.formatDate(date);
    const day = common.firstMonth()
    this.setState({
      isLoading: true,
      search: '',
      search: '',
      type: 1,
      fromDate: null,
      page: 1,
      typeApprove: '0',
      typeBill: '0',
      isNoData: true,
      typeBQ: 'Chọn loại bản quyền',
      textBill: 'Chọn loại hóa đơn',
      textApprove: 'Chọn loại duyệt thanh toán',
      modalVisible: false,
      dataKey: [],
      dataTypyBQ: [],
      disableTypeBQ: true,
      dataBQ: [],
      goiBQ: 'Gói bản quyền',
      hid: null,
      disablePhanMem: true,
      phanmem: 'Chọn phần mềm',
      motorCode: '',
      fromDateStart: null,
      isFetching: false,
      productid: '0',
      visible: false,
      nameTitleMenu: 'Tháng này',
      startDate: day,
      endDate: today,
      valueUser:'Chọn nhân viên',
      userid:'0',
      dataUser:[],
    }, () => this.getKey('', '0', '0', '0'), this.getLoaduser())
  }

  onCloseModal = async (item) => {
    const day = this.getDay(item.id)
    await this.setState({
      modalVisibleMenu: false,
      nameTitleMenu: item.title,
      startDate: day.startdate,
      endDate: day.enddate
    });
    this.getKey('', '0', '0', '0')
  }
  onShow = () => {
    this.setState({
      modalVisibleMenu: true,
    });
  }

  render() {
    const { search, modalVisible, dataKey, typeBQ, phanmem,role, fromDate, textBill, textApprove,valueUser,
      dataBQ, disablePhanMem, fromDateStart, modalVisibleMenu,dataUser, nameTitleMenu, count, total } = this.state;
    return (
      <View style={styles.containerAll}>
        <NaviHerderFull title={'QUẢN LÝ'} />

        <View style={styles.container}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <View style={styles.containerView}>
              <View style={styles.containerModal}>
                <View style={styles.modalHerder}>
                  <Text />
                  <Text style={styles.txtTitle}>BỘ LỌC</Text>
                  <TouchableOpacity
                    style={styles.btnClose}
                    onPress={this.onCloseFilter}>
                    <Ionicons
                      name={'close-outline'}
                      size={25}
                      style={{ color: '#fff' }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{height:20}} />
               {role ==='Admin'? <TextInputModal
                  dataModal={dataUser}
                  nameIcon={'code-equal'}
                  valueItem={valueUser}
                  noData
                  click={this.clickItemUser}
                  namePlaceholder={valueUser} />:null}
                <TextInputModal
                  dataModal={DataType}
                  nameIcon={'call-merge'}
                  valueItem={typeBQ}
                  noData
                  click={this.clickItemType}
                  namePlaceholder={typeBQ} />
                <TextInputModal
                  nameIcon={'blender-software'}
                  valueItem={phanmem}
                  noData
                  disabled={disablePhanMem}
                  dataModal={dataBQ}
                  placeholder={'Phần mềm'}
                  click={this.clickItemPhanMem}
                  namePlaceholder={phanmem}
                />
                <TextInputModal
                  dataModal={DataBill}
                  nameIcon={'billboard'}
                  valueItem={textBill}
                  noData
                  click={this.clickItemBill}
                  namePlaceholder={textBill} />
                <TextInputModal
                  dataModal={DataApprove}
                  nameIcon={'billboard'}
                  valueItem={textApprove}
                  noData
                  click={this.clickItemApprove}
                  namePlaceholder={textApprove} />
                <FilterDateComponent
                  isFromDate={true}
                  title="Ngày bắt đầu"
                  fromDate={fromDateStart}
                  date={fromDateStart}
                  setDate={(date) => this.setState({ fromDateStart: date })}
                />
                <FilterDateComponent
                  isFromDate={true}
                  title="Ngày kết thúc"
                  fromDate={fromDate}
                  date={fromDate}
                  setDate={(date) => this.setState({ fromDate: date })}
                />
                <TouchableOpacity style={styles.bntLoc}
                  onPress={this.onClickFilter}>
                  <Text style={styles.txtLoc}>Lọc</Text>
                </TouchableOpacity>
                <View>
                </View>
              </View>
            </View>
          </Modal>

          <FlatList
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}
            ListHeaderComponent={
              <View>
                <Search value={search}
                  onPressFilter={this.onFilter}
                  showFilter
                  clickSearch={() => this.getKey(search, '0', '0', '0')}
                  onChangeText={(text) => this.onChangeTextSearch(text)} />
                <MenuMain
                  modalVisible={modalVisibleMenu}
                  style={{ marginTop: 90 }}
                  ClickShow={this.onShow}
                  ClickHide={this.onCloseModal}
                  dataMenu={dataMenu}
                  nameTitle={nameTitleMenu}
                />
                <View style={styles.containerTitle}>
                  <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 20 }}>

                    <Text>Hóa đơn : </Text>
                    <Text style={{ marginLeft: 5 }}>{count ? count : '0'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 15 }}>
                    <Text>Tổng :</Text>
                    <Text style={{ marginLeft: 5, color: '#0000FF', marginRight: 20 }}>{total ? common.formatNumber(total) : '0 đ'}</Text>
                  </TouchableOpacity>
                </View>
                {dataKey === null ? <View style={{ alignItems: 'center', height: windowHeight / 1.5, justifyContent: 'center' }}>
                  <Image
                    style={{ width: 150, height: 150, resizeMode: 'contain' }}
                    source={require('../resource/image/iconNullKey.png')}
                  />
                  <Text>Không có dữ liệu</Text>
                </View> : null
                }
              </View>
            }
            data={dataKey}
            renderItem={(item, index) => this.renderItem(item, index)}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={this.renderFooter}
            onEndReached={this.handleLoadMore}
            onEndThreshold={0}
          />
        </View>
      </View>
    )
  }

};
const styles = StyleSheet.create({
  containerAll: {
    flex: 1,
    backgroundColor: "#F2F2F2"
  },
  loader: {
    marginTop: 10,
    alignItems: 'center'
  },
  txtLoc: {
    paddingVertical: 10,
    color: '#fff',
    fontWeight: '600'
  },
  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D8D8D8',
  },
  bntLoc: {
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7941D',
    borderRadius: 10,
    marginBottom: 20
  },
  container: {
    flex: 1,
  },
  btnClose: {
    marginRight: 10,
  },
  height: {
    height: 30
  },
  txtTitle: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 30,
  },
  modalHerder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: windowHeight / 11.9,
    backgroundColor: '#F7941D',
  },
  containerModal: {
    width: windowWidth / 1.31,
    height: 500,
    borderRadius: 10,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowRadius: 6,
    shadowOpacity: 0.16,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 8,
    backgroundColor: '#fff',
    marginHorizontal: 20,
  },
  flatList: {
    marginTop: 20
  },

  containerView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  }
});


export default connect()(CopyrightManagement);
