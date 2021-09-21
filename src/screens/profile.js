
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import NaviHerderFull from '../components/naviHerderFull';
import { AuthContext } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import LOCALE_KEY, {
  getLocale,
  setLocale,
  clearLocale,
} from '../repositories/local/appLocale';
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      userName: null,
    };
  }

  logoutPress = async (toggleLoggedIn) => {
    // this.setState({ accessToken: null });
    await clearLocale(LOCALE_KEY.access_token);
    toggleLoggedIn();
  };

  async componentDidMount() {
    const user_name = await getLocale(LOCALE_KEY.user_name);
    const email = await getLocale(LOCALE_KEY.email);
    this.setState({
      email: email,
      userName: user_name,
    })
  }
  render() {
    return (
      <AuthContext.Consumer>
        {({ isLoggedIn, toggleLoggedIn }) => (
          <View style={styles.containerALl}>
            <NaviHerderFull title={'TÀI KHOẢN'}
              // textRight={'Sửa'}
              // nameIcon={'account-edit'}
              // buttonRight={true}
               />

            <View style={styles.container}>
                {/* <Image
                  style={{ width: 120, height: 120, position: 'absolute', borderRadius: 60, left: '30%', top: -70, borderColor: '#fff', borderWidth: 3 }}
                  source={require('../resource/image/background-login.png')}
                /> */}
                <View style={styles.infoContainer}>
                <Image
                      style={styles.infoAvatar}
                      source={require('../resource/image/background-login.png')}
                    />
                  <View style={styles.viewName}>
                    <Text style={styles.textInfo}>{ this.state.userName? this.state.userName:''}</Text>
                    <Text style={styles.textInfo}>{ this.state.email? this.state.email:''}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('DetailProfileScreen')}>
                <View style={styles.containerBtn}>
                  <View style={styles.viewIcon}>
                    <Icon
                      name="account"
                      size={23}
                      color="#fff"
                      style={styles.txtBtn2}
                    />
                    <Text style={styles.textBtn}>Thông tin cá nhân</Text>
                  </View>
                  <Icon
                      name="menu-right-outline"
                      size={30}
                      color="#fff"
                    />
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.containerBtn}>
                  <View style={styles.viewIcon}>
                    <Icon
                      name="account"
                      size={23}
                      color="#fff"
                      style={styles.txtBtn2}
                    />
                    <Text style={styles.textBtn}>Danh sách Khách hàng</Text>
                  </View>
                  <Icon
                      name="menu-right-outline"
                      size={30}
                      color="#fff"
                    />
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.containerBtn}>
                  <View style={styles.viewIcon}>
                    <Icon
                      name="account"
                      size={23}
                      color="#fff"
                      style={styles.txtBtn2}
                    />
                    <Text style={styles.textBtn}>Danh sách bản quyền</Text>
                  </View>
                  <Icon
                      name="menu-right-outline"
                      size={30}
                      color="#fff"
                    />
                </View>
              </TouchableOpacity>
            
            </View>
            <TouchableOpacity
                style={styles.bntLogOut}
                onPress={() => this.logoutPress(toggleLoggedIn)}
              >
                <Text style={styles.txtLogOut}>ĐĂNG XUẤT</Text>

              </TouchableOpacity>
          </View>
        )}
      </AuthContext.Consumer>
    )
  }

};
const mapStateToProps = (state) => ({
  appState: state.appState,
});
export default connect(mapStateToProps, null)(Profile);

const styles = StyleSheet.create({
  containerALl: {
    flex: 1,
    backgroundColor: '#D8D8D8'
  },
  textBtn: {
    marginHorizontal: 10,
    color:'#fff'
  },
  container:{
    flex:1,
    backgroundColor:'#fff',
    marginHorizontal:20,
    marginTop:20,
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth:1,
    borderColor:'#BDBDBD',
    shadowColor: '#000',
    shadowRadius: 6,
    shadowOpacity: 0.16,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 3,
  },
  txtLogOut:{
    color:'#fff',
    paddingVertical:10,
    fontWeight:'600'
  },
  viewIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewName: {
    alignSelf: 'center',
  },
  containerBtn: {
    elevation: 3,
    flexDirection: 'row',
    marginTop:15,
    height: 60,
    justifyContent: 'space-between',
    backgroundColor: '#0080FF',
    alignItems: 'center',
    paddingHorizontal:10,
    marginHorizontal:10,
    shadowColor: '#000',
    shadowRadius: 10,
    shadowOpacity: 0.1,
    borderRadius: 10,
  },
  textInfo: {
    textAlign: 'center',
    fontSize:16
  },
  bntLogOut: {
    backgroundColor: '#013ADF',
    marginVertical: 20,
    marginHorizontal:20,
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 10
  },
  infoContainer: {
    alignSelf: 'center',
    marginVertical: '5%',
  },
    infoAvatar: {
    backgroundColor: '#fff',
    borderColor: '#0E9549',
    borderRadius: 63,
    borderWidth: 4,
    height: 80,
    alignSelf: 'center',
    marginBottom: 10,
    width: 80,
  },
})
