/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import colors from '../constants/colors';

class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.iconLogin}
          source={{
            uri: 'https://png.pngtree.com/png-clipart/20190520/original/pngtree-virtual-reality-glasses-ninja-logo-png-image_4264511.jpg',
          }}
        />
      </View>
    );
  }
}

export default SplashScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconLogin:{
    height:200,
    width:200,
  }
});
