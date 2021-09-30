import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export default function ItemFlexRow({ txtName, txtValue, style, styleColour }) {
    return (
        <View style={styles.containerAll}>
            <Text style={[styles.txtName, styleColour]}> {txtName}</Text>
          <View style={styles.viewContainer}>
            <Text/>
          <Text style={[styles.txtValue,style]} > {txtValue}</Text>
          </View>
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
    viewContainer:{
        width:160,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    viewFlex1:{
        flex:1,
    },

    txtName:{
        marginLeft:20,
        fontSize:16,
        paddingVertical:8,
        fontWeight:'600',
    },
    txtValue:{
        color:"#000",
        marginRight:20,
        paddingVertical:8,
        fontSize:15,
        fontWeight:'400',
    }
})