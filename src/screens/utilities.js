import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import NaviHerderFull from '../components/naviHerderFull';
import ListMyTeam from '../components/list/listMyTeam';
import ListLicenseActivation from '../components/list/listLicenseActivation';
import common from '../utils/common';
import Guest from '../api/guest';
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
  // { key: 'first', title: 'Sản phẩm' },
  { key: 'second',title: 'Kích hoạt lại bản quyền'},
];

const routes2 = [
    // { key: 'first', title: 'Sản phẩm' },
    { key: 'second',title: 'Kích hoạt lại bản quyền'},
    { key: 'three', title: 'My Team'  },
];
export default class ListSaleAll extends React.Component {
    constructor(props) {
        super(props);
        const { leader, list_reportmyteam} = this.props.route.params.item
        const data = leader=== 'true'?routes2:routes1
        this.state = {
            index: 0,
            routes: data,
            emailSearch:'',
            dataRestKey: [],
            dataMyTeam: list_reportmyteam,
        };
    }

    onChangeTextEmail = (text) => {
        this.setState({
          emailSearch: text,
        });
    };
    clickReset=(item)=>{
        this.props.navigation.navigate('UpdateMachineCodeScreen',{item})
      }
    

    getResetKey = async () => {
        const {emailSearch}=this.state
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
            variable: `{'keyword':'${emailSearch}','page':'1','pagesize':'10'}`
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
    renderScene = ({ route }) => {
        const { dataRestKey } = this.state
        switch (route.key) {
            // case 'first':
            //     return (
            //         <ScrollView >
            //             <ListProduct dataProduct={dataProduct} heightS={520} />
            //         </ScrollView>
            //     );
            case 'second':
                return (
                    <ListLicenseActivation dataRestKey={dataRestKey}
                        onChangeText={(text) => this.onChangeTextEmail(text)}
                        clickSearch={this.getResetKey}
                        clickReset={this.clickReset}
                        heightS={400}
                    />
                );
            default:
                return null;
        }
    };
    renderScene2 = ({ route }) => {
        const { dataRestKey ,dataMyTeam} = this.state
        switch (route.key) {
            // case 'first':
            //     return (
            //         <ScrollView >
            //             <ListProduct dataProduct={dataProduct} heightS={520} />
            //         </ScrollView>
            //     );
            case 'second':
                return (
                    <ScrollView >
                         <ListLicenseActivation dataRestKey={dataRestKey}
                        onChangeText={(text) => this.onChangeTextEmail(text)}
                        clickSearch={this.getResetKey}
                        clickReset={this.clickReset}
                        heightS={400}
                    />
                    </ScrollView>
                );
            case 'three':
                return (
                    <ScrollView >
                        <ListMyTeam dataMyTeam={dataMyTeam} heightS={500} />
                    </ScrollView>
                );
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
        const { Role, index, routes } = this.state
        return (
            <View style={[{ flex: 1, backgroundColor: '#f2f2f2', }]}>
                <NaviHerderFull title={'TIỆN ÍCH'}
                    onPressBack={this.goBack}
                    buttonLeft={true}
                    onPressRight={this.clickEdit} />
                <View style={styles.containerTitle}>
                    <Text style={styles.txtTitle}>Doanh số theo</Text>
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
    txtAll: {
        fontSize: 15,
        color: '#0000FF',
        fontWeight: '500',
        marginRight: 20,
        paddingVertical: 10,
    },
    scene: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerTitle: {
        marginTop:10,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#D8D8D8',
    }
});
