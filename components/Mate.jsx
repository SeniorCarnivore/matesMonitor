import React, { Component } from 'react';
import { object } from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #666;
`;


export default class MatesList extends Component {
  static propTypes = {
    data: object
  }

  render() {
    const {
      id,
      name,
      surname
    } = this.props.data;

    return (
      <Container>
        { `${name} ${surname}` }
      </Container>
    );
  }
};
