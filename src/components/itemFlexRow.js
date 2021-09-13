import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

export default function ItemFlexRow({ txtName, txtValue, style }) {
    return (
        <View style={styles.containerAll}>
            <Text style={styles.txtName}> {txtName}</Text>
            <Text style={[styles.txtValue,style]} numberOfLines={1} > {txtValue}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    containerAll:{
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomWidth:1,
        borderBottomColor:'gray'
    },
    txtName:{
        marginLeft:20,
        fontSize:16,
        paddingVertical:5,
        fontWeight:'600',
    },
    txtValue:{
        color:"#151515",
        marginRight:20,
        paddingVertical:5,
        fontSize:15,
        fontWeight:'400',
    }
})