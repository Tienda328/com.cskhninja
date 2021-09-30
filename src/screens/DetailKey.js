import { jsxAttribute } from '@babel/types';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Linking,
  StyleSheet
} from 'react-native';
import ItemDetailIcon from '../components/itemDetailIcon';
import TextInputModal from '../components/textInputModal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NaviHerderFull from '../components/naviHerderFull';
import common from '../utils/common';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DataDelete = [
  {
    id: '111',
    type: '1',
    name: 'Khách hàng không mua',
  },
  {
    id: '112',
    type: '2',
    name: 'Khách hàng dùng thử',
  },
  {
    id: '113',
    type: '3',
    name: 'Khách hàng đổi key',
  },
  {
    id: '11442',
    type: '4',
    name: 'Khách hàng refund',
  },
  {
    id: 'dsdsd11442',
    type: '5',
    name: 'Khách hàng Nâng cấp',
  },
]
export default class DetailKey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
      typeDelete: 'Chọn loại bản quyền',
      type: null,
    };
  }

  goBack = () => {
    this.props.navigation.goBack()
  };
  clickItemType = async item => {
    this.setState({
        typeDelete: item.name,
        type:item.type
    })
};
  clickEdit = () => {
    this.props.navigation.navigate('EditKeyScreen')
  };
  onCloseDelite = () => {
    this.setState({ modalVisible: false });
  }
  render() {
    const { customerid, customername, datecreate, customeremail, customerphone,
      productName, expirationdate, conlai, paymentName, messagebill, note, price, discount
    } = this.props.route.params.item
    const { modalVisible, typeDelete } = this.state
    const pricenew = price - discount
    return (
      <View
        style={styles.containerAll}>
        <NaviHerderFull title={'CHI TIẾT KEY'}
          onPressBack={this.goBack}
          buttonLeft={true} buttonRight={true}
          nameIcon={'account-edit'}
          textRight={'Sửa'}
          onPressRight={this.clickEdit} />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.containerModelAll}>
            <View style={styles.containerModal}>
              <View style={styles.modalHerder}>
                <Text />
                <Text style={styles.txtTitle}>LÝ DO XÓA</Text>
                <TouchableOpacity
                  style={styles.btnClose}
                  onPress={this.onCloseDelite}>
                  <Ionicons
                    name={'close-outline'}
                    size={25}
                    style={{ color: '#fff' }}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <TextInputModal
                  dataModal={DataDelete}
                  nameIcon={'call-merge'}
                  valueItem={typeDelete}
                  noData
                  click={this.clickItemType}
                  namePlaceholder={typeDelete} />
              </View>
            </View>
          </View>
        </Modal>
        <ScrollView style={styles.container}>
          <View style={[styles.View, { marginTop: 0 }]}>
            <ItemDetailIcon txtValue={customerid ? customerid : ''}
              nameIcon={'bank'}
              styleColour={styles.txtColour} />
            <ItemDetailIcon txtValue={datecreate ? common.formatDate(datecreate) : ''}
              nameIcon={'calendar-range'}
              styleColour={styles.txtColour} />
            <ItemDetailIcon txtValue={customername ? customername : ''}
              nameIcon={'account'}
              styleColour={styles.txtColour} />
            <ItemDetailIcon txtValue={customeremail ? customeremail : ''}
              nameIcon={'email'}
              styleColour={styles.txtColour} />
            <TouchableOpacity onPress={() => {
              if (customerphone !== ''
              ) {
                Linking.openURL(
                  'tel:' + customerphone,
                );
              }
            }}>
              <ItemDetailIcon txtValue={customerphone ? customerphone : ''}
                nameIcon={'cellphone'}
                colorss={true}
                isIconRight
                iconRight={'phone'}
                style={{ color: '#2E64FE' }}
                containerText={{ borderBottomColor: '#fff' }}
                styleColour={styles.txtColour} />
            </TouchableOpacity>
          </View>
          <View style={styles.View}>
            <ItemDetailIcon txtValue={productName ? productName : ''}
              nameIcon={'call-merge'}
              styleColour={styles.txtColour} />
            <ItemDetailIcon txtValue={customername ? customername : ''}
              nameIcon={'rename-box'}
              styleColour={styles.txtColour} />
            <ItemDetailIcon txtValue={expirationdate ? common.formatDate(expirationdate) : ''}
              nameIcon={'calendar-range'}
              styleColour={styles.txtColour} />
            <ItemDetailIcon txtValue={conlai ? conlai : ''}
              nameIcon={'timer-sand'}
              styleColour={styles.txtColour} />
            <ItemDetailIcon txtValue={price ? common.formatNumber(pricenew) : ''}
              nameIcon={'currency-usd'}
              styleColour={styles.txtColour} />
            <ItemDetailIcon txtValue={paymentName ? paymentName : ''}
              nameIcon={'bank'}

              styleColour={styles.txtColour} />
            <ItemDetailIcon txtValue={messagebill ? messagebill : ''}
              nameIcon={'calendar-text'}
              containerText={{ borderBottomColor: '#fff' }}
              styleColour={styles.txtColour} />

          </View>
          <View style={styles.View}>
            <ItemDetailIcon txtValue={note ? note : ''}
              nameIcon={'calendar-text'}
              containerText={{ borderBottomColor: '#fff' }}
              styleColour={styles.txtColour} />
          </View>
          <TouchableOpacity style={styles.View}>
            <ItemDetailIcon txtValue={'Thêm Hóa đơn'}
              nameIcon={'calendar-text'}
              style={{ color: '#2E64FE' }}
              containerText={{ borderBottomColor: '#fff' }}
              styleColour={styles.txtColour} />
          </TouchableOpacity>
          {/* <View style={styles.containerButton}>
                        <TouchableOpacity style={styles.btnCall}
                          onPress={() => {
                            if (customerphone !== ''
                            ) {
                              Linking.openURL(
                                'tel:' + customerphone,
                              );
                            }
                          }}
                        >
                            <View style={styles.containerCall}>
                                <MaterialCommunityIcons name={'phone'} size={25} style={styles.iconCall} />
                                <Text style={styles.txtGoi}>GỌI</Text>
                                <View style={{ width: 30 }} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnDuyet}>
                            <View style={styles.containerCall}>
                                <MaterialCommunityIcons name={'checkbox-blank-outline'} size={25} style={styles.iconCall} />
                                <Text style={styles.txtGoi}>DUYỆT</Text>
                                <View style={{ width: 30 }} />
                            </View>
                        </TouchableOpacity>
                    </View> */}
          <TouchableOpacity style={styles.containerDelete}>
            <MaterialCommunityIcons name={'delete-circle-outline'} size={40} style={{ color: '#FE2E2E' }} />
            {/* <Text style={styles.txtDelete}> Xóa key</Text> */}
          </TouchableOpacity>
        </ScrollView>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  containerAll: {
    flex: 1,
    // backgroundColor: '#D8D8D8'
    backgroundColor: '#D8D8D8'
  },
  container: {
    flex: 1,
  },
  btnClose: {
    marginRight: 10,
  },
  txtColour: {
    fontSize: 18,
  },
  containerModelAll: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
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
  modalHerder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#2E64FE',
  },
  txtTitle: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 30,
  },
  View: {
    marginTop: 30,
    backgroundColor: "#fff"
  },
  txtDelete: {
    fontWeight: '400',
    fontSize: 15,
    color: 'red'
  },
  txtGoi: {
    color: '#fff',
    paddingVertical: 15,
    marginRight: 15,
    fontWeight: '600'
  },
  btnCall: {
    flex: 1,
    height: 50,
    borderRadius: 20,
    backgroundColor: '#0080FF',
    marginLeft: 20,
    marginRight: 10,
  },
  iconCall: {
    color: '#fff',
    marginLeft: 10
  },
  containerCall: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  containerDelete: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 20
  },
  viewDelete: {
    flex: 1,
  },
  btnDuyet: {
    flex: 1,
    height: 50,
    borderRadius: 20,
    backgroundColor: '#6E6E6E',
    marginLeft: 20,
    marginRight: 10,
  },
  containerButton: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,

  }

})