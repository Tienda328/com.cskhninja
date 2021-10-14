import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, TouchableOpacity } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ListProduct from './list/listProduct';
import ListPay from './list/listPay';
import ListRatings from './list/listRatings';
import LOCALE_KEY, {
    getLocale,
} from '../repositories/local/appLocale';
import ListTeam from './list/listTeam';
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
const routes2 = [
    { key: 'three', title: 'Xếp Hạng' },
    { key: 'four', title: 'Theo team' },
    { key: 'first', title: 'Sản phẩm' },
    { key: 'second', title: 'Thanh toán' },
];
export default class TabViewExample extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            index: 0,
            routes: routes2,
            leader: ''
        };
    }
    async componentDidMount() {
        const role = await getLocale(LOCALE_KEY.role);
        const data = role === 'Admin' ? routes2 : routes1
        this.setState({
            routes: data
        })

    }
    renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return <ListProduct dataProduct={this.props.dataProduct} />;
            case 'second':
                return <ListPay datatBank={this.props.datatBank} />;
            case 'three':
                return <ListRatings datatBXH={this.props.datatBXH} />;
            default:
                return null;
        }
    };
    renderScene2 = ({ route }) => {
        switch (route.key) {
            case 'first':
                return <ListProduct dataProduct={this.props.dataProduct} />;
            case 'second':
                return <ListPay datatBank={this.props.datatBank} />;
            case 'three':
                return <ListRatings datatBXH={this.props.datatBXH} />;
            case 'four':
                return <ListTeam dataTeam={this.props.dataTeam} />;
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
            labelStyle={{ fontSize: 11 }}
        />
    );

    render() {
        const { Role, index, routes, } = this.state
        const { style, clickAll } = this.props
        return (
            <View style={[{ flex: 1, backgroundColor: '#f2f2f2', }, style]}>
                <View style={styles.containerTitle}>
                    <Text style={styles.txtTitle}>Doanh số </Text>
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginRight: 20 }} onPress={clickAll}>
                        <MaterialCommunityIcons name={'chevron-right'} size={30} style={{ color: '#FF8000', }} />
                    </TouchableOpacity>

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
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#D8D8D8',
    }
});
