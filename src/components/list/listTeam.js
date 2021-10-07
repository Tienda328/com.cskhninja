import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';
import common from '../../utils/common';
const windowHeight = Dimensions.get('window').height;

export default class ListRating extends React.Component {
  render() {
    const { dataTeam,heightS } = this.props
    return (
      <View style={{ backgroundColor: "#f2f2f2", paddingTop: 10,flex:1 }}>
        {dataTeam[0]!==undefined? dataTeam.map((item, index) => {
          return (
            <View style={styles.containerItem} key={index.toString()}>
              <Text style={styles.txtStt}>{index + 1}</Text>

              <Image
                style={{ width: 20, height: 20, marginRight: 5 }}
                source={require('../../resource/image/icon_servic.png')}
              />
              <View style={styles.containerName}>
                <Text style={styles.txtTitle} numberOfLines={1}>{item.name ? item.name : ''}</Text>
                <View style={{ flexDirection: "row", width: 120}}>
                  <Text style={{ flex: 1 }} />
                  <Text style={{ marginRight: 20, }} numberOfLines={1}>{item.money ? common.formatNumber(item.money) : '0 đ'}</Text>
                </View>
              </View>
            </View>
          )
        }):(<View style={{flex:1, justifyContent:'center',height:heightS, alignItems:'center'}}><Text>Không có dữ liệu</Text></View>)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerInput: {
    flexDirection: 'row',
    height: windowHeight / 17.8,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginBottom: 1
  },
  txtTitle: {
    width: 160,
    fontSize: 13,
    fontWeight: '400'
  },
  containerName: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  txtStt: {
    marginHorizontal: 10,
    textAlign: 'center'
  },
  containerItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginBottom: 11,
    borderRadius: 10,
    marginHorizontal: 10,

  }

})