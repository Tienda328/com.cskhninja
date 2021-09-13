
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    ScrollView,
    StyleSheet
} from 'react-native';
import NaviHerderFull from '../components/naviHerderFull';
import TextInputKey from '../components/TextIputKey';
import TextInputModal from '../components/textInputModal';

class AddKeyStep2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            note: '',
            noidung: '',
            motorCode: '',
            disCount: '',
            price: ''
        };
    }

    onChangeTextNote = (text) => {
        this.setState({
            note: text,
        });
    };
    onChangeTextNoiDung = (text) => {
        this.setState({
            noidung: text,
        });
    };
    onChangeTextMotorCode = (text) => {
        this.setState({
            motorCode: text,
        });
    };
    onChangeTextCustomerCode = (text) => {
        this.setState({
            CustomerCode: text,
        });
    };
    onChangeTextPrice = (text) => {
        this.setState({
            price: text,
        });
    };
    onChangeTextDiscount = (text) => {
        this.setState({
            disCount: text,
        });
    };
    goBack = () => {
        this.props.navigation.goBack()
    };
    render() {
        const { note, noidung, motorCode, price, disCount } = this.state
        return (
            <View style={styles.containerAll}>
                <NaviHerderFull title={'Thêm Key'} buttonLeft={true} onPressBack={this.goBack} />
                <ScrollView style={styles.containerAll}>
                    <Image
                        style={{ width: '100%', height: '100%', position: 'absolute' }}
                        source={require('../resource/image/background-login.png')}
                    />
                    <View style={styles.bottomKey} />
                    <TextInputKey
                        onChangeText={(text) => this.onChangeTextMotorCode(text)}
                        placeholder="Mã máy có thể bỏ trống"
                        nameText={'Mã máy'}
                        value={motorCode}
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
                        placeholder="0"
                        nameText={'Khuyến mãi'}
                        value={disCount}
                    />
                    <TextInputModal
                        nameTitle={'Thanh toán'}
                        isError={true}
                        placeholder={'Tài khoản thanh toán'} />
                    <TextInputKey
                        onChangeText={(text) => this.onChangeTextNoiDung(text)}
                        placeholder="Ghi rõ nội dung chuyển khoản"
                        nameText={'Nội dung chuyển khoản'}
                        value={noidung}
                    />

                    <TextInputKey
                        onChangeText={(text) => this.onChangeTextNote(text)}
                        placeholder="Ghi chú"
                        nameText={'Ghi chú'}
                        value={note}
                    />
                    <View style={styles.containerButton}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            // onPress={() => this.props.navigation.navigate('AddKeyStep2Screen')}
                            style={styles.btnHuy}>
                            <Text style={styles.txtClick}>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            // onPress={() => this.props.navigation.navigate('AddKeyStep2Screen')}
                            style={styles.btnContinue}>
                            <Text style={styles.txtClick}>Lưu</Text>
                        </TouchableOpacity>
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
    bottomKey: {
        height: 20
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
        marginBottom: 20,
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
});

export default AddKeyStep2;

