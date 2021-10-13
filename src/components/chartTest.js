import React from "react";
import { StyleSheet, Dimensions, View, Text, ScrollView } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis } from "victory-native";
const windowWidth = Dimensions.get('window').width;
export default class Chart extends React.Component {


  render() {
    const styless = this.props.dataReportday.length > 20 ? 600 : windowWidth
    return (
      <ScrollView style={{ flex: 1, marginBottom: 10 }}
        horizontal={true}
      >
        <View style={styles.container}>
          <View style={{ position: 'absolute', left: 35, bottom: 307 }}>
            <Text style={{ fontSize: 11 }}> Triệu</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <VictoryChart width={styless} theme={VictoryTheme.material}
              domainPadding={{ x: [20, 0] }}
            >
              <VictoryBar
                style={{ data: { fill: "#FF8000" } }}
                data={this.props.dataReportday}
                x='day'
                y="money" />

            </VictoryChart>
            <View style={{ position: 'absolute', left: 12, top: 310 }}>
              <Text style={{ fontSize: 11 }}>Ngày</Text>
            </View>

          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#fff"
  }
});