import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert
} from 'react-native';
import NaviHerderFull from '../components/naviHerderFull';
import TextInputKey from '../components/TextIputKey';
import LOCALE_KEY, {
    getLocale,
} from '../repositories/local/appLocale';
import Guest from '../api/guest';
import common from '../utils/common';
import { stringMd5 } from 'react-native-quick-md5';

export default class AddCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            surName: '',
            email: '',
            phoneNumber: '',
            passWord: '',
            stateSurName: null,
            stateEmail: null,
            statePhoneNumber: null,
            statePassword: null,
        };
    }

    validate = () => {
        this.validateUserName();
        this.validateEmail();
        this.validatePhoneNumber();
        this.validatePassWord();
        if (this.validateUserName() === false ||
            this.validatePhoneNumber() === false ||
            this.validatePassWord() === false ||
            this.validateEmail() === false) {
            return false;
        }
        return true;
    };
    validateEmail = () => {
        const { email } = this.state;
        if (email.length > 0) {
            if (!/[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,64}/.test(email)) {
                this.setState({ stateEmail: 'Email không đúng định dạng' });
                return false;
            } else {
                this.setState({ stateEmail: null });
                return true;
            }
        } else {
            this.setState({ stateEmail: 'Email không được để trống' });
            return false;
        }
    }
    validatePhoneNumber = () => {
        const { phoneNumber } = this.state;
        if (phoneNumber === '') {
            this.setState({
                statePhoneNumber: 'Số điện thoại không được để trống',
            });
            return false;
        } else if (!/^[0-9]+$/.test(phoneNumber)) {
            this.setState({
                statePhoneNumber: 'Số điện thoại không đúng định dạng',
            });
            return false;
        } else if (phoneNumber.length < 10) {
            this.setState({
                statePhoneNumber: 'Số điện thoại không được ít hơn 10 số',
            });
            return false;
        } else {
            this.setState({
                statePhoneNumber: null,
            });
            return true;
        }
    }

    validatePassWord = () => {
        const { passWord } = this.state;
        if (passWord === '') {
            this.setState({ statePassword: 'Mật khẩu không được để trống' });
            return false;
        } else if (passWord.length < 6) {
            this.setState({ statePassword: 'Mật khẩu không được ít hơn 6 ký tự' });
            return false;
        } else {
            this.setState({ statePassword: null });
            return true;
        }
    };

    validateUserName = () => {
        const { surName } = this.state;
        if (surName === '') {
            this.setState({
                stateSurName: 'Họ và tên không được để trống',
            });
            return false;
        } else if (surName.length < 5) {
            this.setState({
                stateSurName: 'Họ và tên không được ít hơn 5 ký tự',
            });
            return false;
        } else {
            this.setState({
                stateSurName: null,
            });
            return true;
        }
    }

    addCustomer = async () => {
        if (this.validate() === true) {
            const { email, surName, phoneNumber, passWord } = this.state;
            const pass_word = await getLocale(LOCALE_KEY.pass_word);
            const emailInFo = await getLocale(LOCALE_KEY.email);
            const md5 = stringMd5(pass_word);
            const passCustomer = stringMd5(passWord);
            const timeStamp = common.timeStamp();
            const objPost = {
                email: emailInFo,
                password: md5,
                function: "addcustomer",
                time: `1`,
                token: 'd1ff52a77a2965156cb8e7e67d4ac931',
                variable: `{'email':${email},'name':${surName},'phone':${phoneNumber},'password':${passCustomer}}`
            };
            try {
                const response = await Guest.addcustomer(objPost);
                console.log('response', response)
                if (response.status === true) {
                    Alert.alert(
                        "Thông báo",
                        "Thêm khách hàng thành công",
                        [
                            { text: "OK", onPress: () => this.props.navigation.goBack() }
                        ]
                    );
                } else {
                    Alert.alert(
                        "Thông báo",
                        "Khách hàng đã tồn tại",
                        [
                            { text: "OK", onPress: () => { } }
                        ]
                    );
                }
            } catch (e) {
                console.log(e);
            }
        }
    }
    goBack = () => {
        this.props.navigation.goBack()
    };
    onChangeTextSurName = (text) => {
        this.setState({
            surName: text,
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
    onChangeTextPassWord = (text) => {
        this.setState({
            passWord: text,
        });
    };
    render() {
        const { surName, passWord, email, phoneNumber,
            stateSurName, stateEmail, statePhoneNumber, statePassword } = this.state
        return (
            <View style={styles.containerALL}>
                <NaviHerderFull title={'THÊM KHÁCH HÀNG'} buttonLeft={true} onPressBack={this.goBack} />
               
                <View style={styles.container}>
                <View style={styles.bottomKey} /> 
                    <TextInputKey
                        onChangeText={(text) => this.onChangeTextSurName(text)}
                        placeholder="Nhập họ tên"
                        nameText={'Họ tên'}
                        editable={true}
                        nameIcon={'rename-box'}
                        value={surName}
                        isError={true}
                        statusError={stateSurName}
                    />
                    <TextInputKey
                        onChangeText={(text) => this.onChangeTextEmail(text)}
                        placeholder="Email"
                        nameText={'Nhập Email'}
                        value={email}
                        nameIcon={'email'}
                        isError={true}
                        editable={true}
                        statusError={stateEmail}
                    />
                    <TextInputKey
                        onChangeText={(text) => this.onChangeTextPhoneNumber(text)}
                        placeholder="Số điện thoại"
                        nameText={'Nhập số điện thoại'}
                        value={phoneNumber}
                        nameIcon={'cellphone'}
                        isError={true}
                        editable={true}
                        statusError={statePhoneNumber}
                    />
                    <TextInputKey
                        onChangeText={(text) => this.onChangeTextPassWord(text)}
                        placeholder="Mật khẩu"
                        nameText={'Mật khẩu'}
                        value={passWord}
                        editable={true}
                        nameIcon={'lock'}
                        isError={true}
                        statusError={statePassword}
                    />
                    {/* <TextInputModal
                    nameTitle={'Trạng thái'}
                    isError={true}
                    placeholder={'Chọn loại trạng thái'} /> */}
                    <View style={styles.containerViewButton} />
                    <View style={styles.containerButton}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => this.props.navigation.goBack()}
                            style={styles.btnHuy}>
                            <Text style={styles.txtClick}>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={this.addCustomer}
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
    containerALL: {
        flex: 1,
        backgroundColor: "#fff"
    },
    containerViewButton: {
        flex: 1,
        backgroundColor: "#fff"
    },
    container: {
        flex: 1,
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
        marginRight: 10
    },
    btnContinue: {
        flex: 1,
        marginLeft: 10,
        backgroundColor: '#2E64FE',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    containerButton: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginBottom: 30
    },
    txtClick: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        paddingVertical: 10
    },
})