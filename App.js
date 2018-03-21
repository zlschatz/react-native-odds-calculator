import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View
} from 'react-native';
import Calculator from './Calculator.js';
import CustomHeader from './CustomHeader.js';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>

        <CustomHeader />

        <Calculator />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
