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
                        <ItemFlexRow txtName={'Mã KH'} txtValue={'250885'} />
                        <ItemFlexRow txtName={'Ngày Bán'} txtValue={'9/6/2021 11:27:22 AM'} />
                        <ItemFlexRow txtName={'Họ Tên'} txtValue={'Trần Văn Hòa'} />
                        <ItemFlexRow txtName={'Email'} txtValue={'hoatv@ninjateam.vn'} />
                        <ItemFlexRow txtName={'Số Điện Thoại'} txtValue={'0979090897'} />
                        <ItemFlexRow txtName={'Sản Phẩm'} txtValue={'Phần Mềm Ninja Care'} />
                        <ItemFlexRow txtName={'Người Bán'} txtValue={'Tran Van Hoa'} />
                        <ItemFlexRow txtName={'Ngày Kết Thúc'} txtValue={'12/5/2021 11:27:22 AM'} />
                        <ItemFlexRow txtName={'Còn Lại'} txtValue={'84 ngày'} />
                        <ItemFlexRow txtName={'Giá Tiền'} txtValue={'0.00'} />
                        <ItemFlexRow txtName={'Thanh Toán'} txtValue={'Tài khoản Vietcombank'} style={{ width: 130 }} />
                        <ItemFlexRow txtName={'Ghi Chú'} txtValue={'TEST NHÂN VIÊN'} />
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
        borderRadius: 20,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        marginHorizontal: 20,
        marginTop: 20,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
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
        backgroundColor: '#0489B1',
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
        marginBottom: 20
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