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
            modalVisible: true,
            typeDelete: 'Chọn loại bản quyền',
            type:null,
        };
    }
    goBack = () => {
        this.props.navigation.goBack()
    };
    clickEdit = () => {
        this.props.navigation.navigate('EditCustomerScreen')
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
        const { email, id, name, phone
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
                    onPressRight={this.clickEdit}

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
                <View style={styles.container}>

                    <View style={[styles.View]}>
                        <ItemDetailIcon txtValue={id ? id : ''}
                            nameIcon={'bank'}
                            styleColour={styles.txtColour} />
                        <ItemDetailIcon txtValue={name ? name : ''}
                            nameIcon={'bank'}
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
                                    <Text style={styles.txtGoi}>XÓA</Text>
                                    <View style={{ width: 30 }} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnDuyet}
                                onPress={() => this.clickReset(email)}>
                                <View style={styles.containerReset}>

                                    <Text style={styles.txtGoi}>RESET MẬT KHẨU</Text>
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
        backgroundColor: '#D8D8D8'
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
        marginTop: 30,
        backgroundColor: "#fff"
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
        color: '#fff',
        paddingVertical: 15,
        fontWeight: '600'
    },
    containerReset: {
        justifyContent: 'center',
        alignItems: 'center'

    },
    btnCall: {
        flex: 1,
        height: 50,
        borderRadius: 20,
        backgroundColor: 'red',
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
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 20
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
        flexDirection: 'row',
        marginBottom: 20,
    }

})