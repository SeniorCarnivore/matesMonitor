import React, { Component } from 'react';
import { arrayOf, object } from 'prop-types';
import styled from 'styled-components';

import Mate from './Mate';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;


export default class MatesList extends Component {
  static propTypes = {
    data: arrayOf(object)
  }
  
  static defaultProps = {
    data: []
  }

  state = {
    data: this.props.data
  }

  parseMates = (mates) => {
    const layout = mates.map(
      (mate) => <Mate key={ mate.id } data={ mate }/>
    );

    return layout;
  }

  render() {
    const {
      data
    } = this.state;

    return (
      <Container>
        { this.parseMates(data) }
      </Container>
    );
  }
};
