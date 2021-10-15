
import React from 'react';
import {
    View,
    Text,
    Alert,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Platform,
    StyleSheet,
} from 'react-native';
import NaviHerderFull from '../components/naviHerderFull';
import TextInputKey from '../components/TextIputKey';
import TextInputModal from '../components/textInputModal';
import ItemDisable from '../components/itemDisable';
import LOCALE_KEY, {
    getLocale,
} from '../repositories/local/appLocale';
import ItemComponentTitle from '../components/itemComponentTitle';
import Guest from '../api/guest';
import common from '../utils/common';
import NumberFormat from 'react-number-format';
import { stringMd5 } from 'react-native-quick-md5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const windowHeight = Dimensions.get('window').height;

const DataType = [
    {
        id: '111',
        type: '1',
        name: 'Phần mềm',
    },
    {
        id: '112',
        type: '2',
        name: 'Dịch vụ',
    },
]
class AddKey extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            type: null,
            isNoData: true,
            txtDiscount: '0',
            disablePhanMem: true,
            disableTypeBQ: true,
            CustomerCode: '0',
            CustomerName: 'Tên khách hàng',
            dataBQ: [],
            dataTypyBQ: [],
            dataPay: [],
            valuePay: '',
            phoneNumber: 'Số điện thoại',
            typeBQ: 'Chọn loại bản quyền',
            phanmem: 'Chọn phần mềm',
            note: '',
            isErrorState: false,
            messagebill: '',
            productid: null,
            motorCode: '',
            hid: null,
            disCount: '',
            goiBQ: 'Gói bản quyền',
            price: '0',
            planid: null,
            stateEmail: '',
            stateError: '',
            paymentid: null,
            isCustomerCode: false
        };
    }

    btnContinue = async () => {
        const { productid, txtDiscount, typeBQ, planid, CustomerCode, phanmem, motorCode, note, price, paymentid, messagebill, type } = this.state;
        this.setState({
            isErrorState: true,
        })
        if (CustomerCode !== '0' &&
            typeBQ !== 'Chọn loại bản quyền' &&
            phanmem !== 'Chọn phần mềm' &&
            messagebill !== ''
        ) {
            const pass_word = await getLocale(LOCALE_KEY.pass_word);
            const email = await getLocale(LOCALE_KEY.email);
            const md5 = stringMd5(pass_word);
            const timeStamp = common.timeStamp();
            const token = common.createToken(timeStamp)

            const objPost = {
                email: email,
                password: md5,
                function: "createkey",
                time: timeStamp,
                token: token,
                variable: `{'productid':'${productid}','planid':'${planid}'
                ,'customerid':'${CustomerCode}','hid':'${motorCode}'
                ,'discount':'${txtDiscount}','note':'${note}','paymentid':'${productid}'
                ,'messagebill':'${messagebill}','type':'${type}'}`
            };
            try {
                await Guest.createkey(objPost, 'message');
                this.setState({
                    isCustomerCode: false
                })
                this.clearnState
                this.props.navigation.navigate('CopyrightManagement')

            } catch (e) {
                console.log(e);
            }

        }
    }

    clearnState = () => {
        this.setState({
            email: '',
            type: null,
            isNoData: true,
            txtDiscount: '0',
            disablePhanMem: true,
            disableTypeBQ: true,
            CustomerCode: '0',
            CustomerName: 'Tên khách hàng',
            dataBQ: [],
            dataTypyBQ: [],
            dataPay: [],
            valuePay: '',
            phoneNumber: 'Số điện thoại',
            typeBQ: 'Chọn loại bản quyền',
            phanmem: 'Chọn phần mềm',
            note: '',
            isErrorState: false,
            messagebill: '',
            productid: null,
            motorCode: '',
            hid: null,
            disCount: '',
            goiBQ: 'Gói bản quyền',
            price: '0',
            planid: null,
            stateEmail: '',
            stateError: '',
            paymentid: null,
            isCustomerCode: false
        })
    }

    clickItemType = async item => {
        if (item.name === 'Phần mềm') {
            await this.setState({
                typeBQ: item.name,
                type: 1,
                price: 0,
                disablePhanMem: false,
                disableTypeBQ: true,
                goiBQ: 'Gói bản quyền',
                phanmem: 'Chọn phần mềm',
            })
        } else {
            await this.setState({
                typeBQ: item.name,
                type: 2,
                price: 0,
                disableTypeBQ: true,
                disablePhanMem: false,
                goiBQ: 'Gói bản quyền',
                phanmem: 'Chọn phần mềm',
            })
        }
        await this.clickType();
    };
    clickType = async () => {
        const { type } = this.state;
        const pass_word = await getLocale(LOCALE_KEY.pass_word);
        const email = await getLocale(LOCALE_KEY.email);
        const md5 = stringMd5(pass_word);
        const timeStamp = common.timeStamp();
        const token = common.createToken(timeStamp)
        const objPost = {
            email: email,
            password: md5,
            function: "loadproduct",
            time: timeStamp,
            token: token,
            variable: `{'type':'${type}'}`
        };
        try {
            const response = await Guest.loadproduct(objPost);
            const data = JSON.parse(response.data)
            this.setState({
                dataBQ: data
            })

        } catch (e) {
            console.log(e);
        }
    };

    clickItemPhanMem = async item => {
        this.setState({
            phanmem: item.name,
            hid: item.title,
            disableTypeBQ: false,
        })
        await this.clickTypeBQ(item);
    };

    clickItemGoiBQ = item => {
        this.setState({
            goiBQ: item.name,
            planid: item.id,
            price: item.price
        })
    };

    clickTypeBQ = async (item) => {
        const { type } = this.state;
        const pass_word = await getLocale(LOCALE_KEY.pass_word);
        const email = await getLocale(LOCALE_KEY.email);
        const md5 = stringMd5(pass_word);
        // const timeStamp = common.timeStamp();
        const timeStamp = '1';
        const token = common.createToken(timeStamp)
        const objPost = {
            email: email,
            password: md5,
            function: "loadplan",
            time: timeStamp,
            token: token,
            variable: `{'productid':'${item.id}','type':'${type}'}`
        };
        try {
            const response = await Guest.loadplan(objPost);
            const data = JSON.parse(response.data)
            if (response.data === '[]') {
                this.setState({
                    isNoData: false,
                    productid: item.id
                })
            } else {
                this.setState({
                    dataTypyBQ: data,
                    isNoData: true,
                    productid: item.id
                })
            }
        } catch (e) {
            console.log(e);
        }
    };

    async componentDidMount() {
        const pass_word = await getLocale(LOCALE_KEY.pass_word);
        const email = await getLocale(LOCALE_KEY.email);
        const md5 = stringMd5(pass_word);
        const timeStamp = '1';
        const token = common.createToken(timeStamp)
        const objPost = {
            email: email,
            password: md5,
            function: "loadpayment",
            time: timeStamp,
            token: token,
        };
        try {
            const response = await Guest.loadpayment(objPost);
            const data = JSON.parse(response.data)
            this.setState({
                dataPay: data,
                valuePay: data[0].name,
                paymentid: data[0].id,
            })
        } catch (e) {
            console.log(e);
        }
    }
    clickItemPay = item => {
        this.setState({
            valuePay: item.name,
            paymentid: item.id,
        })
    };

    onChangeTextNote = (text) => {
        this.setState({
            note: text,
        });
    };
    onChangeTextMessagebill = (text) => {
        this.setState({
            messagebill: text,
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
    clickTes =()=> {
        // this.getData()
      }
    clickAddCustomer = () => {
        const callBack =this.clickTes.bind(this)
        this.props.navigation.navigate('AddCustomerScreen',{callBack})
      }
    onChangeTextDiscount = (text) => {
        this.setState({
            disCount: text,
        });
    };
    validateEmail = () => {
        const { email } = this.state;
        if (email.length > 0) {
            if (!/[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,64}/.test(email)) {
                this.setState({ stateEmail: 'Email không đúng định dạng' });
                return false;
            } else {
                this.setState({ stateEmail: '' });
                return true;
            }
        } else {
            this.setState({ stateEmail: 'Email không được để trống' });
            return false;
        }
    }

    clickSearch = async () => {
        this.validateEmail()
        if (this.validateEmail() === true) {
            const pass_word = await getLocale(LOCALE_KEY.pass_word);
            const email = await getLocale(LOCALE_KEY.email);
            const md5 = stringMd5(pass_word);
            const timeStamp = common.timeStamp();
            const token = common.createToken(timeStamp);
            let itemInfo = null;

            const objPost = {
                email: email,
                password: md5,
                function: "seachcustomer",
                time: timeStamp,
                token: token,
                variable: `{'email':'${this.state.email}'}`
            };
            try {
                const response = await Guest.seachcustomer(objPost);
                if (response.status === true) {
                    itemInfo = response.data
                    const makh = JSON.parse(itemInfo).id
                    const nameKh = JSON.parse(itemInfo).name
                    const phoneKh = JSON.parse(itemInfo).phone

                    this.setState({
                        CustomerCode: makh,
                        CustomerName: nameKh,
                        phoneNumber: phoneKh
                    })
                } else if (response.status === false) {
                    Alert.alert(
                        "Thông báo",
                        response.message,
                        [
                            { text: "OK", onPress: () => { } }
                        ]
                    );
                }

            } catch (e) {
                console.log(e);
            }
        }

    };

    onChangeTextEmail = (text) => {
        this.setState({
            email: text,
        });
    };
    render() {
        const { email, CustomerCode, note, messagebill, motorCode, price, disCount,
            typeBQ, phanmem, dataBQ, disablePhanMem, disableTypeBQ, dataTypyBQ, type,
            goiBQ, isNoData, dataPay, valuePay, stateEmail, isErrorState, isCustomerCode,
            phoneNumber, CustomerName } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <NaviHerderFull title={'THÊM KEY'}
                    buttonRight={true} nameIcon={'check-bold'}
                    onPressRight={this.btnContinue}
                    textRight={'Lưu'} />
                <ScrollView>
                    <View style={[styles.containerAll]}>
                        <ItemComponentTitle
                            nameTitle={'Thông tin khách hàng'}
                            drawIconLeft={
                                <View>
                                    <View style={styles.containerSearch}>
                                        <View style={{ flex: 1 }}>
                                            <TextInputKey
                                                onChangeText={(text) => this.onChangeTextEmail(text)}
                                                placeholder="Nhập Email khách hàng"
                                                nameIcon={'email'}
                                                value={email}
                                                isError={true}
                                                editable={true}
                                                statusError={stateEmail}
                                            />
                                        </View>
                                        <TouchableOpacity style={styles.bntSearch}
                                            onPress={this.clickSearch}
                                        >
                                            <MaterialCommunityIcons name={'magnify'} size={23} style={{ color: 'gray' }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.bntSearch}
                                            onPress={this.clickAddCustomer}
                                        >
                                            <MaterialCommunityIcons name={'account-plus'} size={25} style={{ color: '#0000FF', marginRight:10 }} />
                                        </TouchableOpacity>
                                    </View>
                                    <ItemDisable nameText={'Mã khách hàng'}
                                        nameIcon={'code-equal'}
                                        statusError={CustomerCode === '0' && isErrorState === true ? 'Phần mềm không được để trống' : ''}
                                        isError={isErrorState}
                                        value={CustomerCode} />
                                    <ItemDisable nameText={'Tên khách hàng'} value={CustomerName} nameIcon={'rename-box'} />
                                    <ItemDisable nameText={'Số điện thoại'} value={phoneNumber} nameIcon={'cellphone'} styleWith={{ borderBottomColor: '#fff' }} />
                                </View>
                            } />
                        <ItemComponentTitle
                            nameTitle={'Thông tin phần mềm'}
                            drawIconLeft={
                                <View>
                                    <TextInputModal
                                        dataModal={DataType}
                                        nameIcon={'call-merge'}
                                        isError={isErrorState}
                                        valueItem={typeBQ}
                                        noData
                                        click={this.clickItemType}
                                        statusError={typeBQ === 'Chọn loại bản quyền' && isErrorState === true ? 'Phần mềm không được để trống' : ''}
                                        namePlaceholder={typeBQ} />
                                    <TextInputModal
                                        nameIcon={'blender-software'}
                                        isError={isErrorState}
                                        valueItem={phanmem}
                                        statusError={phanmem === 'Chọn phần mềm' && isErrorState === true ? 'Phần mềm không được để trống' : ''}
                                        noData
                                        disabled={disablePhanMem}
                                        dataModal={dataBQ}
                                        placeholder={'Phần mềm'}
                                        click={this.clickItemPhanMem}
                                        namePlaceholder={phanmem}
                                    />
                                    <TextInputModal
                                        nameIcon={'gift'}
                                        valueItem={goiBQ}
                                        disabled={disableTypeBQ}
                                        dataModal={dataTypyBQ}
                                        noData={isNoData}
                                        click={this.clickItemGoiBQ}
                                        namePlaceholder={goiBQ} />
                                    {type === 1 ? <TextInputKey
                                        onChangeText={(text) => this.onChangeTextMotorCode(text)}
                                        placeholder="Mã máy"
                                        nameIcon={'qrcode'}
                                        isError={isErrorState}
                                        statusError={motorCode === '' && isErrorState === true ? 'Mã máy Không được để trống' : ''}
                                        value={motorCode}
                                        editable={true}
                                    /> : null}
                                    <ItemDisable nameIcon={'currency-usd'} value={common.formatNumber(price)} />
                                    <NumberFormat
                                        value={disCount}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        renderText={(value) => (
                                            <View>
                                                <View style={[styles.containerInput]}>
                                                    <MaterialCommunityIcons name={'sale'} size={20} style={{ color: 'gray', marginLeft: 20 }} />
                                                    <TextInput
                                                        style={[
                                                            styles.txtInput,

                                                            { paddingHorizontal: 0 },
                                                            Platform.OS === 'ios'
                                                                ? { marginBottom: 10, height: 24 }
                                                                : { height: 40 },
                                                        ]}
                                                        underlineColorAndroid="transparent"
                                                        onChangeText={(valueMount) => {
                                                            if (/^0/.test(valueMount)) {
                                                                valueMount = valueMount.replace(/^0/, '');
                                                            }
                                                            this.setState({
                                                                disCount: valueMount.replace(/,/g, ''),
                                                                txtDiscount: valueMount
                                                            });
                                                        }}
                                                        placeholder="Nhập số tiền khiến mãi"
                                                        placeholderTextColor="gray"
                                                        value={value}
                                                        keyboardType="numeric"
                                                    />
                                                </View>
                                            </View>
                                        )}
                                    />
                                    <TextInputModal
                                        nameIcon={'bank'}
                                        valueItem={valuePay}
                                        // disabled={disableTypeBQ}
                                        dataModal={dataPay}
                                        noData
                                        click={this.clickItemPay}
                                        namePlaceholder={valuePay} />
                                </View>
                            } />
                        <View style={styles.containerView}>

                            <TextInputKey
                                onChangeText={(text) => this.onChangeTextMessagebill(text)}
                                placeholder="Ghi rõ nội dung chuyển khoản"
                                nameIcon={'content-save'}
                                editable={true}
                                isError={isErrorState}
                                statusError={messagebill === '' && isErrorState === true ? 'Nội dung chuyển khoản Không được để trống' : ''}
                                value={messagebill}
                            />
                        </View>
                        <TextInputKey
                            onChangeText={(text) => this.onChangeTextNote(text)}
                            placeholder="Ghi chú"
                            styleInput={{ borderBottomColor: '#fff' }}
                            nameIcon={'calendar-text'}
                            editable={true}
                            value={note}

                        />
                        <View style={styles.bottomKey} />

                    </View>

                </ScrollView>
            </View>
        )
    }

};

const styles = StyleSheet.create({
    containerAll: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
    containerInput: {
        flexDirection: 'row',
        height: windowHeight / 17.8,
        alignItems: 'center',
        // backgroundColor: "#fff",
    },
    container: {
    },
    containerView: {
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    txtInput: {
        width: '100%',
        marginLeft: 20,
        borderBottomColor: '#D8D8D8',
        borderBottomWidth: 0.5,
        marginBottom: 2,
    },
    containerSearch: {
        flexDirection: 'row',
    },
    bntSearch: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    btnContinue: {
        marginVertical: 10,
        backgroundColor: '#D8D8D8'
    },
    bottomKey: {
        height: 20
    },
});

export default AddKey;

