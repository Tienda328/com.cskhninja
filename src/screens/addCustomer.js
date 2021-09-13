import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import NaviHerderFull from '../components/naviHerderFull';
import TextInputKey from '../components/TextIputKey';
import TextInputModal from '../components/textInputModal';

export default class AddCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            surName: '',
            email: '',
            phoneNumber: '',
            passWord: '',
        };
    }


    goBack = () => {
        this.props.navigation.goBack()
    };
    render() {
        const { surName, passWord, email, phoneNumber } = this.state
        return (
            <View style={styles.containerALL}>
                <NaviHerderFull title={'THÊM KHÁCH HÀNG'} buttonLeft={true} onPressBack={this.goBack} />
                <View style={styles.bottomKey} />
                <TextInputKey
                    onChangeText={(text) => this.onChangeTextEmail(text)}
                    placeholder="Nhập họ tên"
                    nameText={'Họ tên'}
                    value={surName}
                    isError={true}
                    statusError={'sai  roi'}
                />
                <TextInputKey
                    onChangeText={(text) => this.onChangeTextCustomerCode(text)}
                    placeholder="Email"
                    nameText={'Nhập Email'}
                    value={email}
                />
                <TextInputKey
                    onChangeText={(text) => this.onChangeTextCustomerName(text)}
                    placeholder="Số điện thoại"
                    nameText={'Nhập số điện thoại'}
                    value={phoneNumber}
                />
                <TextInputKey
                    onChangeText={(text) => this.onChangeTextPhoneNumber(text)}
                    placeholder="Mật khẩu"
                    nameText={'Mật khẩu'}
                    value={passWord}
                />
                <TextInputModal
                    nameTitle={'Trạng thái'}
                    isError={true}
                    placeholder={'Chọn loại trạng thái'} />
                <View style={styles.containerButton}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => this.props.navigation.navigate('AddKeyStep2Screen')}
                        style={styles.btnHuy}>
                        <Text style={styles.txtClick}>Hủy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => this.props.navigation.navigate('AddKeyStep2Screen')}
                        style={styles.btnContinue}>
                        <Text style={styles.txtClick}>Lưu</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }

}

const styles = StyleSheet.create({
    containerALL: {
        flex: 1
    },
    bottomKey: {
        height: 20
    },
    btnHuy: {
        flex: 1,
        backgroundColor: '#FF0000',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginRight:10
    },
    btnContinue: {
        flex: 1,
        marginLeft:10,
        backgroundColor: '#2E64FE',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    containerButton: {
        flexDirection: 'row',
        marginHorizontal:20,
        marginBottom:30
    },
    txtClick: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        paddingVertical: 10
    },
})