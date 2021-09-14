import { jsxAttribute } from '@babel/types';
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    StyleSheet
} from 'react-native';
import ItemFlexRow from '../components/itemFlexRow';
import NaviHerderFull from '../components/naviHerderFull';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class DetailKey extends React.Component {
    goBack = () => {
        this.props.navigation.goBack()
    };
    clickEdit = () => {
        this.props.navigation.navigate('EditKeyScreen')
    };
    render() {

        return (
            <View
                style={styles.containerAll}>
                <NaviHerderFull title={'CHI TIẾT KEY'}
                    onPressBack={this.goBack}
                    buttonLeft={true} buttonRight={true}
                    onPressRight={this.clickEdit}

                    buttonRightIcon={true} />
                <View style={styles.containerAll}>
                    <Image
                        style={{ width: '100%', height: '100%', position: 'absolute' }}
                        source={require('../resource/image/background-login.png')}
                    />
                    <View style={styles.container}>
                        <ItemFlexRow txtName={'Mã KH'} txtValue={'250885'}
                        styleColour={styles.txtColour} />
                        <ItemFlexRow txtName={'Ngày Bán'} txtValue={'9/6/2021 11:27:22 AM'} 
                        styleColour={styles.txtColour}/>
                        <ItemFlexRow txtName={'Họ Tên'} txtValue={'Trần Văn Hòa'}
                        styleColour={styles.txtColour} />
                        <ItemFlexRow txtName={'Email'} txtValue={'hoatv@ninjateam.vn'}
                        styleColour={styles.txtColour} />
                        <ItemFlexRow txtName={'Số Điện Thoại'} txtValue={'0979090897'}
                        styleColour={styles.txtColour} />
                        <ItemFlexRow txtName={'Sản Phẩm'} txtValue={'Phần Mềm Ninja Care'}
                        styleColour={styles.txtColour} />
                        <ItemFlexRow txtName={'Người Bán'} txtValue={'Tran Van Hoa'}
                        styleColour={styles.txtColour} />
                        <ItemFlexRow txtName={'Ngày Kết Thúc'} txtValue={'12/5/2021 11:27:22 AM'}
                        styleColour={styles.txtColour}/>
                        <ItemFlexRow txtName={'Còn Lại'} txtValue={'84 ngày'}
                        styleColour={styles.txtColour} />
                        <ItemFlexRow txtName={'Giá Tiền'} txtValue={'0.00'}
                        styleColour={styles.txtColour} />
                        <ItemFlexRow txtName={'Thanh Toán'} txtValue={'Tài khoản Vietcombank'} 
                        style={{ width: 160 }} styleColour={styles.txtColour} />
                        <ItemFlexRow txtName={'Ghi Chú'} txtValue={'TEST NHÂN VIÊN'}
                        styleColour={styles.txtColour} />
                    </View>
                    <View style={styles.containerButton}>
                        <TouchableOpacity style={styles.btnCall}>
                            <View style={styles.containerCall}>
                                <MaterialCommunityIcons name={'phone'} size={25} style={styles.iconCall} />
                                <Text style={styles.txtGoi}>GỌI</Text>
                                <View style={{ width: 30 }} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnDuyet}>
                            <View style={styles.containerCall}>
                                <MaterialCommunityIcons name={'checkbox-blank-outline'} size={25} style={styles.iconCall} />
                                <Text style={styles.txtGoi}>DUYỆT</Text>
                                <View style={{ width: 30 }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.containerDelete}>
                        <MaterialCommunityIcons name={'delete-circle-outline'} size={50} style={{ color: '#FE2E2E' }} />
                        {/* <Text style={styles.txtDelete}> Xóa key</Text> */}
                    </TouchableOpacity>
                </View>

            </View>
        );
    }

}

const styles = StyleSheet.create({
    containerAll: {
        flex: 1,
        backgroundColor: '#fff'
    },
    container: {
    },
    txtColour: {
        fontSize: 18,
        color: '#fff'
    },
    txtDelete: {
        fontWeight: '400',
        fontSize: 15,
        color: 'red'
    },
    txtGoi: {
        color: '#fff',
        paddingVertical: 15,
        fontWeight: '600'
    },
    btnCall: {
        flex: 1,
        height: 50,
        borderRadius: 20,
        backgroundColor: '#2E64FE',
        marginLeft: 20,
        marginRight: 10,
    },
    iconCall: {
        color: '#fff',
        marginLeft: 10
    },
    containerCall: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    containerDelete: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 15
    },
    viewDelete: {
        flex: 1,
    },
    btnDuyet: {
        flex: 1,
        height: 50,
        borderRadius: 20,
        backgroundColor: '#6E6E6E',
        marginLeft: 20,
        marginRight: 10,
    },
    containerButton: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20,

    }

})