import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native';

export default function ItemCustomer({ index, onPress, navigation, item }) {

    const clickItem = (item) => {
        navigation.navigate('DetailCustomerScreen', { item })
    }
    const itemIndex = index + 1
    return (
        <TouchableOpacity
            style={styles.containerAll}
            onPress={() => clickItem(item)}>
            <View style={styles.containerText}>
                <View style={styles.container}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>

                        <Text style={{ marginLeft: 10 }}> {itemIndex}</Text>

                        <Image
                            style={{ width: 35, height: 35, marginHorizontal: 10 }}
                            source={require('../resource/image/icon_user.png')}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>


                        <View style={{ marginLeft: 10 }}>
                            <Text style={[styles.txtLeft]} numberOfLines={1} >{item.name ? item.name : ''}</Text>
                            <Text numberOfLines={1} style={[styles.txtPhone]}>{item.email ? item.email : ''}</Text>
                            <Text style={styles.txtPhone}>{item.phone ? item.phone : ''}</Text>
                        </View>
                        {/* <View style={{ marginRight:10 }}>
                            <Text style={styles.txtPrice}>{item.phone ? item.phone : ''}</Text>
                        </View> */}

                    </View>
                </View>
                <View>


                </View>
            </View>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    containerAll: {
        backgroundColor: '#fff',
        marginBottom: 10,
        flex: 1,
    },
    container: {
        flexDirection: 'row',
        flex: 1
    },
    txtPrice: {
        color: '#0000FF'
    },
    viewContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    txtLeft: {
        fontSize: 14,
        fontWeight: '500',
        paddingVertical: 5,
    },
    txtPhone: {
        fontSize: 14,
        fontWeight: '500',
        paddingVertical: 5,
        width: 190,
        fontSize: 12,
        color: '#2E2E2E'
    },
    txtRight: {
        fontSize: 14,
        fontWeight: '500',
        marginRight: 20,
        paddingVertical: 5,
        color: '#0000FF'
    },
    containerText: {
        flexDirection: 'row',
        paddingVertical: 5,
        justifyContent: 'space-between'
    }

})