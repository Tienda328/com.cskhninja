
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
    id: 'bd7acbea-c1b-3ad53abb28ba',
    title: 'First Item',
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
        <View style={styles.containerAll}>
          <Image
            style={{ width: '100%', height: '100%', position: 'absolute' }}
            source={require('../resource/image/background-login.png')}
          />
          <Search value={search}
            onPressFilter={this.onFilter}
            onChangeText={(text) => this.onChangeTextSearch(text)} />
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
          <View style={styles.height} />

        </View>
      </View>
    )
  }

};
const styles = StyleSheet.create({
  containerAll: {
    flex: 1
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
    marginTop: 10
  },

  containerView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  }
});


export default CopyrightManagement;
