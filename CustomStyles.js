import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

export default StyleSheet.create({
  oddsInput: {
    flex: 1,
    backgroundColor: '#49654C',
    justifyContent: 'center',
  },
  betInput: {
    flex: 1,
    backgroundColor: '#5e8362',
    justifyContent: 'center',
  },
  winInput: {
    flex: 1,
    backgroundColor: '#8AA989',
    justifyContent: 'center',
  },
  payoutInput: {
    flex: 1,
    backgroundColor: '#C0CEB2',
    justifyContent: 'center',
  },
  reset: {
    flex: 1,
    backgroundColor: '#EBEBE9',
    justifyContent: 'center',
  },
  customLabel: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '900'
  },
  textInput: {
    color: 'white',
    fontWeight: '900',
  },
  item: {
    borderColor: 'transparent',
  },
  resetText: {
    fontWeight: '900',
    color: 'grey',
    textAlign: 'center'
  }
});
