
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import NaviHerderFull from '../components/naviHerderFull'

function Information({ name, value }) {
  return (
    <View style={styles.containerInforName}>
      <Text style={styles.txtName}>{name}</Text>
      <Text style={styles.txtValue}>{value}</Text>
    </View>
  );
}

class Profile extends React.Component {
  render() {
    return (
      <View style={styles.containerALl}>

        <Image
          style={{ width: '100%', height: '50%', position: 'absolute', borderBottomRightRadius: 60, borderBottomLeftRadius: 60 }}
          source={require('../resource/image/background-login.png')}
        />
        <NaviHerderFull title={'Thông tin cá nhân'} buttonRight={true} buttonRightIcon={true} />

        <View style={styles.container}>
          <View style={styles.containerInfo}>
            <View style={styles.viewTop} />
            <Image
              style={{ width: 120, height: 120, position: 'absolute', borderRadius: 60, left: '30%', top: -70, borderColor: '#fff', borderWidth: 3 }}
              source={require('../resource/image/background-login.png')}
            />
            <Information name={'Tên người dùng'} value={'nguyen thanh trung'} />
            <Information name={'Chức vụ'} value={'Sale'} />
            <Information name={'Phòng/Ban'} value={'CSKH'} />
            <Information name={'Email'} value={'trungnt@gmail.com'} />
            <Information name={'Giới tính'} value={'nam'} />
            <Information name={'Số điện thoại'} value={'0254123587'} />
            <Information name={'Ngày Sinh'} value={'12/14/1988'} />
            <Information name={'Zalo'} value={'abc'} />
            <Information name={'Facebook'} value={'abc'} />
            <View style={styles.viewBottom} />
          </View>
          <TouchableOpacity 
            style={styles.bntLogOut}
          >
            <Text style={styles.txtLogOut}>ĐĂNG XUẤT</Text>

          </TouchableOpacity>
        </View>
      </View>
    )
  }

};


export default Profile;

const styles = StyleSheet.create({
  containerALl: {
    flex: 1,
    backgroundColor: '#fff'
  },
  viewTop: {
    marginTop: 50,
  },
  txtName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#151515'
  },
  txtValue: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#2E2EFE'
  },
  txtLogOut:{
    padding:15,
    color:'#fff'
  },
  bntLogOut:{
    backgroundColor:'#013ADF',
    marginTop:30,
    borderRadius:20
  },
  containerInforName: {
    marginTop: 10,
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  viewBottom: {
    height: 20
  },
  container: {
    marginTop: 100,
    alignItems: 'center'
  },
  containerInfo: {
    width: 300,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  }
})
