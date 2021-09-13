import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import ItemFlexRow from './itemFlexRow'

export default function ItemCustomer({ nameLoai, onPress }) {
    return (
        <View 
        style={styles.containerAll}
        onPress={onPress}>
            <View>
               
                <ItemFlexRow txtName={'Email'} txtValue ={'hoatv@ninjateam.vn'} />
                <ItemFlexRow txtName={'Số Điện Thoại'} txtValue ={'0979090897'} />
                <ItemFlexRow txtName={'DateCreate'} txtValue ={'5/5/2018'} />
                <ItemFlexRow txtName={'Point'} txtValue ={'1000000'} />
                <ItemFlexRow txtName={'Token'} txtValue ={'E7B2C2EC6FF08CEEC753855DD18B6D8C'} style={{width:130}} />
                <ItemFlexRow txtName={'Status'} txtValue ={'Active'} />
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    containerAll: {
        backgroundColor:'red',
        marginTop:10,
        flex:1,
        marginHorizontal:20,
        borderRadius:20,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowRadius: 6,
        shadowOpacity: 0.16,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        elevation: 8,

    },

})