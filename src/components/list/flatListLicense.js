import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    ActivityIndicator
} from 'react-native';
import styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import common from '../../utils/common';
import Search from '../search';
import Guest from '../../api/guest';
import { stringMd5 } from 'react-native-quick-md5';
import LOCALE_KEY, {
    getLocale,
} from '../../repositories/local/appLocale';

export default class ListLicenseActivation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailSearch: this.props.email,
            dataRestKey: [],
            page: 1,
            isLoading: false,
        };
    }

    clickReset = (item) => {
        this.props.navigation.navigate('UpdateMachineCodeScreen', { item })
    }

     componentDidMount() {
         console.log('sdsd',this.props.email==='')
         if(this.props.email!==''){
            this.getResetKey()
         }
      }

    getResetKey = async () => {
        const { emailSearch } = this.state
        const pass_word = await getLocale(LOCALE_KEY.pass_word);
        const email = await getLocale(LOCALE_KEY.email);
        const md5 = stringMd5(pass_word);
        const timeStamp = common.timeStamp();
        const token = common.createToken(timeStamp);
        const objPost = {
            email: email,
            password: md5,
            function: "resetkey",
            time: timeStamp,
            token: token,
            variable: `{'keyword':'${emailSearch}','page':'1','pagesize':'50'}`
        };

        try {
            const response = await Guest.resetkey(objPost);
            const data = JSON.parse(response.data)
            await this.setState({
                dataRestKey: data,
            })
        } catch (e) {
            console.log(e);
        }
    }

    renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={styles.containerAll}
                onPress={() => this.clickReset(item)}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={styles.containerLeft}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>

                            <Text style={{ width: 40, textAlign: 'center', }} numberOfLines={1}> {index + 1}</Text>

                            {item.type === 1 ? <Image
                                style={{ width: 20, height: 20, marginRight: 5 }}
                                source={require('../../resource/image/icon-product.png')}
                            /> :
                                <Image
                                    style={{ width: 20, height: 20, marginRight: 5 }}
                                    source={require('../../resource/image/icon_servic.png')}
                                />}
                        </View>

                        <View>
                            <Text style={styles.txtLeft} numberOfLines={1}>{item.customername ? item.customername : ''}</Text>
                            <Text style={[styles.txtLeftEmail]} numberOfLines={1}>{item.customeremail ? item.customeremail : ''}</Text>
                            <Text style={styles.txtLeftEmail} numberOfLines={1}>{item.productName ? item.productName : ''}</Text>
                        </View>
                    </View>
                    <View >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                            <View>
                                <Text style={styles.txtRight} numberOfLines={1}>{item.saledate ? common.formatDate2(item.saledate) : ''}</Text>
                                <Text style={[styles.txtRight, { color: item.approve ? '#0000FF' : '#FF0000' }]} numberOfLines={1}>{item.price ? common.formatNumber(pricenew) : '0 đ'}</Text>
                                <Text style={[styles.txtRight]} numberOfLines={1}>{item.conlai ? item.conlai + ' ngày' : '0 ngày'}</Text>
                            </View>
                            <View >
                                <MaterialCommunityIcons name={'lock-reset'} size={20} style={{ marginRight: 10, color: '#FF8000' }} />
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    onChangeTextEmail = (text) => {
        this.setState({
            emailSearch: text,
        });
    };


    handleLoadMore = () => {
        this.setState({
            isLoading: true,
            page: this.state.page + 1
        }, () => this.getataMore())
    }
    getataMore = async () => {
        const { emailSearch } = this.state
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
            function: "resetkey",
            time: timeStamp,
            token: token,
            variable: `{'keyword':'${emailSearch}','page':'${this.state.page}','pagesize':'25'}`
        };

        try {
            const response = await Guest.resetkey(objPost);
            const data = JSON.parse(response.data)
            if (data !== '[]') {
                const dataFull = this.state.dataRestKey.concat(data)
                this.setState({
                    dataRestKey: dataFull,
                })
            }
        } catch (e) {
            console.log(e);
        }
    }
    renderFooter = () => {
        return (this.state.isLoading ?
            <View style={styles.loader}>
                <ActivityIndicator size='large' />
            </View> : null
        )
    }

    render() {
        const { dataRestKey, emailSearch } = this.state;
        return (
            <View style={{ backgroundColor: "#f2f2f2", paddingTop: 10, flex: 1 }}>
                <Search style={{ marginTop: 0 }}
                    onChangeText={(text) => this.onChangeTextEmail(text)}
                    clickSearch={this.getResetKey}
                    value={emailSearch}
                />
                {dataRestKey[0] !== undefined ?
                    <FlatList
                        style={{ paddingTop: 10 }}
                        data={dataRestKey}
                        renderItem={(item, index) => this.renderItem(item, index)}
                        keyExtractor={(item, index) => index.toString()}
                        ListFooterComponent={this.renderFooter}
                        onEndReached={this.handleLoadMore}
                        onEndThreshold={0}
                    /> : (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Không có dữ liệu</Text></View>)}
            </View>
        );
    }
}
