import React, { useState } from 'react';

import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';


export default function MeneMain({ modalVisible, ClickShow, ClickHide, nameTitle, dataMenu, style }) {
    return (
        <View >
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={[styles.containerModal, style]}>
                    {dataMenu.map((item, index) => {
                        return (
                            <TouchableOpacity key={index.toString()} style={styles.btnTitle} onPress={()=>ClickHide(item)}>
                                <Text style={styles.txtTitle}>{item.title}</Text>
                            </TouchableOpacity>
                        )
                    })}

                </View>
            </Modal>
            <TouchableOpacity
                style={styles.openButton}
                onPress={ClickShow}
            >
                <Text style={styles.textStyle}>{nameTitle}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    openButton: {
        backgroundColor:'red',
        backgroundColor:'#fff',
        paddingVertical:10,
        borderRadius:10,
        marginVertical:10,
    },
    textStyle:{
        marginLeft:20
    },
    txtTitle:{
        fontSize:13,
        paddingVertical:10,
        textAlign:'center'
    },
    btnTitle:{
        borderBottomColor: '#D8D8D8',
        borderBottomWidth: 0.5,
    },
    containerModal: {
        width: 150,
        marginTop: 45,
        backgroundColor: '#fff',
        shadowColor: '#000',
        borderRadius: 10,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginLeft: 20
    }

});