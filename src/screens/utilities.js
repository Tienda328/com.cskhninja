import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import NaviHerderFull from '../components/naviHerderFull';
import ListMyTeam from '../components/list/listMyTeam';
import FlatListLicense from '../components/list/flatListLicense';
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
    { key: 'three', title: 'My Team'  },
    { key: 'second',title: 'Kích hoạt lại bản quyền'},
];
export default class ListSaleAll extends React.Component {
    constructor(props) {
        super(props);
        const { leader, list_reportmyteam, emailSearch} = this.props.route.params.item
      
        const data = leader=== 'true'?routes2:routes1
        this.state = {
            index: 0,
            routes: data,
            email:emailSearch,
            dataMyTeam: list_reportmyteam,
        };
    }
    
    renderScene = ({ route }) => {
        switch (route.key) {
            // case 'first':
            //     return (
            //         <ScrollView >
            //             <ListProduct dataProduct={dataProduct} heightS={520} />
            //         </ScrollView>
            //     );
            case 'second':
                return (
                    <View style={{flex:1}}>
                    <FlatListLicense navigation={this.props.navigation}
                    email={this.state.email}
                    />
                 </View>
                );
            default:
                return null;
        }
    };
    renderScene2 = ({ route }) => {
        const { dataMyTeam} = this.state
        switch (route.key) {
            // case 'first':
            //     return (
            //         <ScrollView >
            //             <ListProduct dataProduct={dataProduct} heightS={520} />
            //         </ScrollView>
            //     );
            case 'second':
                return (
                    <View style={{flex:1}}>
                       <FlatListLicense navigation={this.props.navigation}
                       email={this.state.email}
                       />
                    </View>
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
                    <Text style={styles.txtTitle}>Danh sách key</Text>
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
        marginBottom:1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#D8D8D8',
    }
});
