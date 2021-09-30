
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
import ItemDisable from '../components/itemDisable';
import LOCALE_KEY, {
    getLocale,
} from '../repositories/local/appLocale';
import Guest from '../api/guest';
import common from '../utils/common';
import { stringMd5 } from 'react-native-quick-md5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
            type: 1,
            isNoData: true,
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
            disCount: '0',
            goiBQ: 'Gói bản quyền',
            price: '0',
            planid: null,
            stateEmail: '',
            stateError: '',
            paymentid: null,
        };
    }

    btnContinue = async() => {
        const { productid,typeBQ, planid, CustomerCode,phanmem, hid, discount, note, paymentid, messagebill, type } = this.state;
        this.setState({
            isErrorState: true
        })
        if(CustomerCode !== '0'&&
            typeBQ !== 'Chọn loại bản quyền'&&
            phanmem !== 'Chọn phần mềm'&&
            messagebill !== '' &&
            note !== '' 
        ){
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
                variable:`{'productid':'${productid}','planid':'${planid}'
                ,'customerid':'${CustomerCode}','hid':'${hid}'
                ,'discount':'${discount}','note':'${note}','paymentid':'${productid}'
                ,'messagebill':'${messagebill}','type':'${type}'}`
            };
            try {
                 await Guest.createkey(objPost);
    
            } catch (e) {
                console.log(e);
            }
            this.clearnState
        }
    }

    clearnState= ()=>{
        this.setState({
            email: '',
            type: 1,
            isNoData: true,
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
            disCount: '0',
            goiBQ: 'Gói bản quyền',
            price: '0',
            planid: null,
            stateEmail: '',
            stateError: '',
            paymentid: null,
        })
    }

    clickItemType = async item => {
        if (item.name === 'Phần mềm') {
            this.setState({
                typeBQ: item.name,
                type: 1,
                price: 0,
                disablePhanMem: false,
                disableTypeBQ: true,
                goiBQ: 'Gói bản quyền',
                phanmem: 'Chọn phần mềm',
            })
        } else {
            this.setState({
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
            console.log('dsata',response.data )
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
                this.setState({ stateEmail: null });
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
                time: `1`,
                token: 'd1ff52a77a2965156cb8e7e67d4ac931',
                variable: `{'email':'${this.state.email}'}`
            };
            try {
                const response = await Guest.seachcustomer(objPost,'message');
                itemInfo = response.data
                const makh = JSON.parse(itemInfo).id
                const nameKh = JSON.parse(itemInfo).name
                const phoneKh = JSON.parse(itemInfo).phone

                this.setState({
                    CustomerCode: makh,
                    CustomerName: nameKh,
                    phoneNumber: phoneKh
                })
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
            typeBQ, phanmem, dataBQ, disablePhanMem, disableTypeBQ, dataTypyBQ,
            goiBQ, isNoData, dataPay, valuePay, stateEmail, isErrorState,
            phoneNumber, CustomerName } = this.state;

        return (
            <View>
                <NaviHerderFull title={'THÊM KEY'}
                    buttonRight={true} nameIcon={'check-bold'}
                    onPressRight={this.btnContinue}
                    textRight={'Lưu'} />
                <ScrollView>
                    <View style={[styles.containerAll]}>
                        <View style={[styles.container]}>
                            <View style={styles.bottomKey} />
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
                                    <MaterialCommunityIcons name={'magnify'} size={23} style={{ color: '#fff' }} />
                                </TouchableOpacity>
                            </View>
                            <ItemDisable nameText={'Mã khách hàng'}
                            nameIcon={'barcode'}
                                statusError={CustomerCode === '0' && isErrorState === true ? 'Phần mềm không được để trống' : ''}
                                isError={true}
                                value={CustomerCode} />
                            <ItemDisable nameText={'Tên khách hàng'} value={CustomerName}    nameIcon={'rename-box'}/>
                            <ItemDisable nameText={'Số điện thoại'} value={phoneNumber} nameIcon={'cellphone'} />
                            <TextInputModal
                                dataModal={DataType}
                                nameIcon={'call-merge'}
                                isError={true}
                                valueItem={typeBQ}
                                noData
                                click={this.clickItemType}
                                statusError={typeBQ === 'Chọn loại bản quyền' && isErrorState === true ? 'Phần mềm không được để trống' : ''}
                                namePlaceholder={typeBQ} />
                            <TextInputModal
                                nameIcon={'blender-software'}
                                isError={true}
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
                            <TextInputKey
                                onChangeText={(text) => this.onChangeTextMotorCode(text)}
                                placeholder="Mã máy có thể bỏ trống"
                                nameIcon={'qrcode'}
                                value={motorCode}
                                editable={true}
                            />
                            <ItemDisable nameIcon={'currency-usd'} value={price} />
                            <TextInputKey
                                onChangeText={(text) => this.onChangeTextDiscount(text)}
                                nameIcon={'sale'}
                                nameIcon={'currency-usd'}
                                value={disCount}
                                editable={true}
                            />
                            <TextInputModal
                                nameIcon={'bank'}
                                valueItem={valuePay}
                                // disabled={disableTypeBQ}
                                dataModal={dataPay}
                                noData
                                click={this.clickItemPay}
                                namePlaceholder={valuePay} />
                            <TextInputKey
                                nameTitle={'Gói bản quyền'}
                                onChangeText={(text) => this.onChangeTextMessagebill(text)}
                                placeholder="Ghi rõ nội dung chuyển khoản"
                                nameIcon={'content-save'}
                                editable={true}
                                 isError={true}
                                statusError={messagebill === '' && isErrorState === true ? 'Nội dung chuyển khoản Không được để trống' : ''}
                                value={messagebill}
                            />
                            <TextInputKey
                                onChangeText={(text) => this.onChangeTextNote(text)}
                                placeholder="Ghi chú"
                                isError={true}
                                nameIcon={'calendar-text'}
                                editable={true}
                                value={note}
                                statusError={note === '' && isErrorState === true ? 'Ghi chú không được để trống' : ''}
                            />
                             <View style={styles.bottomKey}/>
                        </View>
                      
                    </View>
                   
                </ScrollView>
            </View>
        )
    }

};

const styles = StyleSheet.create({
    containerAll: {
        flex: 1,
        backgroundColor: '#D8D8D8',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    containerSearch: {
        flexDirection: 'row',
    },
    bntSearch: {
        width: 40,
        height: 40,
        marginRight: 20,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2E2EFE'
    },
    txtDangNhap: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        paddingVertical: 10
    },
    btnContinue: {
        marginVertical: 10,
        backgroundColor:'#D8D8D8'
    },

    viewBottom: {
        height: 30
    },

    bottomKey: {
        height: 20
    },
});

export default AddKey;

