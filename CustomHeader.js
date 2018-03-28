import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  View
} from 'react-native';
import { Header, Left, Right, Button, Icon, Body, Title } from 'native-base';

export default class CustomHeader extends Component {
  render() {
    return (
      <View>
      
        <Header>
          <Left>
          </Left>
          <Body>
            <Title>Odd.Bet.Win</Title>
          </Body>
          <Right>
          </Right>
        </Header>

      </View>
    );
  }
}

AppRegistry.registerComponent('CustomHeader', () => CustomHeader);
