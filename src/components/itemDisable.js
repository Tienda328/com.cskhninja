import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';
const windowHeight = Dimensions.get('window').height;

export default function ItemDisaBle({ nameText, statusError, isError, value }) {
    return (
        <View>
            <View>
                <Text style={styles.txtName}>{nameText}</Text>
                <View style={[styles.containerInput]}>
               <Text style={styles.txtValue}>{value}</Text>
                </View>

            </View>
            {isError ? <Text style={styles.txtError}> {statusError}</Text> : <View style={styles.bottomKey} />}
        </View>
    );
}

const styles = StyleSheet.create({
    containerInput: {
        height: windowHeight/17.8,
        shadowColor: '#000',
        marginHorizontal:20,
        borderRadius:10,
        justifyContent:'center',
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
        color:'#6E6E6E'
    },
    txtError: {
        color: 'red',
        fontSize: 13,
        marginVertical: 5,
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