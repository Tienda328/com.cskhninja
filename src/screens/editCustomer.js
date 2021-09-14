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
            surname: '',
            email: '',
            phoneNumber: '',
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

        return (
            <View
                style={styles.containerAll}>
                <NaviHerderFull title={'SỬA TÀI KHOẢN'} buttonLeft={true} onPressBack={this.goBack} />
                <View style={styles.containerAll} >
                    <Image
                        style={{ width: '100%', height: '100%', position: 'absolute' }}
                        source={require('../resource/image/background-login.png')}
                    />
                    <View style={styles.bottomKey} />
                    <TextInputKey
                        onChangeText={(text) => this.onChangeTextSuerName(text)}
                        placeholder="Họ tên"
                        nameText={'Trần văn hòa'}
                        value={surname}
                        isError={true}
                        statusError={'sai  roi'}
                    />
                    <TextInputKey
                        onChangeText={(text) => this.onChangeTextEmail(text)}
                        placeholder="hoatv@ninjateam.vn"
                        nameText={'Email'}
                        value={email}
                    />
                    <TextInputKey
                        onChangeText={(text) => this.onChangeTextPhoneNumber(text)}
                        placeholder="025447125"
                        nameText={'Số điện thoại'}
                        value={phoneNumber}
                    />
                    <TextInputKey
                        onChangeText={(text) => this.onChangeTextPassWork(text)}
                        placeholder="Nhập mật khẩu"
                        nameText={'Mật khẩu'}
                        value={passwork}
                    />
                    <TextInputModal
                        nameTitle={'Trạng thái'}
                        isError={true}
                        placeholder={'active'} />

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