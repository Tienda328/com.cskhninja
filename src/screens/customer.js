
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import NaviHerderFull from '../components/naviHerderFull';
import ItemCustomer from '../components/itemCustomer';
import Search from '../components/search';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LOCALE_KEY, {
  getLocale,
} from '../repositories/local/appLocale';
import Guest from '../api/guest';
import common from '../utils/common';
import { stringMd5 } from 'react-native-quick-md5';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
class Customer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      modalVisible: false,
      dataCustomer: [],
      page: 1,
      isLoading: false,
      txtError: '',
      isFetching: false
    };
  }

  renderItem = ({ item, index }) => (
    <ItemCustomer navigation={this.props.navigation} item={item} index={index} />
  );

  componentDidMount() {
    this.setState({
      isLoading: true
    }, () => this.getData())
  }

  getData = async () => {
    const pass_word = await getLocale(LOCALE_KEY.pass_word);
    const email = await getLocale(LOCALE_KEY.email);
    const md5 = stringMd5(pass_word);
    const timeStamp = common.timeStamp();
    const token = common.createToken(timeStamp)
    const objPost = {
      email: email,
      password: md5,
      function: "loadcustomer",
      time: timeStamp,
      token: token,
      variable: `{'page':'1','pagesize':'50'}`
    };
    try {
      const response = await Guest.loadcustomer(objPost);
      const data = JSON.parse(response.data)
      this.setState({
        dataCustomer: data,
        isLoading: false,
        isFetching: false
      })
    } catch (e) {
      console.log(e);
    }
  }

  onChangeTextSearch = (text) => {
    this.setState({
      search: text,
    });
  };
  addCustomer = () => {
    this.props.navigation.navigate('AddCustomerScreen')
  }
  goBack = () => {
    this.props.navigation.goBack()
  };

  clickSearch = async () => {
    const pass_word = await getLocale(LOCALE_KEY.pass_word);
    const email = await getLocale(LOCALE_KEY.email);
    const role = await getLocale(LOCALE_KEY.role);
    const md5 = stringMd5(pass_word);
    const timeStamp = common.timeStamp();
    const token = common.createToken(timeStamp)
    let dataTest = [];
    const objPost = {
      email: email,
      password: md5,
      function: "seachmycustomer",
      time: timeStamp,
      token: token,
      variable: `{'keyword':'${this.state.search}','page':'1','pagesize':'50'}`
    };
    try {
      const response = await Guest.seachmycustomer(objPost);
      const data = JSON.parse(response.data)
      if (data === null) {
        await this.setState({
          dataCustomer: []
        });
      } else {
        await this.setState({
          dataCustomer: data
        });
      }
    } catch (e) {
      console.log(e);
    }
  };


  handleLoadMore = () => {
    this.setState({
      isLoading: true,
      page: this.state.page + 1
    }, () => this.getataMore())

  }

  getataMore = async () => {
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
      function: "loadcustomer",
      time: timeStamp,
      token: token,
      variable: `{'page':'${this.state.page}','pagesize':'50'}`
    };

    try {
      const response = await Guest.loadcustomer(objPost);
      const data = JSON.parse(response.data)
      if (data !== '[]') {
        const dataFull = this.state.dataCustomer.concat(data)
        this.setState({
          dataCustomer: dataFull,
        })
      }
    } catch (e) {
      console.log(e);
    }
  }

  renderFooter = () => {
    return (this.state.isLoading ?
      <View style={styles.loader}>
        <ActivityIndicator size='large' />
      </View> : null
    )
  }

  onRefresh = () => {
    this.setState({
      isLoading: true,
      search: ''
    }, () => this.getData())
  }


  render() {
    const { search, dataCustomer } = this.state;
    console.log('fsdf', windowHeight)

    return (
      <View style={styles.containerAll}>
        <NaviHerderFull title={'DANH SÁCH KHÁCH HÀNG'}
          buttonRight={true} nameIcon={'account-plus'}
          onPressRight={this.addCustomer}
          textRight={'Thêm'}
        />
        <View style={styles.container}>
          <FlatList
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}
            ListHeaderComponent={
              <View>
                <Search value={search}
                  style={{ marginBottom: 10 }}
                  clickSearch={this.clickSearch}
                  onPressFilter={this.onFilter}
                  onChangeText={(text) => this.onChangeTextSearch(text)} />
                {dataCustomer === null || dataCustomer===[] ? <View style={{ alignItems: 'center', height: windowHeight/1.5, justifyContent:'center' }}>
                <Image
                    style={{ width: 120, height: 120, resizeMode: 'contain' }}
                    source={require('../resource/image/iconNullClient.png')}
                  />
                  <Text>Bạn không có khách hàng nào !</Text>
                </View> : null
                }
              </View>
            }
            data={dataCustomer}
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
  container: {
    flex: 1,
    // backgroundColor: '#FAFAFA',
    // marginHorizontal: 20,
    // marginTop: 20,
    // borderRadius: 10,
    // borderColor: '#fff',
    // shadowColor: '#000',
    // shadowRadius: 6,
    // shadowOpacity: 0.16,
    // shadowOffset: {
    //   width: 0,
    //   height: 5,
    // },
    // elevation: 3,
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
    height: windowHeight / 11.8,
    backgroundColor: '#2E64FE',
  },
  containerModal: {
    width: windowWidth / 11.8,
    height: windowHeight / 3.58,
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


export default Customer;
