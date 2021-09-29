import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import common from '../utils/common';
export default function ItemManage({ navigation, item }) {
    
    const clickItem =(item)=>{
        navigation.navigate('DetailKeyScreen',{item})
    }

    return (
        <TouchableOpacity
            style={styles.containerAll}
            onPress={()=>clickItem(item)}>
            <View style={styles.containerText}>
                {/* <View> <Text>dsd</Text></View> */}
                <View style={{width:130}}>
                    <Text style={styles.txtLeft} numberOfLines={1}>{item.customername?item.customername:''}</Text>
                    <Text style={[styles.txtLeft]} numberOfLines={1}>{item.customeremail?item.customeremail:''}</Text>
                    <Text style={styles.txtLeft} numberOfLines={1}>{item.customerphone?item.customerphone:''}</Text>
                </View>
                <View style={{width:130,}}>
                    <Text style={styles.txtRight} numberOfLines={1}>{item.productName?item.productName:''}</Text>
                    <View style={{flexDirection:'row',alignItems:'center'}}> 
                   {item.status===0? <MaterialCommunityIcons name={'checkbox-blank-outline'} size={20} style={{ color: '#FE2E2E' }} />:
                    <MaterialCommunityIcons name={'checkbox-intermediate'} size={20} style={{ color: '#00FF00' }} />}
                        <Text style={[styles.txtRight,{marginLeft:10}]} numberOfLines={1}>{item.price?common.formatNumber(item.price):''}</Text>            
                    </View>
                    <Text style={styles.txtRight} numberOfLines={1}>{item.expirationdate?common.formatDate(item.expirationdate):''}</Text>
                </View>
            </View>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    containerAll: {
        backgroundColor: '#fff',
        flex: 1,
        marginHorizontal: 20,
        borderRadius: 10,
        borderColor: '#BDBDBD',
        borderWidth:1,
        shadowColor: '#000',
        shadowRadius: 6,
        shadowOpacity: 0.16,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        elevation: 3,
        marginBottom:15,
    },
    txtLeft: {
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 20,
        paddingVertical: 5,
    },
    txtRight: {
        fontSize: 14,
        fontWeight: '500',
        marginRight: 20,
        paddingVertical: 5,
    },
    containerText: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }

})