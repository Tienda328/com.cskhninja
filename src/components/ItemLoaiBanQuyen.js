import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

export default function ItemLoaiBanQuyen({ item, onPress, index }) {
    const itemIndex = index+1
    return (
        <TouchableOpacity onPress={onPress} >
           <View style={styles.btnModal}>
           <Text style={styles.txtSTT}>{`${itemIndex}.`}</Text>
            <Text style={styles.txtSelect}>{item.name ? item.name : ''}</Text>
           </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    txtSelect: {
        // textAlign: 'center',
        marginLeft: 10,
        paddingVertical: 10,
        flex:1,
        borderBottomColor: '#D8D8D8',
        borderBottomWidth: 0.5,
    },
    btnModal:{
        flexDirection:'row',
        alignItems:'center'
    },
    txtSTT:{
        marginLeft:10
    },
    viewHeight: {
        height: 0.5,
        backgroundColor: 'gray'
    }

})