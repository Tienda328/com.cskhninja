
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions
} from 'react-native';
import NaviHerderFull from '../components/naviHerderFull';
import TabView from '../components/tabView';
import ChartTest from '../components/chartTest';
import colors from '../constants/colors';
import ItemComponentTitle from '../components/itemComponentTitle';
import MenuMain from '../components/menuMain';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import LOCALE_KEY, {
  getLocale,
} from '../repositories/local/appLocale';
const Width = Dimensions.get('screen').width;

const dataMenu = [
  { id: '1', title: '7 ngày qua' },
  { id: '2', title: 'Hôm nay' },
  { id: '34', title: 'Hôm qua' },
  { id: '4', title: 'Tuần này' },
  { id: '5', title: 'Tuần trước' },
];

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      visible: false,
      nameTitleMenu: 'Tháng Trước'
    };
  }

  onShowMenu = () => {
    this.setState({
      visible: true
    })
  }
  hideMenu = (item) => {
    console.log('tiem', item)
    this.setState({
      visible: false,
      nameTitleMenu: item.title
    })
  }
  render() {
    const { nameTitleMenu, visible } = this.state
    return (
      <View style={[styles.containerAll]}>
        <NaviHerderFull title={'TRANG CHỦ'}
          buttonRight={true}
          nameIcon={'bell'} />

        <View style={styles.containerAll}>
          <MenuMain visible={visible}
            nameTitle={nameTitleMenu}
            showMenu={this.onShowMenu}
            hideMenu={this.hideMenu}
            dataMenu={dataMenu}
          />
          <View style={styles.containetText}>
            <View style={[styles.containerKeyAll, { marginLeft: 10, backgroundColor: '#FE2E2E' }]}>
              <Text style={styles.txtTitle}>Tổng key</Text>
              <Text style={styles.txtValue}>200</Text>
            </View>
            <View style={[styles.containerKeyAll, { marginHorizontal: 10 }]} >
              <Text style={styles.txtTitle}>Doanh số</Text>
              <Text style={styles.txtValue}>20,000,000,000</Text>
            </View>
            <View style={[styles.containerKeyAll, { marginRight: 10, backgroundColor: '#F7941D' }]} >
              <Text style={styles.txtTitle}>Doanh số đã duyệt</Text>
              <Text style={styles.txtValue}>200</Text>
            </View>
          </View>
          <ChartTest />
      
          <TabView nameTitle={'Doanh số theo'}/>
          <TabView nameTitle={'Tiện ích'}/>

        </View>

      </View>
    )
  }

};

export default Main;

const styles = StyleSheet.create({
  containerAll: {
    flex: 1,
    backgroundColor: '#F2F2F2'
  },
  txtTitle: {
    color: '#fff',
    fontSize: 12,
    paddingTop: 10
  },
  txtValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    paddingTop: 5,
    paddingBottom: 10
  },
  containerKeyAll: {
    flex: 1,
    backgroundColor: '#0101DF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtFirst: {
    fontSize: 15,
    fontWeight: '600',
    paddingVertical: 10,
    marginLeft: 20,
  },
  containerKeyAll2: {
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red'
  },
  containetText: {
    flexDirection: 'row',
    marginBottom: 10
  },
  containerFirst: {
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10
  }

});
