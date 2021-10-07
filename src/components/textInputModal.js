import React, { Component } from 'react';
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
    this.setState({ modalVisible: visible });
  };

  clickItem = item => {
    this.setState({
      // namePlaceholder: item.title,
      modalVisible: false
    });
    this.props.click(item)
  };



  renderItem = ({ item, index }) => (
    <ItemLoaiBanQuyen item={item} index={index} onPress={() => this.clickItem(item)} />
  );

  render() {
    const { modalVisible } = this.state;
    const { nameIcon, statusError, isError, stylesInput, disabled, noData, dataModal, namePlaceholder, valueItem } = this.props;
    return (
      <View style={styles.containerAll}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
          }}>
          <View style={styles.containerHide}>
            <View style={styles.containerModal}>
              <View style={styles.modalHerder}>
                <Text />
                <Text style={styles.txtTitle}>{valueItem}</Text>
                <TouchableOpacity
                  style={styles.btnClose}
                  onPress={() => this.setModalVisible(!modalVisible)}>
                  <Ionicons
                    name={'close-outline'}
                    size={25}
                    style={{ color: '#fff' }}
                  />
                </TouchableOpacity>
              </View>
              <View>
                {noData ? <FlatList
                  style={{ height: 450 }}
                  data={dataModal}
                  renderItem={(item, index) => this.renderItem(item, index)}
                  keyExtractor={(item, index) => index.toString()}
                /> : <Text style={styles.txtNoData}>Không có dữ liệu</Text>
                }
              </View>
            </View>
          </View>
        </Modal>
        <View>
          <TouchableOpacity
            disabled={disabled}
            style={[styles.containerInput, stylesInput]}
            onPress={() => this.setModalVisible(true)}>
            <MaterialCommunityIcons name={nameIcon} size={20} style={{ color: 'gray', marginHorizontal: 20 }} />


            <View style={styles.iconShow}>
              <Text style={styles.txtSelect}>{namePlaceholder}</Text>

              <Ionicons
                name={'caret-down-outline'}
                size={20}
                style={{ color: 'gray', marginRight: 20 }}
              />
            </View>
          </TouchableOpacity>
          {isError && statusError!=='' ? (
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
  txtNoData: {
    textAlign: 'center',
    marginTop: 20,
  },
  containerIcon: {
    // flexDirection:'row'
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
    backgroundColor: '#F7941D',
  },
  btnClose: {
    marginRight: 10,
  },
  iconShow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: windowHeight / 17.8,
    borderBottomColor: '#D8D8D8',
    borderBottomWidth: 0.5,
  },
  containerModal: {
    width: windowWidth / 1.31,
    height: windowHeight / 1.43,
    marginHorizontal: 20,
    backgroundColor:'#fff'
  },
  txtError: {
    color: '#FF0000',
    fontSize: 12,
    marginVertical: 5,
    marginLeft: 25,
  },
  txtSelect: {
    color: 'gray',
    fontSize: 14,
  },
  txtName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
    marginLeft: 20,
  },
  viewHeight: {
    // height: 20,
  },
  containerHide: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerInput: {
    height: windowHeight / 17.8,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom:1,
    backgroundColor: "#fff",

  },
});

export default TextInputModal;
