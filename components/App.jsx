import React, { Component } from 'react';

import MatesList from './MatesList'

import data from '../mates.json';

export default class App extends Component {

  componentWillMount() {
    const mates = localStorage.getItem('mates');
    
    if (!mates) {
      this.setState({
        mates: data
      });
    }
  }

  render() {
    const {
      mates
    } = this.state;

    return (
      <MatesList data={mates}/>
    );
  }
};
