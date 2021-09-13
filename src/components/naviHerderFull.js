
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import FocusAwareStatusBar from './FocusAwareStatusBar';
import colors from '../constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class NaviHerderFull extends React.Component {

  render() {
    const { buttonLeft, title, buttonRight, onPressBack, buttonRightIcon, onPressRight } = this.props
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
          <MaterialCommunityIcons name={'chevron-left-circle'} size={25} style={{ color: '#fff' }} />
        </TouchableOpacity> : <View />
        }
        <View style={[styles.containerTitle, { marginRight: buttonLeft ? 30 : 0, marginLeft: buttonRight ? 30 : 0 }]}>
          <Text style={styles.txtTitle}>{title}</Text>
        </View>
        {buttonRight ? <TouchableOpacity
        onPress={onPressRight}
          style={styles.bntEdit}
        >{buttonRightIcon ?
          <Text style={styles.TxtEdit}>Sửa</Text> :
          <MaterialCommunityIcons name={'account-plus'} size={25} style={styles.iconAdd} />
          }

        </TouchableOpacity> : <View />
        }

      </View>
    )
  }

};
export default NaviHerderFull;

const styles = StyleSheet.create({
  containerALl: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#013ADF',
    justifyContent: 'space-between'
  },
  iconAdd:{ color: '#fff', marginRight:20 },
  TxtEdit: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginRight: 20
  },
  bntEdit: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerTitle: {
    justifyContent: 'center',
    textAlign: 'center',
    alignContent: 'center'
  },
  bntback: {
    marginLeft: 20,
    justifyContent: 'center'
  },
  txtTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff'
  }
})
