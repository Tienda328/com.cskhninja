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
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function Search({ value,showFilter, onChangeText, style, onPressFilter,clickSearch }) {
    return (
        <View style={[styles.containerALL, style]}>
          
        <View style={[styles.container]}>
        <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={value}
                placeholder={'Tìm kiếm ...'}
            />
              <TouchableOpacity onPress={clickSearch}>
              <MaterialCommunityIcons name={'magnify'} size={25} style={styles.iconSearch} />
              </TouchableOpacity>
        </View>
       {showFilter ?  <TouchableOpacity style={styles.containerFilter} onPress={onPressFilter}>
        <MaterialCommunityIcons name={'filter-menu-outline'} size={25} style={styles.iconBoLoc} />
        </TouchableOpacity>:<View/>}
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        margin: 12,
        padding: 10,
        flex:1,
        height: windowHeight/17.8,
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
        height: windowHeight/20,
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
        height:windowHeight/20, 
        width:windowWidth/10,
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