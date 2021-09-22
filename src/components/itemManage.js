import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

export default function ItemManage({ navigation, item }) {
    
    const clickItem =(item)=>{
        navigation.navigate('DetailKeyScreen',{item})
    }

    return (
        <TouchableOpacity
            style={styles.containerAll}
            onPress={()=>clickItem(item)}>
            <View style={styles.containerText}>
                <View style={{width:130}}>
                    <Text style={styles.txtLeft} numberOfLines={1}>{item.customername?item.customername:''}</Text>
                    <Text style={[styles.txtLeft]} numberOfLines={1}>{item.customeremail?item.customeremail:''}</Text>
                    <Text style={styles.txtLeft} numberOfLines={1}>{item.customerphone?item.customerphone:''}</Text>
                </View>
                <View style={{width:130}}>
                    <Text style={styles.txtRight} numberOfLines={1}>{item.productName?item.productName:''}</Text>
                    <Text style={styles.txtRight} numberOfLines={1}>{item.price?item.price:''}</Text>
                    <Text style={styles.txtRight} numberOfLines={1}>{item.expirationdate?item.expirationdate:''}</Text>
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