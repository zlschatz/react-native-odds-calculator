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
      <View>
      
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>WATO</Title>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
