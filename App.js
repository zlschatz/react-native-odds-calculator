import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View
} from 'react-native';
import Calculator from './Calculator.js';
import { Header, Left, Right, Button, Icon, Body, Title } from 'native-base';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
      
        <Header>
          <Left>
          </Left>
          <Body>
            <Title>OBW</Title>
          </Body>
          <Right>
          </Right>
        </Header>

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
