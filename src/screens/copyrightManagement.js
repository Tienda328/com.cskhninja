
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import NaviHerderFull from '../components/naviHerderFull';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ItemCustomer from '../components/itemManage';
import Search from '../components/search';
import TextInputModal from '../components/textInputModal';
import LOCALE_KEY, {
  getLocale,
} from '../repositories/local/appLocale';
import Guest from '../api/guest';
import common from '../utils/common';
import { stringMd5 } from 'react-native-quick-md5';

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
    id: 'bd7acbesdds1b1-abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-dsdsc605-48d3-91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-sss471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: 'bd7acbesddsdds1b1-abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-sssdsdsc605-48d3-91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3daddd1-sss471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];


class CopyrightManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      modalVisible: false
    };
  }

  renderItem = ({ item }) => (
    <ItemCustomer navigation={this.props.navigation} />
  );
  async componentDidMount() {
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
      variable:"{'type':'1'}"
    };
    try {
      const response = await Guest.loadproduct(objPost);
      console.log('ds', response.data)
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

  render() {
    const { search, modalVisible } = this.state;
    return (
      <View style={styles.containerAll}>
        <NaviHerderFull title={'QUẢN LÝ'} />
        <Search value={search}
            onPressFilter={this.onFilter}
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
                <View>
                  <View style={styles.height}/>
                  <TextInputModal
                    nameTitle={'Loại quản lý'}
                    isError={true}
                    placeholder={'Chọn loại quản lý'} />
                </View>
                <View>
                </View>
              </View>
            </View>
          </Modal>
          <FlatList
            style={styles.flatList}
            data={DATA}
            renderItem={(item) => this.renderItem(item)}
            keyExtractor={item => item.id}
          />

        </View>
      </View>
    )
  }

};
const styles = StyleSheet.create({
  containerAll: {
    flex: 1,
    backgroundColor:"#D8D8D8"
  },
  container:{
    flex:1,
    backgroundColor:'#FAFAFA',
    marginHorizontal:20,
    marginVertical:20,
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
    height: 200,
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
