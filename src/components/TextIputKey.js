import React from 'react';
import {
    View,
    Text,
    TextInput,
    Dimensions,
    StyleSheet
} from 'react-native';
const windowHeight = Dimensions.get('window').height;

export default function TextInputKey({ nameText, statusError, placeholder, value, isError, onChangeText, editable }) {
    return (
        <View>
            <View>
                <Text style={styles.txtName}>{nameText}</Text>
                <View style={[styles.containerInput,{backgroundColor:editable?'#fff':'#D8D8D8'}]}>
                <TextInput
                    editable={editable}
                    style={styles.input}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                />
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
        shadowRadius: 6,
        shadowOpacity: 0.16,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        elevation: 3,
        backgroundColor: "#fff",
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