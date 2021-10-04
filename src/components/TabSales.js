
import * as React from 'react';
import { Animated, View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import ScrollableTabView, {
    DefaultTabBar,
} from 'react-native-scrollable-tab-view';
import TabBar from 'react-native-underline-tabbar';
import TabView from './tabView';

const SecondRoute3 = () => (
    <View style={[styles.container]} >
        <Text>SecondRoute</Text>
    </View>
);

const SecondRoute4 = () => (
    <View style={[styles.container]} >
        <Text>SecondRoute</Text>
    </View>
);

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
        const { nameTitle } = this.props
        return (
            <View style={{ flex: 1, backgroundColor:'#fff' }}>
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
                              page={page}
                              isTabActive={isTabActive}
                              onPressHandler={onPressHandler}
                              onTabLayout={onTabLayout}
                            />
                          )}
                        />
                      )}
                    onScroll={(x) => scrollX.setValue(x)}
                    initialPage={this.indexPage}
                    onChangeTab={this.currentPage}>
                    <SecondRoute3  tabLabel={{tabName: 'Theo sản Phẩm'}}  />
                    <SecondRoute4  tabLabel={{tabName: 'Thanh Toán'}}  />
                    <SecondRoute3  tabLabel={{tabName: 'BXH'}}  />
                    <SecondRoute4  tabLabel={{tabName: 'Theo Team'}}  />
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
        // backgroundColor: '#0066ff',
        borderTopColor: '#E7EDF4',
        width: '100%',
        borderTopWidth: 0,
        paddingLeft: 10,
        marginTop: 0,
      },
});