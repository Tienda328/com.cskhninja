import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, TouchableOpacity } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ListLicenseActivation from './list/listLicenseActivation';
import LOCALE_KEY, {
    getLocale,
  } from '../repositories/local/appLocale';
import ListMyTeam from './list/listMyTeam';
const LazyPlaceholder = ({ route }) => (
    <View style={styles.scene}>
        <Text> {route.title}</Text>
    </View>
);
const routes1 = [
    { key: 'first', title: 'Kích hoạt lại bản quyền' },
];
const routes2 = [
    { key: 'second', title: 'My Team' },
    { key: 'first', title: 'Kích hoạt lại bản quyền' },
];
export default class TabViewExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: routes2,
            leader:''
        };
    }
    renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return <ListLicenseActivation dataRestKey={this.props.dataRestKey}
                    onChangeText={this.props.onChangeText}
                    value={value}
                    clickReset={this.props.clickReset}
                    clickSearch={this.props.clickSearch} />;
            default:
                return null;
        }
    };
    renderScene2 = ({ route }) => {
        switch (route.key) {
            case 'first':
                return <ListLicenseActivation dataRestKey={this.props.dataRestKey}
                    onChangeText={this.props.onChangeText}
                    clickReset={this.props.clickReset}
                    clickSearch={this.props.clickSearch}
                />;
            case 'second':
                return <ListMyTeam dataMyTeam={this.props.dataMyTeam} />;
            default:
                return null;
        }
    };

    _handleIndexChange = index => this.setState({ index });
      async  componentDidMount() {
        const leader = await getLocale(LOCALE_KEY.leader);
        const data = leader=== 'true'?routes2:routes1
        this.setState({
            routes: data
        })
       
      }
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

    render() {
        const { Role, index, routes } = this.state
        const { style, clickUtilites } = this.props
        return (
            <View style={[{ flex: 1, backgroundColor: '#f2f2f2', }, style]}>
                <View style={styles.containerTitle}>
                    <Text style={styles.txtTitle}>Tiện ích</Text>
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginRight: 20 }} onPress={clickUtilites}>
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
