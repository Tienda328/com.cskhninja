import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

export default function ItemLoaiBanQuyen({ item, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={styles.txtSelect}>{item.name ? item.name : ''}</Text>
            <View style={styles.viewHeight} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    txtSelect: {
        textAlign: 'center',
        paddingVertical: 10

    },
    viewHeight: {
        height: 1,
        backgroundColor: 'gray'
    }

})