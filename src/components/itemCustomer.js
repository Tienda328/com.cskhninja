import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

export default function ItemCustomer({ nameLoai, onPress, navigation, item }) {
    
    const clickItem =(item)=>{
        navigation.navigate('DetailCustomerScreen',{item})
    }

    return (
        <TouchableOpacity
            style={styles.containerAll}
            onPress={()=>clickItem(item)}>
            <View style={styles.containerText}>
                <View>
                    <Text style={styles.txtLeft}>{item.name? item.name: ''}</Text>
                    <Text style={styles.txtLeft}>{item.id? item.id: ''}</Text>
                </View>
                <View>
                    <Text numberOfLines={1} style={styles.txtRight}>{item.email? item.email: ''}</Text>
                    <Text style={styles.txtRight}>{item.phone? item.phone: ''}</Text>
  
                </View>
            </View>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    containerAll: {
        backgroundColor: '#fff',
        marginBottom: 15,
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
        width:130,
    },
    containerText: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }

})