import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const windowHeight = Dimensions.get('window').height;

export default function ItemDisaBle({ nameText, statusError, isError, value, nameIcon }) {
    return (
        <View>
            <View>
                <View style={[styles.containerInput]}>
                <MaterialCommunityIcons name={nameIcon} size={20} style={{ color: 'gray', marginLeft:20 }} />
               <Text style={styles.txtValue}>{value}</Text>
                </View>

            </View>
            {isError ? <Text style={styles.txtError}> {statusError}</Text> : <View style={styles.bottomKey} />}
        </View>
    );
}

const styles = StyleSheet.create({
    containerInput: {
        flexDirection:'row',
        height: windowHeight/17.8,
        shadowColor: '#000',
        marginHorizontal:20,
        borderRadius:10,
        alignItems:'center',
        shadowRadius: 6,
        shadowOpacity: 0.16,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        elevation: 3,
        backgroundColor: "#D8D8D8",
    },
    bottomKey: {
        height: 20
    },
    txtValue:{
        marginLeft:15,
        color:'gray'
    },
    txtError: {
        color: 'red',
        fontSize: 12,
        marginVertical: 8,
        marginLeft: 25
    },
    input: {
        marginLeft:10,
        fontSize: 14,
        fontWeight:'300'
    },
    
    txtName: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 6,
        marginLeft: 20,
    },


})