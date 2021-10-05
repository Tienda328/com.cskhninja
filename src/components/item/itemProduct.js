import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
export default function ItemProduct({ navigation, item, indexProduct }) {

    return (
        <TouchableOpacity
        >
            <View style={styles.containerItem} >
                <Text style={styles.txtStt}>{ 1}</Text>
                {item.type === 1 ? <Image
                    style={{ width: 20, height: 20, marginRight: 5 }}
                    source={require('../../resource/image/icon-product.png')}
                /> :
                    <Image
                        style={{ width: 20, height: 20, marginRight: 5 }}
                        source={require('../../resource/image/icon_servic.png')}
                    />}
                <View style={styles.containerName}>
                    <Text style={styles.txtTitle} numberOfLines={1}>gsddsgsg</Text>
                    <Text style={{ marginRight: 20, color: 'red' }} numberOfLines={1}>1,000,000,000,000 d</Text>
                </View>
            </View>

        </TouchableOpacity>
    );
}
