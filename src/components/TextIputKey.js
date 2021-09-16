import React from 'react';
import {
    View,
    Text,
    TextInput,
    Dimensions,
    StyleSheet
} from 'react-native';
const windowHeight = Dimensions.get('window').height;

export default function TextInputKey({ nameText, statusError, placeholder, value, isError, onChangeText }) {
    return (
        <View>
            <View
                style={[
                    styles.containerInput,
                ]}>
                <Text style={styles.txtName}>{nameText}</Text>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                />

            </View>
            {isError ? <Text style={styles.txtError}> {statusError}</Text> : <View style={styles.bottomKey} />}
        </View>
    );
}

const styles = StyleSheet.create({
    containerInput: {
        // height: 70,
        height: windowHeight / 10,
        paddingLeft: 6,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowRadius: 6,
        shadowOpacity: 0.16,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        elevation: 8,
        backgroundColor: "#fff",
        marginHorizontal: 20,
    },
    bottomKey: {
        height: 20
    },
    txtError: {
        color: 'red',
        fontSize: 13,
        marginVertical: 5,
        marginLeft: 25
    },
    input: {
        height: windowHeight / 21,
        color: '#000000',
        fontSize: 14,
        fontWeight:'300'
    },
    
    txtName: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 6,
        marginLeft: 3,
        marginTop: 10,
    },


})