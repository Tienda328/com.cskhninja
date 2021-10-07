import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Linking,
    ActivityIndicator,
    StyleSheet
} from 'react-native';
import ItemDetailIcon from '../components/itemDetailIcon';
import NaviHerderFull from '../components/naviHerderFull';
import common from '../utils/common';
import LOCALE_KEY, {
    getLocale,
} from '../repositories/local/appLocale';
import { stringMd5 } from 'react-native-quick-md5';
import Guest from '../api/guest';
import ItemManage from '../components/itemManage';
export default class DetailCustomer extends React.Component {
    constructor(props) {
        super(props);
        const { customerid } = this.props.route.params.item
        this.state = {
            dataKey: [],
            customerid: customerid,
            page: 1,
            count: null,
            total: null,
            isLoading: false,
        };
    }
    goBack = () => {
        this.props.navigation.goBack()
    };
    handleLoadMore = () => {
        this.setState({
            isLoading: true,
            page: this.state.page + 1
        }, () => this.getataMore())
    }

    getataMore = async () => {
        const { customerid, page } = this.state;
        await this.setState({
            isLoading: false,
        })
        const pass_word = await getLocale(LOCALE_KEY.pass_word);
        const email = await getLocale(LOCALE_KEY.email);
        const md5 = stringMd5(pass_word);
        const timeStamp = common.timeStamp();
        const token = common.createToken(timeStamp)
        const objPost = {
            email: email,
            password: md5,
            function: "viewkeycustomer",
            time: timeStamp,
            token: token,
            variable: `{'customerid':'${customerid}','page':'${page}','pagesize':'50'}`

        }
        try {
            const response = await Guest.viewkeycustomer(objPost);
            const data = JSON.parse(response.data)
            if (data !== '[]') {
                const dataFull = this.state.dataKey.concat(data.list_sale)
                this.setState({
                    dataKey: dataFull,
                })
            }
        } catch (e) {
            console.log(e);
        }
    }
    componentDidMount() {
        this.setState({
            isLoading: true
        }, () => this.getKey())
    }

    renderItem = ({ item, index }) => (
        <ItemManage navigation={this.props.navigation} item={item} index={index} isclick />
    );

    getKey = async () => {
        const { customerid } = this.state
        const pass_word = await getLocale(LOCALE_KEY.pass_word);
        const email = await getLocale(LOCALE_KEY.email);
        const md5 = stringMd5(pass_word);
        const timeStamp = common.timeStamp();
        const token = common.createToken(timeStamp)

        const objPost = {
            email: email,
            password: md5,
            function: "viewkeycustomer",
            time: timeStamp,
            token: token,
            variable: `{'customerid':'${customerid}','page':'1','pagesize':'50'}`
        }
        try {
            const response = await Guest.viewallkey(objPost);
            const data = JSON.parse(response.data)
            await this.setState({
                dataKey: data.list_sale,
                count: data.count,
                total: data.total,
                isLoading: false,
            })

        } catch (e) {
            console.log(e);
        }
    }
    clickEdit = (email, customerid, name, phone) => {
        const item = { email, customerid, name, phone }
        this.props.navigation.navigate('EditCustomerScreen', { item })
    };
    clickReset = async (emailReset) => {
        const pass_word = await getLocale(LOCALE_KEY.pass_word);
        const email = await getLocale(LOCALE_KEY.email);
        const md5 = stringMd5(pass_word);
        const timeStamp = common.timeStamp();
        const token = common.createToken(timeStamp);

        const objPost = {
            email: email,
            password: md5,
            function: "resetpasswordcustomer",
            time: timeStamp,
            token: token,
            variable: `{'email':'${emailReset}'}`
        };
        try {
            await Guest.resetpasswordcustomer(objPost, 'message');

        } catch (e) {
            console.log(e);
        }
    };
    renderFooter = () => {
        return (this.state.isLoading ?
            <View style={styles.loader}>
                <ActivityIndicator size='large' />
            </View> : null
        )
    }

    render() {
        const { email, customerid, name, phone,id
        } = this.props.route.params.item
        const { dataKey, count, total } = this.state
        return (
            <View
                style={styles.containerAll}>
                <NaviHerderFull title={'CHI TIẾT KHÁCH HÀNG'}
                    onPressBack={this.goBack}
                    buttonLeft={true} buttonRight={true}
                    nameIcon={'account-edit'}
                    textRight={'Sửa'}
                    onPressRight={() => this.clickEdit(email, customerid, name, phone)}

                    buttonRightIcon={true} />
                <View style={styles.container}>

                    <View style={{ backgroundColor: "#f2f2f2", flex: 1 }} >
                        <View style={{ backgroundColor: "#fff" }}>
                            <ItemDetailIcon txtValue={customerid ? customerid : ''}
                                nameIcon={'code-equal'}
                                styleColour={styles.txtColour} />
                            <ItemDetailIcon txtValue={name ? name : ''}
                                nameIcon={'rename-box'}
                                styleColour={styles.txtColour} />
                            <ItemDetailIcon txtValue={email ? email : ''}
                                nameIcon={'email'}
                                styleColour={styles.txtColour} />
                            {phone ? <TouchableOpacity onPress={() => {
                                if (phone !== ''
                                ) {
                                    Linking.openURL(
                                        'tel:' + phone,
                                    );
                                }
                            }}>
                                <ItemDetailIcon txtValue={phone ? phone : ''}
                                    nameIcon={'cellphone'}
                                    colorss={true}
                                    isIconRight
                                    iconRight={'phone'}
                                    style={{ color: '#0000FF' }}
                                    containerText={{ borderBottomColor: '#fff' }}
                                    styleColour={styles.txtColour} />
                            </TouchableOpacity> : null}
                            <View style={styles.containerTitle}>
                                <Text style={styles.txtTitle}>Danh Sách các key</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10, borderBottomWidth: 0.5,
                                borderBottomColor: '#D8D8D8',
                            }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ marginLeft: 20 }}>Hóa đơn:</Text>
                                    <Text> {count ? count : '0'}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text>Tổng :</Text>
                                    <Text style={{ marginRight: 20, color: '#0000FF' }}> {total ? common.formatNumber(total) : '0 đ'}</Text>
                                </View>
                            </View>

                        </View>
                        <FlatList
                            data={dataKey}
                            style={{ flex: 1 }}
                            renderItem={(item, index) => this.renderItem(item, index)}
                            keyExtractor={(item, index) => index.toString()}
                            ListFooterComponent={this.renderFooter}
                            onEndReached={this.handleLoadMore}
                            onEndThreshold={0}
                        />
                    </View>
                    <TouchableOpacity style={styles.containerReset}
                        onPress={() => this.clickReset(email)}>
                        {/* <MaterialCommunityIcons name={'lock-reset'} size={25} style={{ color: 'gray' }} /> */}
                        <Text style={styles.txtGoi}>Reset password</Text>

                    </TouchableOpacity>
                </View>

            </View>
        );
    }

}

const styles = StyleSheet.create({
    containerAll: {
        flex: 1,
        backgroundColor: '#F2F2F2'
    },
    loader: {
        marginTop: 10,
        alignItems: 'center'
    },
    txtTitle: {
        fontSize: 15,
        fontWeight: '500',
        marginLeft: 20,
        paddingVertical: 10,
        // borderBottomWidth: 0.5,
        // borderBottomColor: '#D8D8D8',
        // flex:1
    },
    containerTitle: {
        backgroundColor: "#fff",
        flexDirection: 'row',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'center'
    },
    container: {
        flex: 1,
    },
    View: {
        marginBottom: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
    },
    txtColour: {
        fontSize: 18,
        color: '#000'
    },
    txtGoi: {
        color: '#0000FF',
        paddingVertical: 15,
        fontWeight: '600',
        marginLeft: 5,
    },
    containerReset: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
        borderRadius: 10,
    },

})