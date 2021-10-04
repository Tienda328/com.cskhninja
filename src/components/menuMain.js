import React, { useState } from 'react';

import { View, Text, StyleSheet } from 'react-native';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';



export default function App({hideMenu, showMenu, nameTitle, visible, dataMenu}) {
 
    return (
        <View >
            <Menu
                visible={visible}
                anchor={<View style={styles.containerFirst}>
                    <Text onPress={showMenu} style={styles.txtFirst}>{nameTitle}</Text>
                </View>}
                onRequestClose={hideMenu}
            >
                {dataMenu.map((item, index) => {
                    return (
                        <MenuItem key={index.toString()} onPress={() => hideMenu(item)}>{item.title}</MenuItem>
                    )
                })}
            </Menu>
        </View>
    );
}

const styles = StyleSheet.create({
    txtFirst: {
        fontSize: 15,
        fontWeight: '600',
        paddingVertical: 10,
        marginLeft: 20,
    },
    containerFirst: {
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 10
    }

});