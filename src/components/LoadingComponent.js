import React, {Component} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import colors from '../constants/colors';

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.black,
    height: '100%',
    opacity: 0.45,
    position: 'absolute',
    width: '100%',
  },
  container: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
  },
});

export default class LoadingComponent extends Component {
  render() {
    const {modalVisible} = this.props;
    if (!modalVisible) {
      return null;
    }

    return (
      <View style={styles.container}>
        <View style={styles.background} />
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }
}

LoadingComponent.propTypes = {
  modalVisible: PropTypes.bool,
};

LoadingComponent.defaultProps = {
  modalVisible: false,
};
