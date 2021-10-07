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

export default function TextInputKey({ keyboardType, statusError, styleInput, placeholder, value, isError, onChangeText, editable, nameIcon }) {
    return (
        <View>
            <View>

                {/* <Text style={styles.txtName}>{nameText}</Text> */}
                <View style={[styles.containerInput, { backgroundColor: editable ? '#fff' : '#D8D8D8' }]}>
                    <MaterialCommunityIcons name={nameIcon} size={20} style={{ color: 'gray', marginLeft: 20 }} />
                    <TextInput
                        editable={editable}
                        style={[styles.input, styleInput]}
                        placeholder={placeholder}
                        value={value}
                        onChangeText={onChangeText}
                        keyboardType={keyboardType}
                    />
                </View>

            </View>
            {isError && statusError !== '' ? <Text style={styles.txtError}> {statusError}</Text> : <View style={styles.bottomKey} />}
        </View>
    );
}

const styles = StyleSheet.create({
    containerInput: {
        flexDirection: 'row',
        height: windowHeight / 17.8,
        alignItems: 'center',
        backgroundColor: "#fff",
        marginBottom: 1,
    },
    bottomKey: {
        // height: 20
    },
    txtError: {
        color: '#FF0000',
        fontSize: 13,
        marginVertical: 5,
        marginLeft: 25
    },
    input: {
        marginLeft: 20,
        color:"gray",
        fontSize:15,
        fontSize: 14,
        fontWeight:'400',
        width: '100%',
        borderBottomWidth: 0.5,
        borderBottomColor: '#D8D8D8',
        marginTop: isIos ? 15 : 0,
    },
    txtName: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 6,
        marginLeft: 20,
    },


})