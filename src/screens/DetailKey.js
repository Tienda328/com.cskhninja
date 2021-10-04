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
import ItemComponentTitle from '../components/itemComponentTitle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NaviHerderFull from '../components/naviHerderFull';
import common from '../utils/common';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LOCALE_KEY, {
  getLocale,
} from '../repositories/local/appLocale';
import Guest from '../api/guest';
import { stringMd5 } from 'react-native-quick-md5';

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
      modalVisible: false,
      typeDelete: 'Chọn lý do xóa',
      typeNote: null,
      statusErrorLyDo: '',
      customerid: null,
      customername: null,
      customeremail: null,
      datecreate: null,
      customerphone: null,
      planname: null,
      productName: null,
      expirationdate: null,
      conlai: null,
      paymentName: null,
      note: null,
      messagebill: null,
      price: null,
      discount: null,
      type: null,
      userSeller: null,
      advance:null,
      hid:null,
      id:null
    };
  }

  goBack = () => {
    this.props.navigation.goBack()
  };
  clickItemType = async item => {
    this.setState({
      typeDelete: item.name,
      typeNote: item.type
    })
  };
  clickEdit = (item) => {
    this.props.navigation.navigate('EditKeyScreen', { item })
  };
  onDelite = () => {
    this.setState({
      modalVisible: true,
      typeDelete: 'Chọn lý do xóa',
      statusErrorLyDo: ''
    });
  }
  onCloseDelite = () => {
    this.setState({
      modalVisible: false,
      typeDelete: 'Chọn lý do xóa',
      statusErrorLyDo: ''
    });
  }

  async componentDidMount() {
    const { id, type
    } = this.props.route.params.item
    const pass_word = await getLocale(LOCALE_KEY.pass_word);
    const email = await getLocale(LOCALE_KEY.email);
    const md5 = stringMd5(pass_word);
    const timeStamp = common.timeStamp();
    const token = common.createToken(timeStamp)
    const objPost = {
      email: email,
      password: md5,
      function: "viewkey",
      time: timeStamp,
      token: token,
      variable: `{'type':'${type}','id':'${id}'}`
    };
    try {
      const response = await Guest.viewkey(objPost);
      const data = JSON.parse(response.data)
      this.setState({
        customerid: data.customerid,
        customername: data.customername,
        datecreate: data.datecreate,
        customeremail: data.customeremail,
        customerphone: data.customerphone,
        planname: data.planname,
        productName: data.productName,
        expirationdate: data.expirationdate,
        conlai: data.conlai,
        paymentName: data.paymentName,
        messagebill: data.messagebill,
        note: data.note,
        price: data.price,
        discount: data.discount,
        type: data.type,
        userSeller: data.username,
        advance: data.advance ,
        hid: data.hid,
        id:data.id
      })
    } catch (e) {
      console.log(e);
    }
  }

  clickDelete = async (id, type) => {
    if (this.state.typeNote === null) {
      this.setState({
        statusErrorLyDo: 'cần chọn lý do xóa'
      })
    } else {
      const pass_word = await getLocale(LOCALE_KEY.pass_word);
      const email = await getLocale(LOCALE_KEY.email);
      const md5 = stringMd5(pass_word);
      const timeStamp = common.timeStamp();
      const token = common.createToken(timeStamp)
      const objPost = {
        email: email,
        password: md5,
        function: "removekey",
        time: timeStamp,
        token: token,
        variable: `{'id':'${id}','type':'${type}','advance':'${this.state.typeNote}'}`
      };
      try {
       const response= await Guest.removekey(objPost, 'message');
        this.setState({
          statusErrorLyDo: '',
          modalVisible: false,
        })
      
        this.props.navigation.goBack()
      } catch (e) {
        console.log(e);
      }
    }
  }
  render() {
    const { customerid, customername, datecreate, customeremail, customerphone, planname,
      productName, expirationdate, conlai, paymentName, messagebill, note, userSeller,
      price, discount, type, modalVisible, typeDelete, statusErrorLyDo,advance,hid,id
    } = this.state
    const pricenew = price - discount;
    const itemProps = this.props.route.params.item;
    console.log('sdsdd', type)
    return (
      <View
        style={styles.containerAll}>
        <NaviHerderFull title={'CHI TIẾT KEY'}
          onPressBack={this.goBack}
          buttonLeft={true} buttonRight={true}
          nameIcon={'account-edit'}
          textRight={'Sửa'}
          onPressRight={() => this.clickEdit(itemProps)} />
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
              <View style={{ flex: 1, marginTop: 20 }}>
                <TextInputModal
                  dataModal={DataDelete}
                  nameIcon={'call-merge'}
                  valueItem={typeDelete}
                  isError={true}
                  statusError={statusErrorLyDo}
                  noData
                  click={this.clickItemType}
                  namePlaceholder={typeDelete} />
                <View style={styles.containerBNT}>
                  <TouchableOpacity style={styles.bntCancel}
                    onPress={this.onCloseDelite}
                  >
                    <Text style={styles.txtButton}>HỦY</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.bntDelete}
                    onPress={() => this.clickDelete(id, type)}
                  >
                    <Text style={styles.txtButton}>XÓA</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <ScrollView style={styles.container}>
          <ItemComponentTitle
            nameTitle={'Thông tin khách hàng'}
            drawIconLeft={
              <View>
                <ItemDetailIcon txtValue={customerid ? customerid : ''}
                  nameIcon={'code-equal'}
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
            } />
          <ItemComponentTitle
            nameTitle={'Thông tin phần mềm'}
            drawIconLeft={
              <View>
                <ItemDetailIcon txtValue={productName ? productName : ''}
                  nameIcon={'blender-software'}
                  styleColour={styles.txtColour} />
                <ItemDetailIcon txtValue={planname ? planname : ''}
                  nameIcon={'gift'}
                  styleColour={styles.txtColour} />
                 { type==='2'? <ItemDetailIcon txtValue={hid ? hid : ''}
                  nameIcon={'qrcode'}
                  styleColour={styles.txtColour} /> :null}
                <ItemDetailIcon txtValue={expirationdate ? common.formatDate(expirationdate) : ''}
                  nameIcon={'calendar-range'}
                  styleColour={styles.txtColour} />
                <ItemDetailIcon txtValue={conlai ? conlai : ''}
                  nameIcon={'timer-sand'}
                  styleColour={styles.txtColour} />
                <ItemDetailIcon txtValue={price ? common.formatNumber(pricenew) : ''}
                  nameIcon={'currency-usd'}
                  styleColour={styles.txtColour} />
                  <ItemDetailIcon txtValue={price ? common.formatNumber(discount) : ''}
                  nameIcon={'sale'}
                  styleColour={styles.txtColour} />
                <ItemDetailIcon txtValue={paymentName ? paymentName : ''}
                  nameIcon={'bank'}
                  styleColour={styles.txtColour} />
                <ItemDetailIcon txtValue={messagebill ? messagebill : ''}
                  nameIcon={'receipt'}
                  containerText={{ borderBottomColor: '#fff' }}
                  styleColour={styles.txtColour} />
              </View>
            } />
          <ItemComponentTitle
            nameTitle={'Thông tin người bán'}
            drawIconLeft={
              <View>
                <ItemDetailIcon txtValue={userSeller ? userSeller : ''}
                  nameIcon={'account-child'}
                  styleColour={styles.txtColour} />
                {note === '' || note === null ?
                  <ItemDetailIcon txtValue={'ghi chú'}
                    nameIcon={'calendar-text'}
                    style={{ color: '#BDBDBD', fontStyle: 'italic' }}
                    styleColour={styles.txtColour} /> :
                  <ItemDetailIcon txtValue={note ? note : ''}
                    nameIcon={'calendar-text'}
                    styleColour={styles.txtColour} />
                }
                <TouchableOpacity style={styles.View}>
                  <ItemDetailIcon txtValue={'Thêm Hóa đơn'}
                    nameIcon={'folder-image'}
                    style={{ color: '#2E64FE' }}
                    colorss={true}
                    styleColour={styles.txtColour} />
                </TouchableOpacity>
                {advance === '' || advance === null ?
                  <ItemDetailIcon txtValue={'ghi chú nâng cao'}
                    nameIcon={'content-save'}
                    style={{ color: '#BDBDBD', fontStyle: 'italic' }}
                    containerText={{ borderBottomColor: '#fff' }}
                    styleColour={styles.txtColour} /> :
                  <ItemDetailIcon txtValue={advance ? advance : ''}
                    nameIcon={'content-save'}
                    containerText={{ borderBottomColor: '#fff' }}
                    styleColour={styles.txtColour} />
                }
              </View>
            } />
          <TouchableOpacity style={styles.containerDelete}
            onPress={this.onDelite}
          >
            <MaterialCommunityIcons name={'delete-circle-outline'} size={30} style={{ color: '#FE2E2E' }} />
            <Text style={styles.txtDelete}> Xóa key</Text>
          </TouchableOpacity>
        </ScrollView>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  containerAll: {
    flex: 1,
    backgroundColor: '#F2F2F2'
  },
  containerBNT: {
    flexDirection: 'row'
  },
  bntCancel: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginLeft: 20,
    marginRight: 10,
    backgroundColor: 'gray',
    borderRadius: 10,
    marginBottom: 20
  },
  bntDelete: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderRadius: 10,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 20,
    backgroundColor: 'red'
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
    backgroundColor: '#F7941D',
  },
  txtTitle: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 30,
  },
  View: {
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  txtTitleKey: {
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 20,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#D8D8D8',
  },
  txtDelete: {
    paddingVertical: 11,
    fontWeight: '600',
    marginLeft: 5,
  },
  txtButton: {
    color: '#fff',
    paddingVertical: 5
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
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#fff'
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