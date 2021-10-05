
import * as React from 'react';
import { Animated, View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import ScrollableTabView, {
    DefaultTabBar,
} from 'react-native-scrollable-tab-view';
import TabBar from 'react-native-underline-tabbar';
import TabView from './tabView';
import ListProduct from './list/listProduct';
import ListPay from './list/listPay';
import ListRatings from './list/listRatings';
import ListTeam from './list/listTeam';


const DATA = [
  {
    id: 'bd7acbea-c1b1-4w6c2-aed5-3ad53abb28ba',
    title: 'First Item',
    type:1
  },
  {
    id: '3ac68afc-c605-rwe-a4f8-fbd91aa97f63',
    title: 'Second Item',
    type:1
  },
  {
    id: '58694a0f-3da1-rwe-bd96-145571e29d72',
    title: 'Third Item',
    type:2
  },
  {
      id: 'bd7acbea-c1b1-4rwe6c2-aed5-3ad53abb28ba',
      title: 'First Item',
      type:1
    },
];

export default class TabSales extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.indexPage = 0;
    }

    currentPage = (currentpage) => {
        this.indexPage = currentpage.i;
    };
    render() {
        const { datatBXH, datatBank, dataProduct, dataTeam, role } = this.props
        return (
            <View style={{flex:1, height:340, backgroundColor:'#f2f2f2', }}>
               <View style={styles.containerTitle}>
                 <Text style={styles.txtTitle}>Doanh số theo</Text>
               </View>
               <ScrollableTabView
                    ref={(ref) => {
                        this.scrollableTabView = ref;
                    }}
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps={false}
                    renderTabBar={() => (
                        <TabBar
                          underlineColor={'transparent'}
                          tabBarStyle={styles.tabBarStyle}
                          prerenderingSiblingsNumber={Infinity}
                          renderTab={(
                            tab,
                            page,
                            isTabActive,
                            onPressHandler,
                            onTabLayout,
                          ) => (
                            <TabView
                              key={page}
                              stylesSub={interpolators[page]}
                              tab={tab}
                              // style={{justifyContent:'space-between'}}
                              page={page}
                              isTabActive={isTabActive}
                              // onPressHandler={()=> console.log(page)}
                              onTabLayout={onTabLayout}
                            />
                          )}
                        />
                      )}
                    onScroll={(x) => scrollX.setValue(x)}
                    initialPage={this.indexPage}
                    onChangeTab={this.currentPage}>
                    <ListProduct  tabLabel={{tabName: 'Theo sản phẩm'}} dataProduct={dataProduct}  />
                    <ListPay  tabLabel={{tabName: 'Thanh toán'}} datatBank={datatBank} />
                    <ListRatings  tabLabel={{tabName: 'Bảng xếp hạng'}} datatBXH={datatBXH} />
                    {role==='admin'?<ListTeam    tabLabel={{tabName: 'Theo team'}} dataTeam={dataTeam}  />:null}
                </ScrollableTabView>
            </View>
        );
    }
}
export const scrollX = new Animated.Value(0);
export const interpolators = Array.from({length: 7}, (_, i) => i).map(
    (idx) => ({
      scale: scrollX.interpolate({
        inputRange: [idx - 1, idx, idx + 1],
        outputRange: [1, 1.2, 1],
        extrapolate: 'clamp',
      }),
      opacity: scrollX.interpolate({
        inputRange: [idx - 1, idx, idx + 1],
        outputRange: [0.9, 1, 0.9],
        extrapolate: 'clamp',
      }),
      textColor: scrollX.interpolate({
        inputRange: [idx - 1, idx, idx + 1],
        outputRange: ['black', 'white', 'black'],
      }),
      fontSize: scrollX.interpolate({
        inputRange: [idx - 1, idx, idx + 1],
        outputRange: [
         12,
          12,
         12,
        ],
      }),
      backgroundColor: scrollX.interpolate({
        inputRange: [idx - 1, idx, idx + 1],
        outputRange: ['transparent', '#0066ff', 'transparent'],
        extrapolate: 'clamp',
      }),
    }),
  );
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    tabBarStyle: {
        backgroundColor: '#fff',
        borderTopColor: '#E7EDF4',
        width: '100%',
        borderTopWidth: 0,
        paddingLeft: 10,
        marginTop: 0,
      },
      txtTitle:{
        fontSize:15,
        fontWeight:'500',
        marginLeft:20,
        paddingVertical:10,
        borderBottomWidth:0.5,
        borderBottomColor:'#D8D8D8',
      },
      containerTitle:{backgroundColor:'#fff', 
      borderTopRightRadius:10,
      borderTopLeftRadius:10}
});