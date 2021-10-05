import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, processColor
} from 'react-native';

import {LineChart} from 'react-native-charts-wrapper';

export default class ChartTest extends React.Component {

  render() {
    return (
      <View style={styles.containerAll}>
        <View style={styles.container}>
          {/* <LineChart style={styles.chart}
            data={{ dataSets: [
              {
                values: [5, 40, 77, 81, 43]
              },
              {
                values: [10, 32, 323, 1, 33]
              },
          ]}}
          /> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  containerAll:{
    flex: 1,
    borderRadius:10,
  },
  chart: {
    flex: 1
  }
});

