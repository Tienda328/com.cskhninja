import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import common from '../utils/common';
export default function ItemManage({ navigation, item, index ,isclick}) {

    const ItemIndex =index +1;
    const clickItem =(item)=>{
        if(!isclick){
            navigation.navigate('DetailKeyScreen',{item})
        }
       
    }
    const pricenew =item.price -item.discount
   
    return (
        <TouchableOpacity
            style={styles.containerAll}
            onPress={()=>clickItem(item)}>
            <View style={styles.containerText}>
                <View style={styles.containerLeft}>
             <View style={{ justifyContent: 'center' ,alignItems:'center',flexDirection:'row'}}>
                
                <Text style={{marginLeft:10}}> {ItemIndex}</Text>
                
             {item.type===1?  <Image
                      style={{width:40,height:40,marginHorizontal:5}}
                      source={require('../resource/image/icon-product.png')}
                    />:
                    <Image
                    style={{width:40,height:40,marginHorizontal:5 }}
                    source={require('../resource/image/icon_servic.png')}
                  />}
             </View>

                   <View> 
                   <Text style={styles.txtLeft} numberOfLines={1}>{item.customername?item.customername:''}</Text>
                   <Text style={[styles.txtLeftEmail]} numberOfLines={1}>{item.customeremail?item.customeremail:''}</Text>
                    <Text style={styles.txtLeftEmail} numberOfLines={1}>{item.productName?item.productName:''}</Text>
                   </View>
                </View>
                <View >
                  <View style={{flexDirection:'row'}}>
                      <Text style={{flex:1}} />
                  <Text style={styles.txtRight} numberOfLines={1}>{item.expirationdate?common.formatDate2(item.expirationdate):''}</Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                      <Text style={{flex:1}} />
                      <Text style={[styles.txtRight,{color:item.approve? '#2E64FE':'red'}]} numberOfLines={1}>{item.price?common.formatNumber(pricenew):'0 đ'}</Text>            
                  </View>
                  <View style={{flexDirection:'row'}}>
                      <Text style={{flex:1}} />
                      <Text style={[styles.txtRight]} numberOfLines={1}>{item.conlai?item.conlai+ ' ngày':'0 ngày'}</Text>            
                  </View>                  
                   
                </View>
            </View>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    containerAll: {
        backgroundColor: '#fff',
        flex: 1,
        marginBottom:10,
    },
    containerLeft:{
        // alignItems:'center',
        flexDirection:'row'
    },
    txtLeft: {
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 5,
        paddingVertical: 5,
        width:180
    },
    txtLeftEmail:{
        fontSize: 12,
        color:'#2E2E2E',
        marginLeft: 5,
        paddingVertical: 5,
        width:180
    },
    txtRight: {
        fontSize: 14,
        fontWeight: '500',
        marginRight: 20,
        paddingVertical: 5,
    },
    containerText: {
        flexDirection: 'row',
        paddingVertical:5,
        justifyContent: 'space-between'
    }

})