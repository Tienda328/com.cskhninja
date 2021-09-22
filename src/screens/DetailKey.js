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
        const {customerid,customername,datecreate, customeremail, customerphone,
            productName,expirationdate,conlai,paymentName,note,price
        } = this.props.route.params.item
        return (
            <View
                style={styles.containerAll}> 
                <NaviHerderFull title={'CHI TIẾT KEY'}
                    onPressBack={this.goBack}
                    buttonLeft={true} buttonRight={true}
                    nameIcon={'account-edit'}
                     textRight={'Sửa'}
                     onPressRight={this.clickEdit} />
                <View style={styles.container}>
                    <View>
                        <ItemFlexRow txtName={'Mã KH'} txtValue={customerid?customerid:''}
                        styleColour={styles.txtColour} />
                        <ItemFlexRow txtName={'Ngày Bán'} txtValue={datecreate?datecreate:''} 
                        styleColour={styles.txtColour}/>
                        <ItemFlexRow txtName={'Họ Tên'} txtValue={customername?customername:''}
                        styleColour={styles.txtColour} />
                        <ItemFlexRow txtName={'Email'} txtValue={customeremail?customeremail:''}
                        styleColour={styles.txtColour} />
                        <ItemFlexRow txtName={'Số Điện Thoại'} txtValue={customerphone?customerphone:''}
                        styleColour={styles.txtColour} />
                        <ItemFlexRow txtName={'Sản Phẩm'} txtValue={productName?productName:''}
                        styleColour={styles.txtColour} />
                        <ItemFlexRow txtName={'Người Bán'} txtValue={customername?customername:''}
                        styleColour={styles.txtColour} />
                        <ItemFlexRow txtName={'Ngày Kết Thúc'} txtValue={expirationdate?expirationdate:''}
                        styleColour={styles.txtColour}/>
                        <ItemFlexRow txtName={'Còn Lại'} txtValue={conlai?conlai:''}
                        styleColour={styles.txtColour} />
                        <ItemFlexRow txtName={'Giá Tiền'} txtValue={price?price:''}
                        styleColour={styles.txtColour} />
                        <ItemFlexRow txtName={'Thanh Toán'} txtValue={paymentName?paymentName:''} 
                        style={{ width: 160 }} styleColour={styles.txtColour} />
                        <ItemFlexRow txtName={'Ghi Chú'} txtValue={note?note:'note'}
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
        backgroundColor: '#D8D8D8'
    },
    container:{
        flex:1,
        backgroundColor:'#fff',
        marginHorizontal:20,
        marginTop:20,
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
    txtColour: {
        fontSize: 18,
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
        backgroundColor: '#0080FF',
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