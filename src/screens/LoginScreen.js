import React, { Component } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import DismissKeyboardView from '../components/DismissKeyboard';
import NaviHeaderComponent from '../components/NaviHeaderComponent'
import { AuthContext } from '../context/AuthContext';
import Entypo from 'react-native-vector-icons/Entypo';
import Guest from '../api/guest';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secureTextEntry: true,
      iconstorageInfor: 'checkbox-blank-outline',
      iconShowPass: 'eye',
    };
  }

  async componentDidMount() {
    const icon = false
      ? 'checkbox-intermediate'
      : 'checkbox-blank-outline';
    this.setState({
      iconstorageInfor: icon,
    });
  }
  onIconClick = () => {
    let iconName = this.state.secureTextEntry ? 'eye-with-line' : 'eye';
    this.setState({
      secureTextEntry: !this.state.secureTextEntry,
      iconShowPass: iconName,
    });
  };
  onForgorPass = async () => {
    const objPost = {
          email:"demo@ninjateam.vn",
          password:"0979090897",
          function:"login",
          time:"1",
          token:"cb71566ad373420f41af4f951ac34aba"
    };
    try {
      const response = await Guest.login(objPost);
      console.log('lstMyFollow', response);
    } catch (e) {
      console.log(e);
    }
  
  }
  onLogin = () => {
    this.props.navigation.navigate('TabNavigator')
  }

  render() {
    return (
      // <AuthContext.Consumer>
      //   {({ isLoggedIn, toggleLoggedIn }) => (
      <DismissKeyboardView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={loginStyle.container}>
        <NaviHeaderComponent title={'Đăng nhập'} />
        <ScrollView contentContainerStyle={loginStyle.scroll}>
          <Image
            style={{ width: '100%', height: '100%', position: 'absolute' }}
            source={require('../resource/image/background-login.png')}
          />
          <View style={loginStyle.header}>
            <Image
              style={loginStyle.iconLogin}
              source={{
                uri: 'https://www.phanmemninja.com/wp-content/uploads/2021/05/LOGO-NINJA-nen.png',
              }}
            />
          </View>
          <View style={loginStyle.viewInput}>
            <MaterialCommunityIcons name={'account'} size={25} style={{ color: '#fff' }} />
            <TextInput
              placeholder={"Tên đăng nhập"}
              value={this.state.phoneNumber}
              onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
              placeholderTextColor="#BDBDBD"
              underlineColorAndroid="transparent"
              style={[loginStyle.textInput]}
              keyboardType="email-address"
              behavior={'padding'}
              autoCapitalize="none"
              keyboardVerticalOffset={65}
            />
          </View>
          <View style={loginStyle.height} />
          <View style={loginStyle.viewInput}>
            <MaterialCommunityIcons name={'lock'} size={25} style={{ color: '#fff' }} />
            <TextInput
              placeholder={'Mật khẩu'}
              placeholderTextColor="#BDBDBD"
              underlineColorAndroid="transparent"
              style={[loginStyle.textInput]}
              ref={(ref) => {
                this.currentPasswordRef = ref;
              }}
              autoCapitalize="none"
              secureTextEntry={this.state.secureTextEntry}
              behavior={'padding'}
              keyboardVerticalOffset={65}
              value={this.state.password}
              onChangeText={(password) => this.setState({ password })}
              maxLength={30}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={this.onIconClick}>
              <Entypo name={this.state.iconShowPass} size={20} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={loginStyle.storageInfor}
            onPress={this.onUserSaveClick}>
            <MaterialCommunityIcons
              style={loginStyle.material}
              name={this.state.iconstorageInfor}
              size={20}
              color='#fff'
            />
            <Text style={loginStyle.txtNhoPassWork} >Nhớ mật khẩu?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.onLogin}
            activeOpacity={0.8}
            style={loginStyle.btnLogin}>
            <Text style={loginStyle.txtDangNhap}>Đăng nhập</Text>
          </TouchableOpacity>
          <View style={loginStyle.containerFoget}>
            <View style={{ flex: 1 }} />
            <TouchableOpacity
              onPress={this.onForgorPass}
              activeOpacity={0.8}
              style={loginStyle.BntQuenMatKhau}>
              <Text style={loginStyle.txtQuenMatKhau}>Quên mật khẩu?</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </DismissKeyboardView>
      //   )}
      // </AuthContext.Consumer>
    );
  }
}

// LoginScreen.defaultProps = {
//   appState: {},
// };

// LoginScreen.propTypes = {
//   onRegisterFcmToken: PropTypes.func.isRequired,
//   onGetUnreadNotification: PropTypes.func.isRequired,
// };

export default LoginScreen;

const loginStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  iconLogin: {
    height: 200,
    width: 200,
    resizeMode: 'contain'
  },
  textInput: {
    flex: 1,
    justifyContent: 'center',
    fontSize: 16,
    alignItems: 'center',
    height: 70,
    paddingLeft: 10,
    color: '#fff',
  },
  buttonSignIN: {
    right: 0,
    alignSelf: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 250,
    backgroundColor: '#66AF5C',
    borderRadius: 20,
  },
  viewInput: {
    flexDirection: 'row',
    marginTop: 10,
    height: 60,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#0040FF',
    alignItems: 'center',
    shadowColor: '#000',
    shadowRadius: 10,
    shadowOpacity: 0.1,
    borderRadius: 30,
    padding: 20,
    marginHorizontal: 30,
    elevation: 8,
  },
  iconInput: {
    width: 24,
    height: 24,
  },
  storageInfor: {
    height: 30,
    flexDirection: 'row',
    marginTop: 30,
    marginLeft: 40,
  },
  scroll: { flex: 1 },
  height: { height: 20 },
  material: { marginRight: 10 },
  txtNhoPassWork: {
    color: '#fff',
    fontSize: 15,
  },
  BntQuenMatKhau: {
    marginTop: 10,
    height: 35,
    alignItems: 'center',
    marginRight: 35,
  },
  containerFoget: {
    flexDirection: 'row',
  },
  btnLogin: {
    backgroundColor: '#FE9A2E',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
    borderRadius: 30,
  },
  txtDangNhap: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  txtQuenMatKhau: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
});
