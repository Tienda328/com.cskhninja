import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, TouchableOpacity } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import ListProduct from './list/listProduct';
import ListPay from './list/listPay';
import ListRatings from './list/listRatings';
import ListTeam from './list/listTeam';
const LazyPlaceholder = ({ route }) => (
    <View style={styles.scene}>
        <Text> {route.title}</Text>
    </View>
);
const routes1= [
    { key: 'first', title: 'Sản phẩm' },
    { key: 'second', title: 'Thanh toán' },
    { key: 'three', title: 'Xếp Hạng' },
];
const routes2= [
    { key: 'first', title: 'Sản phẩm' },
    { key: 'second', title: 'Thanh toán' },
    { key: 'three', title: 'Xếp Hạng' },
    { key: 'four', title: 'Theo team' },
];
export default class TabViewExample extends React.Component {
    constructor(props) {
        super(props);
        const data = this.props.role=== 'Admin' ? routes2:routes1
        console.log(this.props.role)
        this.state = {
            index: 0,
            routes:data
        };
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
            activeColor={'#2E64FE'}
            indicatorStyle={{ backgroundColor: '#2E64FE', fontSize: 10 }}
            style={{ backgroundColor: '#fff', }}
            inactiveColor={'gray'}
            labelStyle={{ fontSize: 12 }}
        />
    );

    render() {
        const {Role,index, routes}=this.state
        const { style } = this.props
        return (
            <View style={[{ flex: 1, backgroundColor: '#f2f2f2', }, style]}>
                <View style={styles.containerTitle}>
                    <Text style={styles.txtTitle}>Doanh số theo</Text>
                    <TouchableOpacity>
                        <Text style={styles.txtAll}>{'Xem Tất cả'}</Text>
                    </TouchableOpacity>

                </View>
                <TabView
                    lazy
                    navigationState={{index, routes}}
                    renderScene={Role?this.renderScene:this.renderScene2}
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
        color: '#2E64FE',
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
