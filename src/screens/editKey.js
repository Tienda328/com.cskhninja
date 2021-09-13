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
export default class DetailKey extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            noteAdmin: '',
            conputerCode:'',
            price:'',
            note:'',
            isDiscount:'',
            noiDung:'',

        };
    }

    goBack = () => {
        this.props.navigation.goBack()
    };

    onChangeTextDiscount = (text) => {
        this.setState({
            isDiscount: text,
        });
    };

    onChangeTextConputerCode = (text) => {
        this.setState({
            conputerCode: text,
        });
    };
    onChangeTextPrice = (text) => {
        this.setState({
            price: text,
        });
    };

    onChangeTextNoiDung = (text) => {
        this.setState({
            noiDung: text,
        });
    };
    onChangeTextNode = (text) => {
        this.setState({
            note: text,
        });
    };
    onChangeTextNodeAdmin = (text) => {
        this.setState({
            noteAdmin: text,
        });
    };
    render() {
        const { conputerCode, price, note, isDiscount, noteAdmin, noiDung} = this.state;

        return (
            <View
                style={styles.containerAll}>
                <NaviHerderFull title={'SỬA KEY'} buttonLeft={true} onPressBack={this.goBack} />
                <ScrollView>
                    <Image
                        style={{ width: '100%', height: '100%', position: 'absolute' }}
                        source={require('../resource/image/background-login.png')}
                    />
                    <View style={styles.bottomKey} />
                    <TextInputModal
                        nameTitle={'Loại bản quyền'}
                        isError={true}
                        placeholder={'Chọn loại bản quyền'} />
                    <TextInputModal
                        nameTitle={'Phần mềm'}
                        isError={true}
                        placeholder={'Phần mềm'} />
                    <TextInputModal
                        nameTitle={'Gói bản quyền'}
                        isError={true}
                        placeholder={'Gói bản quyền'} />

                    <TextInputKey
                        onChangeText={(text) => this.onChangeTextConputerCode(text)}
                        placeholder="Nhập Mã máy"
                        nameText={'Mã máy'}
                        value={conputerCode}
                        isError={true}
                        statusError={'sai  roi'}
                    />
                    <TextInputKey
                        onChangeText={(text) => this.onChangeTextPrice(text)}
                        placeholder="0"
                        nameText={'Giá'}
                        value={price}
                    />
                    <TextInputKey
                        onChangeText={(text) => this.onChangeTextDiscount(text)}
                        placeholder="0000"
                        nameText={'Khuyến mãi'}
                        value={isDiscount}
                    />
                    <TextInputModal
                        nameTitle={'Thanh toán'}
                        isError={true}
                        placeholder={'Tài khoản thanh toán'} />
                    <TextInputKey
                        onChangeText={(text) => this.onChangeTextNoiDung(text)}
                        placeholder="TEST NHÂN VIÊN"
                        nameText={'Nội dung chuyển khoản'}
                        value={noiDung}
                    />
                    <TextInputKey
                        onChangeText={(text) => this.onChangeTextNode(text)}
                        placeholder="Ghi chú"
                        nameText={'Ghi chú'}
                        value={note}
                    />
                    <TextInputKey
                        onChangeText={(text) => this.onChangeTextNodeAdmin(text)}
                        placeholder="Advance"
                        nameText={'Ghi chú nâng cao dành cho Admin'}
                        value={noteAdmin}
                    />
                    <View style={styles.containerButton}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.btnHuy}>
                            <Text style={styles.txtClick}>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.btnContinue}>
                            <Text style={styles.txtClick}>Lưu</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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
    btnContinue: {
        flex: 1,
        marginLeft: 10,
        backgroundColor: '#2E64FE',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    txtClick: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        paddingVertical: 10
    },
    containerButton: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginBottom: 30
    },
    btnHuy: {
        flex: 1,
        backgroundColor: '#FF0000',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginRight: 10
    },
})