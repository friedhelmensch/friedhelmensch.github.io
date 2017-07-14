import React, { Component } from 'react';
import './App.css';

const COINIDENTIFIERS = ["ethereum","golem-network-tokens","antshares","storj","antcoin","bitcoin"];

class App extends Component {
  constructor() {
  super();
  this.state = {
    coinRates: []
    };
  }
  componentDidMount() {
    var self = this;
    COINIDENTIFIERS.forEach(coinIdentifier => {
      const URL = "https://cors-anywhere.herokuapp.com/https://api.coinmarketcap.com/v1/ticker/" +
        coinIdentifier +
        "/?convert=EUR";
      fetch(URL, self).then(res => res.json()).then(json => {
        var newRates = this.state.coinRates;
        newRates.push({ name: json[0].name, price: json[0].price_eur })
        this.setState( { coinRates: newRates });
      });
    });
  }

  render() {
    const coinRates = this.state.coinRates;
    if (!coinRates) return <div>Loading</div>;
    return (
    <div>
      <p>Coin Rates</p>
      {this.state.coinRates.map((coinRate) => (
       <p key={coinRate.name}>{coinRate.name} : {coinRate.price}</p>
    ))}
    </div>);
  }
}

export default App;