import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

export default function ItemManage({ nameLoai, onPress, navigation }) {
    
    const clickItem =()=>{
        navigation.navigate('DetailKeyScreen')
    }

    return (
        <TouchableOpacity
            style={styles.containerAll}
            onPress={clickItem}>
            <View style={styles.containerText}>
                <View>
                    <Text style={styles.txtLeft}>Tên khách hàng</Text>
                    <Text style={styles.txtLeft}>Email</Text>
                    <Text style={styles.txtLeft}>Số điện thoại</Text>
                </View>
                <View>
                    <Text style={styles.txtRight}>Tên sản phẩm</Text>
                    <Text style={styles.txtRight}>giá</Text>
                    <Text style={styles.txtRight}>Ngày đến hạn</Text>
                </View>
            </View>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    containerAll: {
        backgroundColor: '#fff',
        marginTop: 10,
        flex: 1,
        marginHorizontal: 20,
        borderRadius: 10,
        // borderColor: '#fff',
        shadowColor: '#000',
        shadowRadius: 6,
        shadowOpacity: 0.16,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        elevation: 3,

    },
    txtLeft: {
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 20,
        paddingVertical: 5,
    },
    txtRight: {
        fontSize: 14,
        fontWeight: '500',
        marginRight: 20,
        paddingVertical: 5,
    },
    containerText: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }

})