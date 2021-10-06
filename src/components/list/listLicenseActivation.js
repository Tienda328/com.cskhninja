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
    const { dataRestKey, onChangeText, clickSearch } = this.props
    return (
      <View style={{ backgroundColor: "#f2f2f2", paddingTop: 10, }}>
        <Search style={{ marginBottom: 15, }}
          onChangeText={onChangeText}
          clickSearch={clickSearch}
        />
        {dataRestKey[0] !== undefined ? dataRestKey.map((item, index) => {
          return (
            <View
              style={styles.containerAll}
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
                      <Text style={[styles.txtRight, { color: item.approve ? '#2E64FE' : 'red' }]} numberOfLines={1}>{item.price ? common.formatNumber(pricenew) : '0 đ'}</Text>
                      <Text style={[styles.txtRight]} numberOfLines={1}>{item.conlai ? item.conlai + ' ngày' : '0 ngày'}</Text>
                    </View>
                    <TouchableOpacity >
                      <MaterialCommunityIcons name={'sale'} size={20} style={{ marginRight: 10, color: 'gray' }} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

            </View>
          )
        }) : (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Không có dữ liệu</Text></View>)}
      </View>
    );
  }
}
