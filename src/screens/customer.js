
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import NaviHerderFull from '../components/naviHerderFull';
import ItemCustomer from '../components/itemCustomer';
import Search from '../components/search';
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
    };
  }

  renderItem = ({ item }) => (
    <ItemCustomer navigation={this.props.navigation} item={item} />
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
      variable: `{'page':'1','pagesize':'10'}`
    };
    try {
      const response = await Guest.loadcustomer(objPost);
      const data = JSON.parse(response.data)
      this.setState({
        dataCustomer: data,
        isLoading: false,
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
    // const pass_word = await getLocale(LOCALE_KEY.pass_word);
    // const email = await getLocale(LOCALE_KEY.email);
    // const md5 = stringMd5(pass_word);
    // const timeStamp = common.timeStamp();
    // const token = common.createToken(timeStamp)

    // const objPost = {
    //   email: email,
    //   password: md5,
    //   function: "seachcustomer",
    //   time: `1`,
    //   token: 'd1ff52a77a2965156cb8e7e67d4ac931',
    //   variable: `{'email':'${'hoatv2@ninjateam.vn'}'}`
    // };
    // try {
    //   const response = await Guest.seachcustomer(objPost);
    //    const data =await response.data
    //   const datadasdasd =common.DataSeach(data)
    // } catch (e) {
    //   console.log(e);
    // }
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
      variable: `{'page':'${this.state.page}','pagesize':'5'}`
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

  render() {
    const { search, dataCustomer } = this.state;
    return (
      <View style={styles.containerAll}>
        <NaviHerderFull title={'DANH SÁCH KHÁCH HÀNG'}
          buttonLeft={true} onPressBack={this.goBack}
          buttonRight={true} nameIcon={'account-plus'}
          onPressRight={this.addCustomer}
          textRight={'Thêm'}
        />
        <Search value={search}
          // clickSearch={this.clickSearch}
          onPressFilter={this.onFilter}
          onChangeText={(text) => this.onChangeTextSearch(text)} />
        <View style={styles.container}>
          <FlatList
            style={styles.flatList}
            data={dataCustomer}
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
    height: windowHeight/11.8,
    backgroundColor: '#2E64FE',
  },
  containerModal: {
    width:  windowWidth/11.8,
    height: windowHeight/3.58,
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
    marginTop: 10,
    paddingBottom: 30
  },

  containerView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  }
});


export default Customer;
