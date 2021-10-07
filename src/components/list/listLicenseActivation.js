import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import common from '../../utils/common';
import Search from '../search';
export default class ListLicenseActivation extends React.Component {

  render() {
    const { dataRestKey, onChangeText, clickSearch,value,heightS, clickReset } = this.props
    return (
      <View style={{ backgroundColor: "#f2f2f2", paddingTop: 10,flex:1 }}>
        <Search style={{ marginBottom: 15, marginTop:0}}
          onChangeText={onChangeText}
          clickSearch={clickSearch}
          value={value}
        />
        {dataRestKey[0] !== undefined ? dataRestKey.map((item, index) => {
          return (
            <TouchableOpacity
              style={styles.containerAll}
              onPress={()=>clickReset(item)}
              key={index.toString()}>
              <View style={styles.containerText}>
                <View style={styles.containerLeft}>
                  <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>

                    <Text style={{ width: 40, textAlign: 'center', }} numberOfLines={1}> {index + 1}</Text>

                    {item.type === 1 ? <Image
                      style={{ width: 20, height: 20, marginRight: 5 }}
                      source={require('../../resource/image/icon-product.png')}
                    /> :
                      <Image
                        style={{ width: 20, height: 20, marginRight: 5 }}
                        source={require('../../resource/image/icon_servic.png')}
                      />}
                  </View>

                  <View>
                    <Text style={styles.txtLeft} numberOfLines={1}>{item.customername ? item.customername : ''}</Text>
                    <Text style={[styles.txtLeftEmail]} numberOfLines={1}>{item.customeremail ? item.customeremail : ''}</Text>
                    <Text style={styles.txtLeftEmail} numberOfLines={1}>{item.productName ? item.productName : ''}</Text>
                  </View>
                </View>
                <View >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <View>
                      <Text style={styles.txtRight} numberOfLines={1}>{item.saledate ? common.formatDate2(item.saledate) : ''}</Text>
                      <Text style={[styles.txtRight, { color: item.approve ? '#0000FF' : '#FF0000' }]} numberOfLines={1}>{item.price ? common.formatNumber(pricenew) : '0 đ'}</Text>
                      <Text style={[styles.txtRight]} numberOfLines={1}>{item.conlai ? item.conlai + ' ngày' : '0 ngày'}</Text>
                    </View>
                    <View >
                      <MaterialCommunityIcons name={'lock-reset'} size={20} style={{ marginRight: 10, color: '#FF8000' }} />
                    </View>
                  </View>
                </View>
              </View>

            </TouchableOpacity>
          )
        }) : (<View style={{ flex: 1, justifyContent: 'center',height:heightS, alignItems: 'center' }}><Text>Không có dữ liệu</Text></View>)}
      </View>
    );
  }
}
