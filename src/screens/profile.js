
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
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
            />

            <View style={styles.container}>
              <View style={styles.infoContainer}>
                <Image
                  style={styles.infoAvatar}
                  source={require('../resource/image/icon_user.png')}
                />
                <View style={styles.viewName}>
                  <Text style={styles.textInfo}>{this.state.userName ? this.state.userName : ''}</Text>
                  <Text style={styles.textInfo}>{this.state.email ? this.state.email : ''}</Text>
                </View>
              </View>
              <View style={styles.containerNut}>
                <TouchableOpacity style={[styles.containerButton]}
                  onPress={() => this.props.navigation.navigate('DetailProfileScreen')}
                >
                  <MaterialCommunityIcons name={'account'} size={20} style={styles.icon} />
                  <View style={styles.containerIcon}>
                    <Text style={styles.txtTitle}>Thông tin cá nhân</Text>
                    <MaterialCommunityIcons name={'chevron-right'} size={20} style={styles.icon} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.containerButton}
                  onPress={() => this.props.navigation.navigate('Customer')}>
                  <MaterialCommunityIcons name={'account-box'} size={20} style={styles.icon} />
                  <View style={styles.containerIcon}>
                    <Text style={styles.txtTitle}>Danh sách Khách hàng</Text>
                    <MaterialCommunityIcons name={'chevron-right'} size={20} style={styles.icon} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.containerButton}
                onPress={() => this.props.navigation.navigate('CopyrightManagement')}>
                <MaterialCommunityIcons name={'briefcase'} size={20} style={styles.icon} />
                <View style={[styles.containerIcon, { borderBottomColor: '#fff', }]}>
                  <Text style={styles.txtTitle}>Danh sách bản quyền</Text>
                  <MaterialCommunityIcons name={'chevron-right'} size={20} style={styles.icon} />
                </View>
              </TouchableOpacity>
              </View>
              

            </View>

            <TouchableOpacity
              style={styles.bntLogOut}
              onPress={() => this.logoutPress(toggleLoggedIn)}
            >
              {/* <MaterialCommunityIcons name={'logout'} size={20} style={styles.icLogout} /> */}
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
    backgroundColor: '#F2F2F2'
  },
  icLogout: {
    color: '#848484',
    marginLeft: 20,
  },
  containerIcon: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#D8D8D8',
    flex: 1,
    alignItems: 'center'
  },
  txtTitle: {
    paddingVertical: 10,
    flex: 1,
  },
  container: {
    flex: 1,
  },
  txtLogOut: {
    color: 'red',
    paddingVertical: 10,
    textAlign: 'center',
    flex: 1,
    fontWeight: '600'
  },
  viewName: {
    alignSelf: 'center',
  },
  containerButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  containerNut: {
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  icon: {
    marginHorizontal: 20,
    color: '#6E6E6E',
  },
  textInfo: {
    textAlign: 'center',
    fontSize: 16
  },
  bntLogOut: {
    backgroundColor: '#fff',
    marginVertical: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContainer: {
    paddingVertical: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginTop: 10
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
