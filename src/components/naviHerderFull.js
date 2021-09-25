
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions, Platform
} from 'react-native';
import FocusAwareStatusBar from './FocusAwareStatusBar';
import colors from '../constants/colors';
import common from '../utils/common';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const isIos = Platform.OS === 'ios';
const windowHeight = Dimensions.get('window').height;
class NaviHerderFull extends React.Component {

  render() {
    const { buttonLeft, title, buttonRight, 
      textRight,
      onPressBack, nameIcon, onPressRight } = this.props
    return (
      <View style={styles.containerALl}>
        <FocusAwareStatusBar
          barStyle="light-content"
          backgroundColor={colors.colourStatus}
        />
        {buttonLeft ? <TouchableOpacity
          onPress={onPressBack}
          style={styles.bntback}
        >
          <MaterialCommunityIcons name={'chevron-left'} size={25} style={{ color: '#fff' }} />
          <Text style={styles.txtBack}>Back</Text>
        </TouchableOpacity> : <View />
        }
        <View style={[styles.containerTitle, { marginRight: buttonLeft ? 30 : 0, marginLeft: buttonRight ? 10 : 0 }]}>
          <Text style={styles.txtTitle}>{title}</Text>
        </View>
        {buttonRight ? <TouchableOpacity
        onPress={onPressRight}
          style={styles.bntEdit}
        >
           <MaterialCommunityIcons name={nameIcon} size={20} style={styles.iconAdd} />
          <Text style={styles.TxtEdit}>{textRight}</Text> 
         
         
        </TouchableOpacity> : <View />
        }

      </View>
    )
  }

};
export default NaviHerderFull;

const styles = StyleSheet.create({ 
  containerALl: {
    height: windowHeight/17.8,
    flexDirection: 'row',
    marginTop: isIos ? common.getStatusBarHeight() + 12 : 0,
    backgroundColor: '#013ADF',
    justifyContent: 'space-between'
  },
  iconAdd:{ color: '#fff' },
  TxtEdit: {
    color: '#fff',
    marginLeft:3
  },
  txtBack:{
    color:'#fff'
  },
  bntEdit: {
    flexDirection:'row',
    alignItems: 'center',
    marginRight:5,
  },
  containerTitle: {
    justifyContent: 'center',
    textAlign: 'center',
    alignContent: 'center'
  },
  bntback: {
    alignItems: 'center',
    flexDirection:'row'
  },
  txtTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff'
  }
})
