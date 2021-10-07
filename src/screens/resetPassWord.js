import React, { Component } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
  Dimensions
} from 'react-native';
import DismissKeyboardView from '../components/DismissKeyboard';
import { AuthContext } from '../context/AuthContext';
import common from '../utils/common';
import NaviHerderFull from '../components/naviHerderFull';
import Guest from '../api/guest';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const windowHeight = Dimensions.get('window').height;
class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }


  validateEmail = () => {
    const { email } = this.state;
    if (email.length > 0) {
      if (!/[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,64}/.test(email)) {
        this.setState({ stateEmail: 'Email không đúng định dạng' });
        return false;
      } else {
        this.setState({ stateEmail: null });
        return true;
      }
    } else {
      this.setState({ stateEmail: 'Email không được để trống' });
      return false;
    }
  }
  clickReset = async () => {
    this.validateEmail()
    if (this.validateEmail() === true) {
      const timeStamp = common.timeStamp();
      const token = common.createToken(timeStamp);

      const objPost = {
        function: "resetpassword",
        time: timeStamp,
        token: token,
        variable: `{'email':'${this.state.email}'}`
      };
      try {
        await Guest.resetpassword(objPost, 'message');

      } catch (e) {
        console.log(e);
      }

    }
  };


  goBack = () => {
    this.props.navigation.goBack()
};

  render() {
    const { stateEmail } = this.state
    return (
      <AuthContext.Consumer>
        {({ isLoggedIn, toggleLoggedIn }) => (
          <DismissKeyboardView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={loginStyle.container}>
                <NaviHerderFull title={'RESET PASSWORD'}
                    onPressBack={this.goBack}
                    buttonLeft={true} 
                    onPressRight={this.clickEdit}

                    buttonRightIcon={true} />
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
                <MaterialCommunityIcons name={'account'} size={20} style={{ color: '#fff' }} />
                <TextInput
                  placeholder={"Tên đăng nhập"}
                  value={this.state.email}
                  onChangeText={(email) => this.setState({ email })}
                  placeholderTextColor="#BDBDBD"
                  underlineColorAndroid="transparent"
                  style={[loginStyle.textInput]}
                  keyboardType="email-address"
                  behavior={'padding'}
                  autoCapitalize="none"
                  keyboardVerticalOffset={65}
                />
              </View>
              <Text style={loginStyle.txtError}> {stateEmail}</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={this.clickReset}
                style={loginStyle.btnLogin}>
                <Text style={loginStyle.txtDangNhap}>Reset PassWord</Text>
              </TouchableOpacity>
            </ScrollView>
          </DismissKeyboardView>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default LoginScreen;

const loginStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  txtError: {
    marginLeft: 35,
    marginTop: 10,
    color: '#FF0000'
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
    height: windowHeight / 10.2,
    paddingLeft: 10,
    color: '#fff',
  },
  viewInput: {
    flexDirection: 'row',
    marginTop: 10,
    height: windowHeight / 11.9,
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
  scroll: { flex: 1 },
  height: { height: 20 },
  material: { marginRight: 10 },
  btnLogin: {
    backgroundColor: '#FE9A2E',
    height: windowHeight / 11.9,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
    marginTop: 30,
    borderRadius: 30,
  },
  txtDangNhap: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
