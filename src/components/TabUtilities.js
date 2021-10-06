import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, TouchableOpacity } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
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
    { key: 'first', title: 'Kích hoạt loại bản quyền' },
];
const routes2= [
    { key: 'first', title: 'Kích hoạt loại bản quyền' },
    { key: 'second', title: 'My Team' },
];
export default class TabViewExample extends React.Component {
    constructor(props) {
        super(props);
        const data = this.props.leader=== 'true'?routes2:routes1
        this.state = {
            index: 0,
            routes:data
        };
      }
    renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                // return <ListProduct dataProduct={this.props.dataProduct} />;
            case 'second':
                // return <ListPay datatBank={this.props.datatBank} />;
            default:
                return null;
        }
    };
    renderScene2 = ({ route }) => {
        switch (route.key) {
            case 'first':
                // return <ListProduct dataProduct={this.props.dataProduct} />;
            case 'second':
                // return <ListPay datatBank={this.props.datatBank} />;
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
                    <Text style={styles.txtTitle}>Tiện ích</Text>
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
