
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Dimensions,
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
class EditKey extends React.Component {
    constructor(props) {
        super(props);
        const { customerid, customername, datecreate, customeremail, customerphone,hid,
            productName, expirationdate, planname, paymentName, messagebill, note, price, discount, type
          } = this.props.route.params.item
          const pricers = price- discount;
          const typeBQClon =type===1?'Phần mềm':'Dịch vụ';
        this.state = {
            type: type,
            isNoData: true,
            disablePhanMem: true,
            disableTypeBQ: true,
            dataBQ: [],
            dataTypyBQ: [],
            dataPay: [],
            customerid:customerid,
            txtDiscount:discount,
            valuePay:paymentName,
            typeBQ: typeBQClon,
            phanmem: productName,
            note: note,
            isErrorState: false,
            messagebill: messagebill,
            productid: null,
            motorCode: hid,
            hid: null,
            disCount: `${discount}`,
            goiBQ: planname?planname:'Gói bản quyền',
            price: pricers,
            planid: null,
            stateError: '',
            paymentid: null,
        };
    }

    btnSave = async() => {
        const { productid,typeBQ,customerid, planid,phanmem, hid, txtDiscount, note, paymentid, messagebill, type } = this.state;
        this.setState({
            isErrorState: true
        })
        if(
            typeBQ !== 'Chọn loại bản quyền'&&
            phanmem !== 'Chọn phần mềm'&&
            messagebill !== '' &&
            note !== '' 
        ){
            const { type } = this.state;
            const pass_word = await getLocale(LOCALE_KEY.pass_word);
            const email = await getLocale(LOCALE_KEY.email);
            const md5 = stringMd5(pass_word);
            const timeStamp = common.timeStamp();
            const token = common.createToken(timeStamp)
    
            const objPost = {
                email: email,
                password: md5,
                function: "editkey",
                time: timeStamp,
                token: token,
                variable: `{'id':'${customerid}','type':'${type}','productid':'${productid}','discount':'${txtDiscount}','planid':'${planid}','hid':${hid},'note':'${note}','paymentid':'${paymentid}','messagebill':'${messagebill}','advance':'hi'}"
            }`
            };
            try {
                await Guest.editkey(objPost,'message');
    
            } catch (e) {
                console.log(e);
            }
        }
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
        const timeStamp = common.timeStamp();
        const token = common.createToken(timeStamp);
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
                await   this.setState({
                    isNoData: false,
                    productid: item.id
                })
            } else {
                await   this.setState({
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
      console.log('dsdsds', this.props.route.params.item)
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
    onChangeTextDiscount = (text) => {
        this.setState({
            disCount: text,
        });
    };


    goBack = () => {
        this.props.navigation.goBack()
    };
    render() {
        const { note, messagebill, motorCode, price, disCount,
            typeBQ, phanmem, dataBQ, disablePhanMem, disableTypeBQ, dataTypyBQ,
            goiBQ, isNoData, dataPay, valuePay, isErrorState,
         } = this.state;
        return (
            <View>
                <NaviHerderFull title={'SỬA KEY'}
                    buttonRight={true} nameIcon={'check-bold'}
                    onPressRight={this.btnContinue}
                    onPressBack={this.goBack}
                    onPressRight={this.btnSave}
                    buttonLeft={true}
                    textRight={'Lưu'} />
                <ScrollView>
                    <View style={[styles.containerAll]}>
                        <View style={[styles.container]}>
                            <View style={styles.bottomKey} />
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
                             <ItemDisable nameIcon={'currency-usd'} value={common.formatNumber(price)} />
                             <NumberFormat
                                value={disCount}
                                displayType={'text'}
                                thousandSeparator={true}
                                renderText={(value) => (
                                    <View>
                                   <View style={[styles.containerInput]}>
                                    <MaterialCommunityIcons name={'sale'} size={20} style={{ color: 'gray', marginLeft:20 }} />
                                    <TextInput
                                        style={[
                                            styles.txtInput,
                                            // eslint-disable-next-line react-native/no-inline-styles
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
                                                txtDiscount:valueMount
                                            });
                                        }}
                                        placeholder="Nhập số tiền khiến mãi"
                                        placeholderTextColor="gray"
                                        value={value}
                                        keyboardType="numeric"
                                    />
                                    </View>
                                   <Text style={styles.txtError}></Text> 
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
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
    },
    txtInput:{
        width:'85%',
        marginLeft:20
    },
    txtError: {
        color: 'red',
        fontSize: 13,
        marginVertical: 8,
        marginLeft: 25
    },
    containerSearch: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    containerInput: {
        flexDirection:'row',
        height: windowHeight / 17.8,
        shadowColor: '#000',
        marginHorizontal: 20,
        alignItems:'center',
        borderRadius: 10,
        shadowRadius: 6,
        shadowOpacity: 0.16,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        elevation: 3,
        backgroundColor: "#fff",
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

export default EditKey;

