
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    StyleSheet,
} from 'react-native';
import NaviHerderFull from '../components/naviHerderFull';
import TextInputKey from '../components/TextIputKey';
import TextInputModal from '../components/textInputModal';

class AddKey extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            CustomerCode: '',
            CustomerName: '',
            phoneNumber: '',
            modalVisible: false,
        };
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    onChangeTextEmail = (text) => {
        this.setState({
            email: text,
        });
    };
    onChangeTextCustomerCode = (text) => {
        this.setState({
            CustomerCode: text,
        });
    };
    onChangeTextCustomerName = (text) => {
        this.setState({
            CustomerName: text,
        });
    };
    onChangeTextPhoneNumber = (text) => {
        this.setState({
            phoneNumber: text,
        });
    };
    render() {
        const { email, CustomerCode, phoneNumber, CustomerName, modalVisible } = this.state;
        return (
            <View>
                <NaviHerderFull title={'THÊM KEY'} />
                <ScrollView>
                    <View style={[styles.containerAll]}>

                        <View style={[styles.containerAll]}>
                            <Image
                                style={{ width: '100%', height: '100%', position: 'absolute' }}
                                source={require('../resource/image/background-login.png')}
                            />
                            <View style={styles.bottomKey} />
                            <TextInputKey
                                onChangeText={(text) => this.onChangeTextEmail(text)}
                                placeholder="Nhập Email khách hàng"
                                nameText={'Email khách hàng'}
                                value={email}
                                isError={true}
                                statusError={'sai  roi'}
                            />
                            <TextInputKey
                                onChangeText={(text) => this.onChangeTextCustomerCode(text)}
                                placeholder="0"
                                nameText={'Mã khách hàng'}
                                value={CustomerCode}
                            />
                            <TextInputKey
                                onChangeText={(text) => this.onChangeTextCustomerName(text)}
                                placeholder="Tên khách hàng"
                                nameText={'Tên khách hàng'}
                                value={CustomerName}
                            />
                            <TextInputKey
                                onChangeText={(text) => this.onChangeTextPhoneNumber(text)}
                                placeholder="Số điện thoại"
                                nameText={'Số điện thoại'}
                                value={phoneNumber}
                            />
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

                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => this.props.navigation.navigate('AddKeyStep2Screen')}
                                style={styles.btnContinue}>
                                <Text style={styles.txtDangNhap}>Tiếp tục</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }

};

const styles = StyleSheet.create({
    containerAll: {
        flex: 1
    },
    txtDangNhap: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        paddingVertical: 10
    },
    btnContinue: {
        backgroundColor: '#2E64FE',
        marginVertical: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 30,
        borderRadius: 30,
    },

    viewBottom: {
        height: 30
    },

    bottomKey: {
        height: 20
    },
});

export default AddKey;

