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
  Dimensions
} from 'react-native';
import DismissKeyboardView from '../components/DismissKeyboard';
import NaviHeaderComponent from '../components/NaviHeaderComponent'
import { AuthContext } from '../context/AuthContext';
import common from '../utils/common';
import LOCALE_KEY, {
  getLocale,
  setLocale,
  clearLocale,
} from '../repositories/local/appLocale';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  getUserInFor,
} from '../redux/actions';
import { stringMd5 } from 'react-native-quick-md5';
import Guest from '../api/guest';
import { connect } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const windowHeight = Dimensions.get('window').height;
class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: '',
      secureTextEntry: true,
      storageInfor: false,
      iconstorageInfor: 'checkbox-blank-outline',
      iconShowPass: 'eye',
    };
  }

  onIconClick = () => {
    let iconName = this.state.secureTextEntry ? 'eye-with-line' : 'eye';
    this.setState({
      secureTextEntry: !this.state.secureTextEntry,
      iconShowPass: iconName,
    });
  };
  onForgorPass = async () => {
    this.props.navigation.navigate('ResetPassWordScreen')
  }

  async componentDidMount() {
    const email = await getLocale(LOCALE_KEY.email);
    const password = await getLocale(LOCALE_KEY.pass_word);
    const save_infor =
      (await getLocale(LOCALE_KEY.storage_infor)) === '1' ? false : true;
    const icon = save_infor
      ? 'checkbox-intermediate'
      : 'checkbox-blank-outline';
    this.setState({
      email: email,
      storageInfor: save_infor,
      iconstorageInfor: icon,
      password: password
    });
    if (Platform.OS === 'android') {

    }
  }

  onUserSaveClick = () => {
    let iconName = this.state.storageInfor
      ? 'checkbox-blank-outline'
      : 'checkbox-intermediate';
    let value = !this.state.storageInfor ? '1' : '0';
    setLocale(LOCALE_KEY.storage_infor, value);
    this.setState({
      storageInfor: !this.state.storageInfor,
      iconstorageInfor: iconName,
    });
  };

  onLoginClick = async (toggleLoggedIn) => {
    const { password, email } = this.state;  
    if (password === '' || email === '') {
      Alert.alert(
        "Thông báo",
        "Email hoặc mật khẩu không được để trống",
        [
          { text: "OK", onPress: () => { } }
        ]
      );
    } else {
      const md5 = stringMd5(password);
      const timeStamp = common.timeStamp();
      const token = common.createToken(timeStamp);
      const objPost = {
        email: email,
        password: md5,
        function: "login",
        time: timeStamp,
        token: token
      };
      try {
        const response = await Guest.login(objPost);
        const userinfo = JSON.parse(response.data);
        if (response.status === true) {
          if (this.state.storageInfor === true) {
            setLocale(LOCALE_KEY.email, email);
            setLocale(LOCALE_KEY.pass_word, password);
            setLocale(LOCALE_KEY.phone_number, userinfo.phone);
            setLocale(LOCALE_KEY.user_name, userinfo.name);
            setLocale(LOCALE_KEY.role, userinfo.role);
          } else {
            clearLocale(LOCALE_KEY.email);
            clearLocale(LOCALE_KEY.pass_word);
          }
          await setLocale(LOCALE_KEY.access_token, token);
          await toggleLoggedIn();
        } else if (response.status === false) {
          Alert.alert(
            "Thông báo",
            "Email hoặc mật khẩu không đúng, hãy thử lại",
            [
              { text: "OK", onPress: () => { } }
            ]
          );
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  render() {
    return (
      <AuthContext.Consumer>
        {({ isLoggedIn, toggleLoggedIn }) => (
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
              <View style={loginStyle.height} />
              <View style={loginStyle.viewInput}>
                <MaterialCommunityIcons name={'lock'} size={20} style={{ color: '#fff' }} />
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
              {/* <TouchableOpacity
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
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => this.onLoginClick(toggleLoggedIn)}
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
        )}
      </AuthContext.Consumer>
    );
  }
}
const mapStateToProps = (state) => ({
  appState: state.appState,
});

const mapDispatchToProps = (dispatch) => ({
  getUserInFor: (payload) => dispatch(getUserInFor(payload)),
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

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
    height: windowHeight/10.2,
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
    height: windowHeight/17.8,
    // width: 250,
    backgroundColor: '#66AF5C',
    borderRadius: 20,
  },
  viewInput: {
    flexDirection: 'row',
    marginTop: 10,
    height: windowHeight/11.9,
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
    height: windowHeight/11.9,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
    marginTop:30,
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
