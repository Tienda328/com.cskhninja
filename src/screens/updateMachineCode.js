
import React from 'react';
import {
    View,
    Text,
    Alert,
    TextInput,
    Linking,
    Dimensions,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import NaviHerderFull from '../components/naviHerderFull';
import TextInputKey from '../components/TextIputKey';
import ItemDetailIcon from '../components/itemDetailIcon';
import LOCALE_KEY, {
    getLocale,
} from '../repositories/local/appLocale';
import Guest from '../api/guest';
import common from '../utils/common';
import ItemComponentTitle from '../components/itemComponentTitle';
import { stringMd5 } from 'react-native-quick-md5';
const windowHeight = Dimensions.get('window').height;

class EditKey extends React.Component {
    constructor(props) {
        super(props);
        const { hid, customerphone,id, customeremail, customername, planname, customerid, datecreate, productName } = this.props.route.params.item
        this.state = {
            motorCode: hid,
            customerid: customerid,
            id:id,
            customername: customername,
            customerphone: customerphone,
            datecreate: datecreate,
            customeremail: customeremail,
            productName: productName,
            planname: planname,

        };
    }

    btnSave = async () => {
        const { motorCode, id } = this.state;
        if (id !== 0) {
            const pass_word = await getLocale(LOCALE_KEY.pass_word);
            const email = await getLocale(LOCALE_KEY.email);
            const md5 = stringMd5(pass_word);
            const timeStamp = common.timeStamp();
            const token = common.createToken(timeStamp)

            const objPost = {
                email: email,
                password: md5,
                function: "updatehid",
                time: timeStamp,
                token: token,
                variable: `{'id':'${id}','hid':'${motorCode}'}`
            };
            try {
                const response = await Guest.editkey(objPost);
                if (response.status === true) {
                    this.props.navigation.goBack();
                } else {
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
        }else{
            Alert.alert(
                "Thông báo",
                'Không tìm thấy id',
                [
                    { text: "OK", onPress: () => { } }
                ]
            );
        }

    }


    onChangeTextMotorCode = (text) => {
        this.setState({
            motorCode: text,
        });
    };


    goBack = () => {
        this.props.navigation.goBack()
    };
    render() {
        const { motorCode, customername, customerphone, customeremail,
            datecreate, productName, planname,customerid,id
        } = this.state;
        const email = customeremail;
        const name = customername;
        const phone = customerphone;
        const item = { customerid,id, email, name, phone };
        return (
            <View style={{ flex: 1 }}>
                <NaviHerderFull title={'RESET BẢN QUYỀN'}
                    buttonRight={true} nameIcon={'check-bold'}
                    onPressRight={this.btnContinue}
                    onPressBack={this.goBack}
                    onPressRight={this.btnSave}
                    buttonLeft={true}
                    textRight={'Lưu'} />
                <View style={[styles.containerAll]}>
                    <ItemComponentTitle
                        nameTitle={'Thông tin khách hàng'}
                        drawIconLeft={
                            <View>
                                {customerid ? <TouchableOpacity
                                  onPress={()=>this.props.navigation.navigate('DetailCustomerScreen',{item})}
                                >
                                    <ItemDetailIcon txtValue={customerid ? customerid : ''}
                                        nameIcon={'code-equal'}
                                        iconRight={'link'}
                                        style={{ color: '#0000FF' }}
                                        colorss={true}
                                        isIconRight
                                        styleColour={styles.txtColour} />
                                </TouchableOpacity> : null}
                                <ItemDetailIcon txtValue={datecreate ? common.formatDate2(datecreate) : ''}
                                    nameIcon={'calendar-range'}
                                    styleColour={styles.txtColour} />
                                <ItemDetailIcon txtValue={customername ? customername : ''}
                                    nameIcon={'account'}
                                    styleColour={styles.txtColour} />
                                <ItemDetailIcon txtValue={customeremail ? customeremail : ''}
                                    nameIcon={'email'}
                                    //   containerText={{ borderBottomColor: customerphone ? '#D8D8D8' : '#fff' }}
                                    styleColour={styles.txtColour} />
                                {customerphone ? <TouchableOpacity onPress={() => {
                                    if (customerphone !== ''
                                    ) {
                                        Linking.openURL(
                                            'tel:' + customerphone,
                                        );
                                    }
                                }}>
                                    <ItemDetailIcon txtValue={customerphone ? customerphone : ''}
                                        nameIcon={'cellphone'}
                                        colorss={true}
                                        isIconRight
                                        iconRight={'phone'}
                                        style={{ color: '#0000FF' }}
                                        containerText={{ borderBottomColor: '#fff' }}
                                        styleColour={styles.txtColour} />
                                </TouchableOpacity> : null}
                            </View>
                        } />
                    <ItemComponentTitle
                        nameTitle={'Thông tin phần mềm'}
                        drawIconLeft={
                            <View>
                                <ItemDetailIcon txtValue={productName ? productName : ''}
                                    nameIcon={'blender-software'}
                                    styleColour={styles.txtColour} />
                                {planname ? <ItemDetailIcon txtValue={planname}
                                    nameIcon={'gift'}
                                    styleColour={styles.txtColour} /> : null}
                                <TextInputKey
                                    onChangeText={(text) => this.onChangeTextMotorCode(text)}
                                    placeholder="Mã máy có thể bỏ trống"
                                    nameIcon={'qrcode'}
                                    styleInput={{ borderBottomColor: '#fff', width: '80%' }}
                                    value={motorCode}
                                    editable={true}
                                />
                            </View>
                        } />
                    <Text></Text>


                </View>
            </View>
        )
    }

};

const styles = StyleSheet.create({
    containerAll: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
    txtColour: {
        fontSize: 18,
    },
    container: {
        flex: 1,
    },
    btnContinue: {
        marginVertical: 10,
        backgroundColor: '#D8D8D8'
    },
});

export default EditKey;

