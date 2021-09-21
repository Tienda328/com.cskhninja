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
 
class DetailProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            surName: '',
            email: '',
            phoneNumber: '',
            editable: false,
            stateSurName: null,
            stateEmail: null,
            statePhoneNumber: null,
            statePassword: null,
            txtEdit:'Sửa'
        };
    }

    async componentDidMount() {
        const user_name = await getLocale(LOCALE_KEY.user_name);
        const email = await getLocale(LOCALE_KEY.email);
        const phone_number = await getLocale(LOCALE_KEY.phone_number);
        this.setState({
          email: email,
          surName: user_name,
          phoneNumber:phone_number
        })
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

    addCustomer =  () => {
        const{editable, txtEdit}=this.state
        this.setState({
            editable:true,
            txtEdit:'Lưu'
        });
        if(editable===true&&txtEdit==='Lưu'){
            console.log('dongs')
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
    render() {
        const { surName, editable, email, phoneNumber,
            stateSurName, stateEmail, statePhoneNumber, txtEdit } = this.state
        return (
            <View style={styles.containerALL}>
                <NaviHerderFull title={'THÔNG TIN CÁ NHÂN'} buttonLeft={true} onPressBack={this.goBack} />
               
                <View style={styles.container}>
                <View style={styles.bottomKey} />
                    <TextInputKey
                        onChangeText={(text) => this.onChangeTextSurName(text)}
                        placeholder="Nhập họ tên"
                        nameText={'Họ tên'}
                        editable={editable}
                        value={surName}
                        isError={true}
                        statusError={stateSurName}
                    />
                    <TextInputKey
                        onChangeText={(text) => this.onChangeTextEmail(text)}
                        placeholder="Email"
                        nameText={'Nhập Email'}
                        value={email}
                        isError={true}
                        editable={editable}
                        statusError={stateEmail}
                    />
                    <TextInputKey
                        onChangeText={(text) => this.onChangeTextPhoneNumber(text)}
                        placeholder="Số điện thoại"
                        nameText={'Nhập số điện thoại'}
                        value={phoneNumber}
                        isError={true}
                        editable={editable}
                        statusError={statePhoneNumber}
                    />
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
                            <Text style={styles.txtClick}>{txtEdit}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        );
    }

}


export default DetailProfile;
const styles = StyleSheet.create({
    containerALL: {
        flex: 1,
        backgroundColor: "#D8D8D8"
    },
    containerViewButton: {
        flex: 1,
        backgroundColor: "#fff"
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginVertical: 20,
        borderRadius: 10,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowRadius: 6,
        shadowOpacity: 0.16,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        elevation: 3,
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