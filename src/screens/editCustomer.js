import { jsxAttribute } from '@babel/types';
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Image
} from 'react-native';
import NaviHerderFull from '../components/naviHerderFull';
import TextInputKey from '../components/TextIputKey';
import TextInputModal from '../components/textInputModal';
import ItemComponentTitle from '../components/itemComponentTitle';
export default class DetailKey extends React.Component {
    constructor(props) {
        super(props);
        const { email, id, name, phone
        } = this.props.route.params.item
        this.state = {
            surname: name,
            email: email,
            phoneNumber: phone,
            passwork: '',
        };
    }

    goBack = () => {
        this.props.navigation.goBack()
    };


    onChangeTextSuerName = (text) => {
        this.setState({
            surname: text,
        });
    };

    onChangeTextEmail = (text) => {
        this.setState({
            email: text,
        });
    };
    onChangeTextPhoneNumber = (text) => {
        this.setState({
            phoneNumber: text,
        });
    };
    onChangeTextPassWork = (text) => {
        this.setState({
            passwork: text,
        });
    };
    render() {
        const { surname, email, phoneNumber, passwork } = this.state;
        const item = this.props.route.params;

        return (
            <View
                style={styles.containerAll}>
                <NaviHerderFull title={'SỬA TÀI KHOẢN KHÁCH HÀNG'} buttonLeft={true} onPressBack={this.goBack} />
                <View style={styles.container} >
                    <ItemComponentTitle
                        nameTitle={'Thông tin tài khoản'}
                        drawIconLeft={
                            <View>
                                <TextInputKey
                                    onChangeText={(text) => this.onChangeTextSuerName(text)}
                                    placeholder="Họ tên"
                                    nameIcon={'rename-box'}
                                    editable={true}
                                    value={surname}
                                />
                                <TextInputKey
                                    onChangeText={(text) => this.onChangeTextEmail(text)}
                                    placeholder="hoatv@ninjateam.vn"
                                    nameText={'Email'}
                                    nameIcon={'email'}
                                    editable={true}
                                    value={email}
                                />
                                <TextInputKey
                                    onChangeText={(text) => this.onChangeTextPhoneNumber(text)}
                                    placeholder="025447125"
                                    nameText={'Số điện thoại'}
                                    nameIcon={'cellphone'}
                                    editable={true}
                                    value={phoneNumber}
                                />
                                <TextInputKey
                                    onChangeText={(text) => this.onChangeTextPassWork(text)}
                                    placeholder="Nhập mật khẩu"
                                    nameText={'Mật khẩu'}
                                    nameIcon={'lock'}
                                    editable={true}
                                    value={passwork}
                                />
                            </View>
                        } />

                    <View style={{ flex: 1 }}></View>
                    {/* <TextInputModal
                        nameTitle={'Trạng thái'}
                        isError={true}
                        placeholder={'active'} /> */}

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.btnContinue}>
                        <Text style={styles.txtClick}>Lưu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        on
                        activeOpacity={0.8}
                        style={styles.btnHuy}>
                        <Text style={styles.txtHuy}>Hủy</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    containerAll: {
        flex: 1,
    },
    bottomKey: {
        height: 25,
    },
    container: {
        flex: 1,

    },
    btnContinue: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    btnHuy: {
        marginBottom: 30,
        marginTop: 10,
        backgroundColor: '#fff',
        justifyContent: 'center',
        borderRadius: 10,
        alignItems: 'center',
    },
    txtClick: {
        fontSize: 15,
        fontWeight: '600',
        color: "#2E64FE",
        paddingVertical: 10
    },
    txtHuy: {
        fontSize: 15,
        fontWeight: '600',
        color: "red",
        paddingVertical: 10
    },
    containerButton: {
        flexDirection: 'row',
        marginBottom: 10,
        borderRadius: 10,
    },
})