import React, {Component} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ItemLoaiBanQuyen from '../components/ItemLoaiBanQuyen'
const windowHeight = Dimensions.get('window').height;

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
  {
    id: '3a91aa97f63',
    title: 'Second Item',
  },
  {
    id: '586946-145571e29d72',
    title: 'Third Item',
  },
  {
    id: 'bd7acbea-c1b153abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3dbd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a41aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: 'bd7ac1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f',
    title: 'Third Item',
  },

];


class TextInputModal extends Component {
  state = {
    modalVisible: false,
    namePlaceholder:''
  };

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  clickItem =item  => {
    this.setState({namePlaceholder: item.title,
      modalVisible:false
    });
  };



  renderItem = ({ item }) => (
    <ItemLoaiBanQuyen  nameLoai ={item.title} onPress={()=> this.clickItem(item) }/>
  );

  render() {
    const {modalVisible, namePlaceholder} = this.state;
    const {nameTitle, isError, placeholder} = this.props;
    return (
      <View style={styles.containerAll}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
          }}>
          <View style={styles.containerHide}>
            <View style={styles.containerModal}>
              <View style={styles.modalHerder}>
                <Text  />
                <Text style={styles.txtTitle}>{nameTitle}</Text>
                <TouchableOpacity
                  style={styles.btnClose}
                  onPress={() => this.setModalVisible(!modalVisible)}>
                  <Ionicons
                    name={'close-outline'}
                    size={25}
                    style={{color: '#fff'}}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <FlatList
                style={{height:450}}
                  data={DATA}
                  renderItem={(item)=>this.renderItem(item)}
                  keyExtractor={item => item.id}
                />
              </View>
            </View>
          </View>
        </Modal>
        <View>
          <TouchableOpacity
            style={styles.containerInput}
            onPress={() => this.setModalVisible(true)}>
            <View style={styles.containerAll}>
              <Text style={styles.txtName}>{nameTitle}</Text>
              <Text style={styles.txtSelect}>{namePlaceholder===''?placeholder:namePlaceholder}</Text>
            </View>
            <View style={styles.iconShow}>
              <Ionicons
                name={'caret-down-outline'}
                size={25}
                style={{color: 'gray'}}
              />
            </View>
          </TouchableOpacity>
          {isError ? (
            <Text style={styles.txtError}>sai roi</Text>
          ) : (
            <View style={styles.viewHeight} />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerAll: {
    flex: 1,
  },
  txtTitle:{
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
    marginLeft:30,
  },
  modalHerder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#2E64FE',
  },
  btnClose: {
    marginRight: 10,
  },
  iconShow: {
    marginRight: 10,
    justifyContent: 'center',
  },
  containerModal: {
    width: 300,
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
  txtError: {
    color: 'red',
    fontSize: 15,
    marginVertical: 5,
    marginLeft: 25,
  },
  txtSelect: {
    height: windowHeight / 19.5,
    marginTop: 5,
    color: 'gray',
    fontSize: 14,
  },
  txtName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
    marginLeft: 3,
    marginTop: 10,
  },
  viewHeight: {
    height: 20,
  },
  containerHide: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerInput: {
    // height: 70,
    height: windowHeight / 10,
    paddingLeft: 6,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
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
});

export default TextInputModal;
