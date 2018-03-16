import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  View
} from 'react-native';
import { Text, Item, Input, Label } from 'native-base';

class Odds extends Component {
  render() {
    return (
        <Item floatingLabel>
          <Label>Odds</Label>
          <Input 
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
      <Item floatingLabel>
        <Label>Bet Amount ($)</Label>
        <Input 
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
      <Item floatingLabel>
        <Label>To Win ($)</Label>
        <Input 
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
      <Item floatingLabel>
        <Label>Payout ($)</Label>
        <Input 
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
    console.log(this.state);
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
        this.setState({payout: (parseFloat(this.state.bet) + parseFloat(this.state.win))});
      });
    } else {
      this.setState({win: ((100/Math.abs(odds)) * this.state.bet).toFixed(2)}, function () {
        this.setState({payout: (parseFloat(this.state.bet) + parseFloat(this.state.win))});
      });
    }
  }

  calculateFromWin() {
    var odds = this.convertOdds(this.state.odds);
    if (odds > 0) {
      this.setState({bet: ((this.state.win / odds) * 100).toFixed(2)}, function () {
        this.setState({payout: (parseFloat(this.state.bet) + parseFloat(this.state.win))});
      });
    } else {
      this.setState({bet: (this.state.win / (100/Math.abs(odds))).toFixed(2)}, function () {
        this.setState({payout: (parseFloat(this.state.bet) + parseFloat(this.state.win))});
      });
    }
  }

  handleChange = (event, key) => {
    debugger;
    switch(key) {
      case 'odds':
        this.setState({ odds: event.target.value }, function () {
          this.calculateWin();
        });
        break;
      case 'bet':
        this.setState({ bet: event.target.value }, function () {
          this.calculateWin();
        });
        break;
      case 'win':
        this.setState({ win: event.target.value }, function () {
          this.calculateFromWin();
        });
        break;
      default:
        break;
      };
  }

  render() {
    return (
    <View>
        <Odds odds={this.state.odds} onChange={(event) => this.handleChange(event, 'odds')}/>
        <Bet bet={this.state.bet} odds={this.state.odds} onChange={(event) => this.handleChange(event, 'bet')}/>
        <Win win={this.state.win} odds={this.state.odds} onChange={(event) => this.handleChange(event, 'win')}/>
        <Payout payout={this.state.payout}/>
        {/*</CardText>
        <CardActions>
          <FlatButton label="Reset" onClick={() => this.clearState()} />
        </CardActions>
      </Card>*/}
    
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
  errorStyle: {
    color: 'grey',
  },
  underlineStyle: {
    borderColor: 'grey',
  },
  floatingLabelStyle: {
    color: 'grey',
  },
  floatingLabelFocusStyle: {
    color: 'grey',
  },
};

AppRegistry.registerComponent('Calculator', () => Calculator);
