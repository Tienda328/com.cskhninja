import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Dimensions,
    Image
} from 'react-native';
import styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const windowHeight = Dimensions.get('window').height;

const DATA = [
    {
      id: 'bd7acbea-c1b1-4w6c2-aed5-3ad53abb28ba',
      title: 'First Item',
      type:1
    },
    {
      id: '3ac68afc-c605-rwe-a4f8-fbd91aa97f63',
      title: 'Second Item',
      type:1
    },
    {
      id: '58694a0f-3da1-rwe-bd96-145571e29d72',
      title: 'Third Item',
      type:2
    },
    {
        id: 'bd7acbea-c1b1-4rwe6c2-aed5-3ad53abb28ba',
        title: 'First Item',
        type:1
      },
      {
        id: '3ac68afc-c605-wr-a4f8-fbd91aa97f63',
        title: 'Second Item',
        type:1
      },
      {
        id: '58694a0f-3da1-4rwer71f-bd96-145571e29d72',
        title: 'Third Item',
        type:1
      },
      {
        id: 'bd7acbea-c1b1-46c2-aerwerd5-3ad53abb28ba',
        title: 'First Item',
        type:1
      },
      {
        id: '3ac68afc-c605-48d3-arwe4f8-fbd91aa97f63',
        title: 'Second Item',
        type:1
      },
      {
        id: '58694a0f-3da1-471f-bd96-re145571e29d72',
        title: 'Third Item',
        type:1
      },
      {
        id: 'bd7acbea-c1b1-4q6c2-aed5-3ad53abb28ba',
        title: 'First Item',
        type:1
      },
      {
        id: '3ac68afc-c605-48dq3-a4f8-fbd91aa97f63',
        title: 'Second Item',
        type:1
      },
      {
        id: '58694a0f-3da1-4q71f-bd96-145571e29d72',
        title: 'Third Item',
        type:1
      },

      {
        id: 'bd7acbea-c1b1q-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
        type:1
      },
      {
        id: '3ac68afc-weqc605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
        type:1
      },
      {
        id: '58694wea0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
      },
  ];
  export default class ListResetPassWord extends React.Component {

   render(){
    return (
        <View style={{backgroundColor:"#f2f2f2", paddingTop:10,}}>
            {DATA.map((item, index) => {
                        return (
                          <View style={styles.containerItem} key={index.toString()}>
                          <Text style={styles.txtStt}>{index+1}</Text>
                          {item.type===1?  <Image
                                   style={{width:20,height:20,marginRight:5}}
                                   source={require('../../resource/image/icon-product.png')}
                                 />:
                                 <Image
                                 style={{width:20,height:20,marginRight:5 }}
                                 source={require('../../resource/image/icon_servic.png')}
                               />}
                               <View style={styles.containerName}>
                               <Text style={styles.txtTitle} numberOfLines={1}>gsddsgsg</Text>
                               <Text style={{marginRight:20, width:100}} numberOfLines={1}>1,000,000,000,000 d</Text>
                               </View>
                      </View>
                        )
                    })}
        </View>
    );
   }
}