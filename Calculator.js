import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { Text, Item, Input, Label, Button } from 'native-base';

class Odds extends Component {
  render() {
    return (
        <Item inlineLabel style={styles.item}>
          <Input
            placeholder="ODDS"
            placeholderTextColor="white"
            textAlign="center"
            style={styles.textInput}
            value={(this.props.odds) ? (this.props.odds) : ''}
            onChange={this.props.onChange}
          />
        </Item>
    );
  }
}

class Bet extends Component {
  render() {
    return (
      <Item floatingLabel style={styles.item}>
        <Input
          placeholder="BET AMOUNT ($)"
          placeholderTextColor="white"
          textAlign="center"
          style={styles.textInput}
          value={(this.props.bet > 0) ? (this.props.bet) : ''}
          onChange={this.props.onChange}
          disabled={(this.props.odds) ? false : true}
        />
      </Item>
    );
  }
}

class Win extends Component {
  render() {
    return (
      <Item floatingLabel style={styles.item}>
        <Input
          placeholder="TO WIN ($)"
          placeholderTextColor="white"
          textAlign="center"
          style={styles.textInput}
          value={(isFinite(this.props.win) && (this.props.win > 0)) ? (this.props.win) : ''}
          onChange={this.props.onChange}
          disabled={(this.props.odds) ? false : true}
        />
      </Item>
    );
  }
}

class Payout extends Component {
  render() {
    return (
      <Item floatingLabel style={styles.item}>
        <Input
          placeholder="PAYOUT ($)"
          placeholderTextColor="white"
          textAlign="center"
          style={styles.textInput}
          value={(isFinite(this.props.payout) && (this.props.payout > 0)) ? (this.props.payout) : ''}
          onChange={this.props.onChange}
          disabled={true}
        />
      </Item>
    );
  }
}

export default class Calculator extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  clearState() {
    this.setState(initialState);
  }

  convertOdds(odds) {
    if ((odds).includes('/') && (odds.split('/')[1] !== '')) {
      var fraction = odds.replace('-', '').split('/'); //Discard (-) for fractional odds
      return ((fraction[0] / fraction[1]) * 100);
    } else {
      return odds
    }
  }

  calculateWin() {
    var odds = this.convertOdds(this.state.odds);
    if (odds > 0) {
      this.setState({win: (odds * (this.state.bet/100)).toFixed(2)}, function () {
        this.setState({payout: (+this.state.bet + +this.state.win).toString()});
      });
    } else {
      this.setState({win: ((100/Math.abs(odds)) * this.state.bet).toFixed(2)}, function () {
        this.setState({payout: (+this.state.bet + +this.state.win).toString()});
      });
    }
  }

  calculateFromWin() {
    var odds = this.convertOdds(this.state.odds);
    if (odds > 0) {
      this.setState({bet: ((this.state.win / odds) * 100).toFixed(2)}, function () {
        this.setState({payout: (+this.state.bet + +this.state.win).toString()});
      });
    } else {
      this.setState({bet: (this.state.win / (100/Math.abs(odds))).toFixed(2)}, function () {
        this.setState({payout: (+this.state.bet + +this.state.win).toString()});
      });
    }
  }

  handleChange(event, key) {
    switch(key) {
      case 'odds':
        this.setState({ odds: event.nativeEvent.text }, function () {
          this.calculateWin();
        });
        break;
      case 'bet':
        this.setState({ bet: event.nativeEvent.text }, function () {
          this.calculateWin();
        });
        break;
      case 'win':
        this.setState({ win: event.nativeEvent.text }, function () {
          this.calculateFromWin();
        });
        break;
      default:
        break;
      };
  }

  render() {
    return (
    <View style={{flex: 1}}>
      <View style={styles.oddsInput}>
        <Odds odds={this.state.odds} onChange={(event) => this.handleChange(event, 'odds')}/>
      </View>
      <View style={styles.betInput}>
        <Bet bet={this.state.bet} odds={this.state.odds} onChange={(event) => this.handleChange(event, 'bet')}/>
      </View>
      <View style={styles.winInput}>
        <Win win={this.state.win} odds={this.state.odds} onChange={(event) => this.handleChange(event, 'win')}/>
      </View>
      <View style={styles.payoutInput}>
        <Payout payout={this.state.payout}/>
      </View>
      <TouchableOpacity onPress={() => this.clearState()} style={styles.reset}>
          <Text style={styles.resetText}>RESET</Text>
      </TouchableOpacity>
    </View>
    );
  }
}

const initialState = {
    odds: 0,
    bet: 0,
    win: 0,
    payout: 0
}

const styles = {
  oddsInput: {
    flex: 1,
    backgroundColor: '#5d2bbf',
    justifyContent: 'center',
  },
  betInput: {
    flex: 1,
    backgroundColor: '#e58267',
    justifyContent: 'center',
  },
  winInput: {
    flex: 1,
    backgroundColor: '#d7f79b',
    justifyContent: 'center',
  },
  payoutInput: {
    flex: 1,
    backgroundColor: '#6ae8a1',
    justifyContent: 'center',
  },
  reset: {
    flex: 1,
    backgroundColor: '#045996',
    justifyContent: 'center',
  },
  label: {
    color: 'white',
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
    color: 'white',
    textAlign: 'center'
  }
};

AppRegistry.registerComponent('Calculator', () => Calculator);
