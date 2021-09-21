import React from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from '../context/AuthContext';
import PropTypes from 'prop-types';
import StackNavigator from './StackNavigator';
import AuthNavigator from './AuthNavigator';
import SplashScreen from '../components/SplashScreen';
import {connect} from 'react-redux';
import {getLocale} from '../repositories/local/appLocale';
import LOCALE_KEY from '../repositories/local/appLocale';
import LoadingComponent from '../components/LoadingComponent';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export let navigationRef = React.createRef();

class MainNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.toggleLoggedIn = async () => {
      const accessToken = await getLocale(LOCALE_KEY.access_token);
      const isLoggedIn = accessToken !== null;
      this.refreshLocation(isLoggedIn);
      this.setState((state) => ({
        auth: {
          isLoggedIn: isLoggedIn,
          toggleLoggedIn: state.auth.toggleLoggedIn,
        },
      }));
    };
    this.state = {
      auth: {
        isLoggedIn: null,
        toggleLoggedIn: this.toggleLoggedIn,
      },
      openApp: false,
    };

    setTimeout(
      function () {
        this.setState({openApp: true});
      }.bind(this),
      2000,
    );
  }

  refreshLocation = (isLoggedIn) => {
    if (this._interval) {
      clearInterval(this._interval);
    }

    if (!isLoggedIn) {
      return;
    }
  };
  async componentDidMount() {
    const accessToken = await getLocale(LOCALE_KEY.access_token);
    const isLoggedIn = accessToken !== null;
    this.refreshLocation(isLoggedIn);
    this.setState((state) => ({
      auth: {
        isLoggedIn: isLoggedIn,
        toggleLoggedIn: state.auth.toggleLoggedIn,
      },
    }));
  }

  renderNavigator = () => {
    return this.state.auth.isLoggedIn !== true &&
    this.state.auth.isLoggedIn !== false ? (
    <></>
  ) : this.state.auth.isLoggedIn  ? (
      <StackNavigator />
    ) : (
      <AuthNavigator />
    );
  };

  // renderLoading = () => {
  //   const {appState} = this.props;
  //   return <LoadingComponent modalVisible={appState.isLoading} />;
  // };

  render() {
    if (this.state.openApp !== true && Platform.OS === 'android') {
      return <SplashScreen />;
    }
    return (
      <AuthContext.Provider value={this.state.auth}>
          <NavigationContainer ref={navigationRef}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            {this.renderNavigator()}
            {/* <NetworkService
              ref={networkRef}
              toggleLoggedIn={this.toggleLoggedIn}
            /> */}
            {/* {this.renderLoading()} */}
          </NavigationContainer>
      </AuthContext.Provider>
    );
  }
}

// MainNavigator.propTypes = {
//   configFcm: PropTypes.func.isRequired,
//   clearFcm: PropTypes.func.isRequired,
//   onGetUnreadNotification: PropTypes.func.isRequired,
// };

// MainNavigator.defaultProps = {
//   appState: {},
// };

// const mapStateToProps = (state) => ({
//   appState: state.appState,
// });

// const mapDispatchToProps = (dispatch) => ({
//   configFcm: () => dispatch(checkFcmPermission()),
//   clearFcm: () => dispatch(clearAllFcmListeners()),
//   onGetUnreadNotification: () => dispatch(getUnreadNotification()),
// });

export default MainNavigator;
