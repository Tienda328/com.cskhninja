import React from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from '../context/AuthContext';
import PropTypes from 'prop-types';
import {BadgeContext} from '../context/BadgeContext';
import StackNavigator from './StackNavigator';
import AuthNavigator from './AuthNavigator';
import SplashScreen from '../components/SplashScreen';
import {connect} from 'react-redux';
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
    this.state = {
      openApp: false,
    };
    setTimeout(
      function () {
        this.setState({openApp: true});
      }.bind(this),
      2000,
    );
  }


  renderNavigator = () => {
    return true ? (
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
      // <AuthContext.Provider value={this.state.auth}>
        <BadgeContext.Provider value={this.state.badge}>
          <NavigationContainer ref={navigationRef}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            {this.renderNavigator()}
            {/* <NetworkService
              ref={networkRef}
              toggleLoggedIn={this.toggleLoggedIn}
            /> */}
            {/* {this.renderLoading()} */}
          </NavigationContainer>
        </BadgeContext.Provider>
      // </AuthContext.Provider>
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
