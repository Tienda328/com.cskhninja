import * as React from 'react';
import { Animated, View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

const SecondRoute1 = () => (
  <View style={[styles.container]} >
       <Text>FirstRoute</Text>
  </View>
);
const SecondRoute2 = () => (
  <View style={[styles.container]} >
      <Text>SecondRoute</Text>
  </View>
);
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


export default class TabViewExample extends React.Component {
  state = {
    index: 0,
    routes: [
      // { key: 'tab1', title: 'Sản Phẩm' },
      // { key: 'tab2', title: 'Thanh Toán' },
      // { key: 'tab3', title: 'BXH' },
      // { key: 'tab4', title: 'Theo Team' },
      { key: 'tab1', title: 'Kích hoạt lại bản quyền' },
      { key: 'tab2', title: 'Reset mật khẩu' },
    ],
  };

  _handleIndexChange = (index) => this.setState({ index });

  _renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5
            ),
          });

          return (
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => this.setState({ index: i })}>
              <Animated.Text key={route} style={{ opacity }}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  _renderScene = SceneMap({
    tab1: SecondRoute1,
    tab2: SecondRoute2,
    // tab3: SecondRoute3,
    // tab4: SecondRoute4,
  });

  render() {
    const {nameTitle}=this.props
    return (
  <View style={{flex:1}}>
    <View style={styles.containerTitle}>
    <Text style={styles.txtTitleKey}>{nameTitle} </Text>
      </View>
        <TabView
      navigationState={this.state}
      renderScene={this._renderScene}
      renderTabBar={this._renderTabBar}
      onIndexChange={this._handleIndexChange}
    />
  </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff',
    justifyContent:'center',
    alignItems:'center'

  },
  containerTitle:{
    marginTop: 10,
    backgroundColor: "#fff",
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
},
  txtTitleKey:{
    fontSize:15,
    fontWeight:'500',
    marginLeft:20,
    paddingVertical:10,
    borderBottomWidth:1,
    borderBottomColor:'#D8D8D8',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor:'#fff',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
});