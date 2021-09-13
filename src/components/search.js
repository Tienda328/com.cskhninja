import React from 'react';
import {
    View,
    Text,
    TextInput,
    Dimensions,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function Search({ value, onChangeText, style, onPressFilter }) {
    return (
        <View style={[styles.containerALL, style]}>
          
        <View style={[styles.container]}>
        <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={value}
                placeholder={'Tìm kiếm ...'}
            />
              <MaterialCommunityIcons name={'magnify'} size={25} style={styles.iconSearch} />
        </View>
        <TouchableOpacity style={styles.containerFilter} onPress={onPressFilter}>
        <MaterialCommunityIcons name={'filter-menu-outline'} size={25} style={styles.iconBoLoc} />
        </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        margin: 12,
        padding: 10,
        flex:1,
        height:40,
    },
    containerALL: {
        flexDirection: 'row',
        marginHorizontal:20,
        marginTop:25,
    },
    container: {
        flex:1,
        flexDirection: 'row',
        alignItems:'center',
        borderRadius:10,
        height:50,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    containerFilter:{
        height:50, 
        width:50,
        marginLeft:10,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    iconSearch: {
        marginRight: 20,
    },
    iconBoLoc:{
        color:'#2E64FE'
    }


})