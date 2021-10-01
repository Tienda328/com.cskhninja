import React from 'react';
import {
    View,
    Text,
    TextInput,
    Dimensions,
    StyleSheet,
    Platform
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const windowHeight = Dimensions.get('window').height;
const isIos = Platform.OS === 'ios';

export default function TextInputKey({ keyboardType, statusError, placeholder, value, isError, onChangeText, editable, nameIcon }) {
    return (
        <View>
            <View>
              
                {/* <Text style={styles.txtName}>{nameText}</Text> */}
                <View style={[styles.containerInput, { backgroundColor: editable ? '#fff' : '#D8D8D8' }]}>
                <MaterialCommunityIcons name={nameIcon} size={20} style={{ color: 'gray', marginLeft:20 }} />
                    <TextInput
                        editable={editable}
                        style={styles.input}
                        placeholder={placeholder}
                        value={value}
                        onChangeText={onChangeText}
                        keyboardType={keyboardType}
                    />
                </View>

            </View>
            {isError ? <Text style={styles.txtError}> {statusError}</Text> : <View style={styles.bottomKey} />}
        </View>
    );
}

const styles = StyleSheet.create({
    containerInput: {
        flexDirection:'row',
        height: windowHeight / 17.8,
        shadowColor: '#000',
        marginHorizontal: 20,
        alignItems:'center',
        borderRadius: 10,
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
        marginVertical: 8,
        marginLeft: 25
    },
    input: {
        marginLeft: 10,
        fontSize: 14,
        width:'85%',
        marginTop: isIos ? 15 : 0,
        fontWeight: '300'
    },

    txtName: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 6,
        marginLeft: 20,
    },


})