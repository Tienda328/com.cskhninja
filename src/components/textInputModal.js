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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ItemLoaiBanQuyen from '../components/ItemLoaiBanQuyen'
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

 class TextInputModal extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  clickItem =item  => {
    this.setState({
      // namePlaceholder: item.title,
      modalVisible:false
    });
    this.props.click(item)
  };



  renderItem = ({ item, index }) => (
    <ItemLoaiBanQuyen  item ={item} index={index} onPress={()=> this.clickItem(item) }/>
  );

  render() {
    const {modalVisible} = this.state;
    const {nameIcon,statusError, isError,stylesInput, disabled,noData, dataModal,namePlaceholder, valueItem} = this.props;
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
                <Text style={styles.txtTitle}>{valueItem}</Text>
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
              {noData ?   <FlatList
                style={{height:450}}
                  data={dataModal}
                  renderItem={(item, index)=>this.renderItem(item, index)}
                  keyExtractor={(item, index) => index.toString()}
                />:<Text style={styles.txtNoData}>Không có dữ liệu</Text>

              }
              </View>
            </View>
          </View>
        </Modal>
        <View>
          <TouchableOpacity
            disabled={disabled}
            style={[styles.containerInput, stylesInput ,{backgroundColor:disabled?'#D8D8D8':'#fff'}]}
            onPress={() => this.setModalVisible(true)}>
              <View style={styles.containerIcon}>
              <MaterialCommunityIcons name={nameIcon} size={20} style={{ color: 'gray', marginLeft:20 }} />
              <Text style={styles.txtSelect}>{namePlaceholder}</Text>
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
            <Text style={styles.txtError}>{statusError}</Text>
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
  txtNoData:{textAlign:'center',
  marginTop:20,
},
containerIcon:{
  flexDirection:'row'
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
    height: windowHeight/11.8,
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
    width: windowWidth/1.31,
    height: windowHeight/1.43,
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
    fontSize: 12,
    marginVertical: 5,
    marginLeft: 25,
  },
  txtSelect: {
    color: 'gray',
    fontSize: 14,
    marginLeft:10,
  },
  txtName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
    marginLeft: 20,
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
    height: windowHeight/17.8,
    borderRadius: 10,
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection: 'row',
    shadowRadius: 6,
    shadowOpacity: 0.16,
    shadowOffset: {
        width: 0,
        height: 5,
    },
    elevation: 3,
    backgroundColor: "#fff",
    marginHorizontal: 20,
  },
});

export default TextInputModal;
