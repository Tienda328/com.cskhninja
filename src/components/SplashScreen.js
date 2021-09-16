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
            uri: 'https://www.phanmemninja.com/wp-content/uploads/2021/05/LOGO-NINJA-nen.png',
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
    resizeMode:'contain'
  }
});
