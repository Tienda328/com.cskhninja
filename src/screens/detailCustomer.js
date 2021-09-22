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
import colors from '../constants/colors';

export default class DetailCustomer extends React.Component {
    goBack = () => {
        this.props.navigation.goBack()
    };
    clickEdit = () => {
        this.props.navigation.navigate('EditCustomerScreen')
    };
    render() {
        const {email,id,name, phone
        } = this.props.route.params.item
        return (
            <View
                style={styles.containerAll}>
                <NaviHerderFull title={name?name:''}
                    onPressBack={this.goBack}
                    buttonLeft={true} buttonRight={true}
                    nameIcon={'account-edit'}
                     textRight={'Sửa'}
                    onPressRight={this.clickEdit}

                    buttonRightIcon={true} />
                <View style={styles.container}>

                    <View>
                        <ItemFlexRow txtName={'Mã KH'}
                            txtValue={id?id:''}
                            styleColour={styles.txtColour} />
                        <ItemFlexRow txtName={'Email'}
                            txtValue={email?email:''}
                            styleColour={styles.txtColour} />
                        <ItemFlexRow txtName={'Số Điện Thoại'}
                            txtValue={phone?phone:''}
                            styleColour={styles.txtColour} />
                        {/* <ItemFlexRow txtName={'DateCreate'}
                            txtValue={'5/5/2018 8:04:24 AM'}
                            styleColour={styles.txtColour} />
                        <ItemFlexRow txtName={'Point'}
                            txtValue={'1000000'}
                            styleColour={styles.txtColour} />
                        <ItemFlexRow txtName={'Token'}
                            txtValue={'E7B2C2EC6FF08CEEC753855DD18B6D8C'}
                            style={{ width: 160 }} styleColour={styles.txtColour} />
                        <ItemFlexRow txtName={'Status'} txtValue={'Active'}
                            styleColour={styles.txtColour} /> */}
                    </View>
                    <View style={styles.containerAll} >
                        <View style={styles.containerAll} />
                        <View style={styles.containerButton}>
                        <TouchableOpacity style={styles.btnCall}>
                            <View style={styles.containerCall}>
                                <MaterialCommunityIcons name={'phone'} size={25} style={styles.iconCall} />
                                <Text style={styles.txtGoi}>GỌI</Text>
                                <View style={{ width: 30 }} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnDuyet}>
                            <View style={styles.containerReset}>

                                <Text style={styles.txtGoi}>RESET MẬT KHẨU</Text>
                            </View>
                        </TouchableOpacity>
                        </View>
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
    },
   container:{
    flex:1,
    backgroundColor:'#fff',
    marginHorizontal:20,
    marginVertical:20,
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
        color: '#000'
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
    containerReset: {
        justifyContent: 'center',
        alignItems: 'center'

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
        flexDirection: 'row',
        marginBottom:20,
    }

})