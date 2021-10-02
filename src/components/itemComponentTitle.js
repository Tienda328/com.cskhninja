import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
export default function ItemComponentTitle({ drawIconLeft, nameTitle}) {
    return (
        <View style={styles.containerAll}>
            <Text style={styles.txtTitleKey}>{nameTitle}</Text>
            {drawIconLeft}
         
        </View>
    );
}

const styles = StyleSheet.create({
    containerAll:{
        marginTop: 10,
        backgroundColor: "#fff",
        borderRadius:10,
    },
    txtTitleKey:{
        fontSize:15,
        fontWeight:'500',
        marginLeft:20,
        paddingVertical:10,
        borderBottomWidth:0.5,
        borderBottomColor:'#D8D8D8',
      },
    
})