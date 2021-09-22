
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator
} from 'react-native';
import NaviHerderFull from '../components/naviHerderFull';
import TextInputKey from '../components/TextIputKey';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ItemManage from '../components/itemManage';
import Search from '../components/search';
import TextInputModal from '../components/textInputModal';
import LOCALE_KEY, {
  getLocale,
} from '../repositories/local/appLocale';
import Guest from '../api/guest';
import common from '../utils/common';
import { stringMd5 } from 'react-native-quick-md5';
import { tupleExpression } from '@babel/types';


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
class CopyrightManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      type: 1,
      page: 1,
      isNoData: true,
      typeBQ: 'Chọn loại bản quyền',
      modalVisible: false,
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
      productid: null,
    };
  }

  renderItem = ({ item }) => (
    <ItemManage navigation={this.props.navigation} item={item} />
  );
  componentDidMount() {
    this.setState({
      isLoading: true
    }, () => this.getKey('','0'))
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
      time: `1`,
      token: 'd1ff52a77a2965156cb8e7e67d4ac931',
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
      productid:item.id,
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
  getKey = async (search,productid) => {
    // const { search } = this.state
    const pass_word = await getLocale(LOCALE_KEY.pass_word);
    const email = await getLocale(LOCALE_KEY.email);
    const md5 = stringMd5(pass_word);
    const timeStamp = common.timeStamp();
    const token = common.createToken(timeStamp)
    const objPost = {
      email: email,
      password: md5,
      function: "viewallkey",
      time: "1",
      token: "d1ff52a77a2965156cb8e7e67d4ac931",
      variable: `{'keyword':'${search}','startdate':'0','enddate':'0','userid':'0','productid':'${productid}','page':'1','pagesize':'10'}`
    }
    try {
      const response = await Guest.viewallkey(objPost);
      const data = JSON.parse(response.data)
      this.setState({
        dataKey: data,
        isLoading:false
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
    const { search, page } = this.state
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
      time: "1",
      token: "d1ff52a77a2965156cb8e7e67d4ac931",
      variable: `{'keyword':'${search}','startdate':'0','enddate':'0','userid':'0','productid':'0','page':'${page}','pagesize':'5'}`
    }
    try {
      const response = await Guest.loadcustomer(objPost);
      const data = JSON.parse(response.data)
      if (data !== '[]') {
        const dataFull = this.state.dataKey.concat(data)
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
  onClickFilter=()=>{
    const { search,productid, } = this.state;
    if(productid===null){
      this.setState({
        modalVisible: false,
        isLoading: true
      }, () => this.getKey(search,'0'))
    }else{
      this.setState({
        modalVisible: false,
        isLoading: true
      }, () => this.getKey(search,productid))
    }
   
  }
  render() {
    const { search, modalVisible, dataKey, typeBQ, phanmem,
      dataBQ, disablePhanMem } = this.state;
    return (
      <View style={styles.containerAll}>
        <NaviHerderFull title={'QUẢN LÝ'} />
        <Search value={search}
          onPressFilter={this.onFilter}
          showFilter
          onChangeText={(text) => this.onChangeTextSearch(text)} />
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
                <TextInputModal
                  dataModal={DataType}
                  nameTitle={'Loại bản quyền'}
                  valueItem={typeBQ}
                  noData
                  click={this.clickItemType}
                  namePlaceholder={typeBQ} />
                <TextInputModal
                  nameTitle={'Phần mềm'}
                  valueItem={phanmem}
                  noData
                  disabled={disablePhanMem}
                  dataModal={dataBQ}
                  placeholder={'Phần mềm'}
                  click={this.clickItemPhanMem}
                  namePlaceholder={phanmem}
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
            style={styles.flatList}
            data={dataKey}
            renderItem={(item) => this.renderItem(item)}
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
    backgroundColor: "#D8D8D8"
  },
  loader: {
    marginTop: 10,
    alignItems: 'center'
  },
  txtLoc:{
    paddingVertical:10,
    color:'#fff',
    fontWeight:'600'
  },
  bntLoc:{
    marginHorizontal:20,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#2E64FE',
    borderRadius:10,
    marginBottom:20
  },
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowRadius: 6,
    shadowOpacity: 0.16,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 3,
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
    height: 60,
    backgroundColor: '#2E64FE',
  },
  containerModal: {
    width: 300,
    height: 300,
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
    paddingTop: 20
  },

  containerView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  }
});


export default CopyrightManagement;
