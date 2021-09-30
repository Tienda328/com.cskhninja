import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native';

export default function ItemCustomer({ index, onPress, navigation, item }) {
    
    const clickItem =(item)=>{
        navigation.navigate('DetailCustomerScreen',{item})
    }
    const itemIndex =index+1
    return (
        <TouchableOpacity
            style={styles.containerAll}
            onPress={()=>clickItem(item)}>
            <View style={styles.containerText}>
                <View style={styles.container}>
               <View style={{justifyContent:'center'}}>
               <Image
                    style={{width:35,height:35, marginHorizontal:20}}
                    source={require('../resource/image/icon_user.png')}
                  />
               </View>
                <View>
                    <Text style={styles.txtLeft}> {itemIndex}</Text>
                    <Text style={styles.txtLeft}>{item.name? item.name: ''}</Text>
                    {/* <Text style={styles.txtLeft}> </Text> */}

                </View>
                </View>
                <View>
                    <Text numberOfLines={1} style={styles.txtRight}>{item.email? item.email: ''}</Text>
                   <View style={styles.viewContainer}>
                    <View style={{flex:1}} />
                   <Text style={styles.txtRight}>{item.phone? item.phone: ''}</Text>       
                 </View>
  
                </View>
            </View>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    containerAll: {
        backgroundColor: '#fff',
        marginBottom: 20,
        flex: 1,
    },
    container:{
        flexDirection:'row',
    },
    viewContainer:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    txtLeft: {
        fontSize: 14,
        fontWeight: '500',
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
        paddingVertical:5,
        justifyContent: 'space-between'
    }

})