import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ItemDetailIcon({ nameIcon, txtValue,isIconRight, style,colorss, containerText, iconRight }) {
    return (
        <View style={styles.containerAll}>
             <MaterialCommunityIcons name={nameIcon} size={20} style={{ color: colorss?'#2E64FE':'gray', marginLeft:20 }} />
           <View style={[styles.containerText, containerText]}>
           <Text style={[styles.txtValue,style]} > {txtValue}</Text>
          {isIconRight ?  <MaterialCommunityIcons name={iconRight} size={20} style={{ color: colorss?'#2E64FE':'gray', marginRight:20 }} />: null}
           </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerAll:{
        flexDirection:'row',
      
        alignItems:'center'
    },
    containerText:{
        flex:1,
        marginLeft:20,
        borderBottomWidth:1,
        borderBottomColor:'gray',
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row'
    },
    txtValue:{
        color:"#000",
        paddingVertical:10,
        fontSize:15,
        fontWeight:'400',
    }
})