import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import NaviHerderFull from '../components/naviHerderFull';
import ListProduct from '../components/list/listProduct';
import ListPay from '../components/list/listPay';
import ListRatings from '../components/list/listRatings';
import ListTeam from '../components/list/listTeam';
import common from '../utils/common';
import Guest from '../api/guest';
import MenuMain from '../components/menuMain';
import { stringMd5 } from 'react-native-quick-md5';
import LOCALE_KEY, {
    getLocale,
} from '../repositories/local/appLocale';
const LazyPlaceholder = ({ route }) => (
    <View style={styles.scene}>
        <Text> {route.title}</Text>
    </View>
);
const routes1 = [
    { key: 'three', title: 'Xếp Hạng' },
    { key: 'first', title: 'Sản phẩm' },
    { key: 'second', title: 'Thanh toán' },
    
];
const dataMenu = [
    { id: '1', title: '7 ngày qua' },
    { id: '2', title: 'Hôm nay' },
    { id: '3', title: 'Hôm qua' },
    { id: '4', title: 'Tháng này' },
    { id: '5', title: 'Tháng trước' },
];

const routes2 = [
    { key: 'three', title: 'Xếp Hạng' },
    { key: 'first', title: 'Sản phẩm' },
    { key: 'second', title: 'Thanh toán' },
    { key: 'four', title: 'Theo team' },
];
export default class ListSaleAll extends React.Component {
    constructor(props) {
        super(props);
        const data = this.props.role === 'Admin' ? routes2 : routes1
        this.state = {
            index: 0,
            routes: data,
            dataProduct: [],
            datatBank: [],
            datatBXH: [],
            dataTeam: [],
            nameTitle: 'Hôm nay',
            modalVisible: false,
        };
    }
    componentDidMount() {
        const day = common.lastDay(-1)
        this.getData(day, day)
        // this.getResetKey()
    }


    getData = async (startdate, enddate) => {
        const pass_word = await getLocale(LOCALE_KEY.pass_word);
        const role = await getLocale(LOCALE_KEY.role);
        const leader = await getLocale(LOCALE_KEY.leader);
        const email = await getLocale(LOCALE_KEY.email);
        const md5 = stringMd5(pass_word);
        const timeStamp = common.timeStamp();
        const token = common.createToken(timeStamp);
        const objPost = {
            email: email,
            password: md5,
            function: "reportsale",
            time: timeStamp,
            token: token,
            variable: `{'startdate':'${startdate}','enddate':'${enddate}'}`
        };

        try {
            const response = await Guest.reportsale(objPost);
            const data = JSON.parse(response.data)
            await this.setState({
                dataProduct: data.list_reportsoftware,
                datatBank: data.list_reportbank,
                datatBXH: data.list_reportbxh,
                dataTeam: data.list_reportteam,

            })
        } catch (e) {
            console.log(e);
        }
    }
    renderScene = ({ route }) => {
        const { dataProduct, datatBank, datatBXH } = this.state
        switch (route.key) {
            case 'first':
                return (
                    <ScrollView >
                        <ListProduct dataProduct={dataProduct} heightS={520} />
                    </ScrollView>
                );
            case 'second':
                return (
                    <ScrollView >
                        <ListPay datatBank={datatBank} heightS={520} />
                    </ScrollView>
                );
            case 'three':
                <ScrollView >
                    <ListRatings datatBXH={datatBXH} heightS={520} />
                </ScrollView>
            default:
                return null;
        }
    };
    renderScene2 = ({ route }) => {
        const { dataProduct, datatBank, datatBXH, dataTeam } = this.state
        switch (route.key) {
            case 'first':
                return (
                    <ScrollView >
                        <ListProduct dataProduct={dataProduct} heightS={520} />
                    </ScrollView>
                );
            case 'second':
                return (
                    <ScrollView >
                        <ListPay datatBank={datatBank} heightS={520} />
                    </ScrollView>
                );
            case 'three':
                return (
                    <ScrollView >
                        <ListRatings datatBXH={datatBXH} heightS={520} />
                    </ScrollView>
                );
            case 'four':
                <ScrollView >
                    <ListTeam dataTeam={dataTeam} heightS={520} />
                </ScrollView>
            default:
                return null;
        }
    };

    _handleIndexChange = index => this.setState({ index });

    _renderLazyPlaceholder = ({ route }) => <LazyPlaceholder route={route} />;
    renderTabBar = props => (
        < TabBar
            {...props}
            activeColor={'#0000FF'}
            indicatorStyle={{ backgroundColor: '#0000FF', fontSize: 10 }}
            style={{ backgroundColor: '#fff', }}
            inactiveColor={'gray'}
            labelStyle={{ fontSize: 12 }}
        />
    );
    onShow = () => {
        this.setState({
            modalVisible: true,
        });
    }
    getDay = (id) => {
        const date = new Date();
        const today = common.formatDate(date);
        if (id === '1') {
            //7 ngày qua
            const day = common.lastDay(5)
            const itemDay = {
                startdate: day,
                enddate: today
            }

            return itemDay
        }
        else if (id === '2') {
            //hôm nay
            const day = common.lastDay(-1)
            const itemDay = {
                startdate: day,
                enddate: day
            }

            return itemDay
        }
        else if (id === '3') {
            //hom qua
            const day = common.lastDay(0)
            const itemDay = {
                startdate: day,
                enddate: day
            }

            return itemDay
        }
        else if (id === '4') {
            //tháng này
            const day = common.firstMonth()
            const itemDay = {
                startdate: day,
                enddate: today
            }
            return itemDay
        } else {
            // tháng trước
            const dayEnd = common.lastMonth()
            const day = common.firstLastMonth()
            const itemDay = {
                startdate: day,
                enddate: dayEnd
            }
            return itemDay
        }
    };

    onCloseModal = async (item) => {
        await this.setState({
            modalVisible: false,
            nameTitle: item.title
        });
        const day = this.getDay(item.id)
        this.getData(day.startdate, day.enddate)
    }
    goBack = () => {
        this.props.navigation.goBack()
    };
    render() {
        const { Role, index, routes, modalVisible, nameTitle } = this.state
        return (
            <View style={[{ flex: 1, backgroundColor: '#f2f2f2', }]}>
                <NaviHerderFull title={'DOANH SỐ'}
                    onPressBack={this.goBack}
                    buttonLeft={true}
                    onPressRight={this.clickEdit} />
                <MenuMain
                    modalVisible={modalVisible}
                    ClickShow={this.onShow}
                    ClickHide={this.onCloseModal}
                    dataMenu={dataMenu}
                    nameTitle={nameTitle}
                />
                <View style={styles.containerTitle}>
                    <Text style={styles.txtTitle}>Doanh số</Text>
                </View>
                <TabView
                    lazy
                    navigationState={{ index, routes }}
                    renderScene={Role ? this.renderScene : this.renderScene2}
                    renderTabBar={this.renderTabBar}
                    renderLazyPlaceholder={this._renderLazyPlaceholder}
                    onIndexChange={this._handleIndexChange}
                    initialLayout={{ width: Dimensions.get('window').width }}
                />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    txtTitle: {
        fontSize: 15,
        fontWeight: '500',
        marginLeft: 20,
        paddingVertical: 10,
    },
    scene: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerTitle: {
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#D8D8D8',
    }
});
