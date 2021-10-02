import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const windowHeight = Dimensions.get('window').height;

export default function ItemDisaBle({ styleWith, statusError, isError, value, nameIcon }) {
    return (
        <View>
            <View>
                <View style={[styles.containerInput]}>
                    <MaterialCommunityIcons name={nameIcon} size={20} style={{ color: 'gray', marginLeft: 20 }} />
                    <View style={[styles.container, styleWith]}>
                        <Text style={styles.txtValue}>{value}</Text>
                    </View>
                </View>

            </View>
            {isError ? <Text style={styles.txtError}> {statusError}</Text> : <View style={styles.bottomKey} />}
        </View>
    );
}

const styles = StyleSheet.create({
    containerInput: {
        flexDirection: 'row',
        height: windowHeight / 17.8,
        backgroundColor: '#fff',
        alignItems: 'center',
        marginBottom:1
    },
    bottomKey: {
        // height: 20
    },
    container: {
        flex: 1,
        marginLeft: 20,
        height: windowHeight / 17.8,
        borderBottomColor: '#D8D8D8',
        justifyContent: 'center',
        borderBottomWidth: 0.5,
    },
    txtValue: {
        color: 'gray',
    },
    txtError: {
        color: 'red',
        fontSize: 12,
        marginVertical: 8,
        marginLeft: 25
    },
    input: {
        marginLeft: 10,
        fontSize: 14,
        fontWeight: '300'
    },

    txtName: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 6,
        marginLeft: 20,
    },


})