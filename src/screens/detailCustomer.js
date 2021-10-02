import { jsxAttribute } from '@babel/types';
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Linking,
    Modal,
    StyleSheet
} from 'react-native';
import ItemFlexRow from '../components/itemFlexRow';
import ItemDetailIcon from '../components/itemDetailIcon';
import TextInputModal from '../components/textInputModal';
import NaviHerderFull from '../components/naviHerderFull';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../constants/colors';
import common from '../utils/common';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LOCALE_KEY, {
    getLocale,
} from '../repositories/local/appLocale';
import { stringMd5 } from 'react-native-quick-md5';
import Guest from '../api/guest';

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

export default class DetailCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            typeDelete: 'Chọn loại bản quyền',
            type:null,
            statusErrorLyDo:''
        };
    }
    goBack = () => {
        this.props.navigation.goBack()
    };
    clickEdit = (email, id, name, phone) => {
        const item ={email,id,name, phone}
        this.props.navigation.navigate('EditCustomerScreen',{item})
    };
    clickReset = async (emailReset) => {
        const pass_word = await getLocale(LOCALE_KEY.pass_word);
        const email = await getLocale(LOCALE_KEY.email);
        const md5 = stringMd5(pass_word);
        const timeStamp = common.timeStamp();
        const token = common.createToken(timeStamp);

        const objPost = {
            email: email,
            password: md5,
            function: "resetpasswordcustomer",
            time: timeStamp,
            token: token,
            variable: `{'email':'${emailReset}'}`
        };
        try {
            await Guest.resetpasswordcustomer(objPost, 'message');

        } catch (e) {
            console.log(e);
        }
    };

    clickItemType = async item => {
            this.setState({
                typeDelete: item.name,
                type:item.type
            })
    };
    onDelite = () => {
        this.setState({ modalVisible: true });
      }
    onCloseDelite = () => {
        this.setState({ modalVisible: false });
      }
    render() {
        const { email, id, name, phone,statusErrorLyDo
        } = this.props.route.params.item
        const { modalVisible, typeDelete } = this.state
        return (
            <View
                style={styles.containerAll}>
                <NaviHerderFull title={'CHI TIẾT KHÁCH HÀNG'}
                    onPressBack={this.goBack}
                    buttonLeft={true} buttonRight={true}
                    nameIcon={'account-edit'}
                    textRight={'Sửa'}
                    onPressRight={()=>this.clickEdit(email, id, name, phone)}

                    buttonRightIcon={true} />
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
                  <TouchableOpacity 
                   onPress={this.onCloseDelite}
                  style={styles.bntCancel}>
                    <Text style={styles.txtButton}>HỦY</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.bntDelete}
                    // onPress={() => this.clickDelete(customerid, type)}
                  >
                    <Text style={styles.txtButton}>XÓA</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
                <View style={styles.container}>

                    <View style={[styles.View]}>
                        <ItemDetailIcon txtValue={id ? id : ''}
                            nameIcon={'code-equal'}
                            styleColour={styles.txtColour} />
                        <ItemDetailIcon txtValue={name ? name : ''}
                            nameIcon={'rename-box'}
                            styleColour={styles.txtColour} />
                        <ItemDetailIcon txtValue={email ? email : ''}
                            nameIcon={'email'}
                            styleColour={styles.txtColour} />
                        <TouchableOpacity onPress={() => {
                            if (phone !== ''
                            ) {
                                Linking.openURL(
                                    'tel:' + phone,
                                );
                            }
                        }}>
                            <ItemDetailIcon txtValue={phone ? phone : ''}
                                nameIcon={'cellphone'}
                                colorss={true}
                                isIconRight
                                iconRight={'phone'}
                                style={{ color: '#2E64FE' }}
                                containerText={{ borderBottomColor: '#fff' }}
                                styleColour={styles.txtColour} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.containerAll} >
                        <View style={styles.containerAll} />
                        <View style={styles.containerButton}>
                            <TouchableOpacity style={styles.btnCall}
                                onPress={this.onDelite}
                            >
                                <View style={styles.containerCall}>
                                    <MaterialCommunityIcons name={'delete-circle-outline'} size={25} style={styles.iconCall} />
                                    <Text style={styles.txtGoi}>Xóa</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnDuyet}
                                onPress={() => this.clickReset(email)}>
                                <View style={styles.containerReset}>
                                <MaterialCommunityIcons name={'lock-reset'} size={25} style={{color:'gray'}} />
                                    <Text style={styles.txtGoi}>Reset password</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </View>
        );
    }

}

const styles = StyleSheet.create({
    containerAll: {
        flex: 1,
        backgroundColor: '#F2F2F2'
    },
    containerModelAll: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
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
      txtButton: {
        color: '#fff',
        paddingVertical: 5
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
        height:50,
        backgroundColor: '#2E64FE',
      },
      txtTitle: {
        color: 'white',
        fontSize: 15,
        fontWeight: '600',
        marginLeft: 30,
      },
    container: {
        flex: 1,
    },
    View: {
        marginTop: 10,
        backgroundColor: "#fff",
        borderRadius:10,
    },
    txtColour: {
        fontSize: 18,
        color: '#000'
    },
      btnClose: {
    marginRight: 10,
  },
    txtDelete: {
        fontWeight: '400',
        fontSize: 15,
        color: 'red'
    },
    txtGoi: {
        // color: '#fff',
        paddingVertical: 15,
        fontWeight: '600',
        marginLeft:5,
    },
    containerReset: {
        alignItems:'center',
        flexDirection:'row',
        marginRight:20
    },
    btnCall: {
        flex: 1,
    },
    iconCall: {
        color: 'red',
        marginLeft: 20
    },
    containerCall: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    containerDelete: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 20
    },
    viewDelete: {
        flex: 1,
    },
    containerButton: {
        flexDirection: 'row',
        marginBottom: 10,
        borderRadius:10,
        backgroundColor:'#fff'
    }

})