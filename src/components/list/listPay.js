import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';
import common from '../../utils/common';
import styles from './styles';
const windowHeight = Dimensions.get('window').height;

export default class ListProduct extends React.Component {
  render() {
    const { datatBank } = this.props;
    return (
      <View style={{ backgroundColor: "#f2f2f2", paddingTop: 10,flex:1 }}>
        {/* <View style={{flex:1, justifyContent:'center', alignItems:'center'}}><Text>Không có dữ liệu</Text>
        </View> */}
      {datatBank[0]!==undefined ? datatBank.map((item, index) => {
          return (
            <View style={styles.containerItem} key={index.toString()}>
              <Text style={styles.txtStt}>{index + 1}</Text>

              <Image
                style={{ width: 20, height: 20, marginRight: 5 }}
                source={require('../../resource/image/icon_money.png')}
              />
              <View style={styles.containerName}>
                <Text style={styles.txtTitle} numberOfLines={1}>{item.name ? item.name : ''}</Text>
                <View style={{ flexDirection: "row", width: 120 }}>
                  <Text style={{ flex: 1 }} />
                  <Text style={{ marginRight: 20, }} numberOfLines={1}>{item.money ? common.formatNumber(item.money) : '0 đ'}</Text>
                </View>
              </View>
            </View>
          )
        }): (<View style={{flex:1, justifyContent:'center', alignItems:'center'}}><Text>Không có dữ liệu</Text></View>)}
      </View>
    );
  }
}
