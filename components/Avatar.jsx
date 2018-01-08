import React, { Component } from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 51%;
  background-color: #e6e6e6;
  background-image: ${ props => props.url };
  color: ${ props => props.url ? 'transparent' : '#000' };
`;


export default class Avatar extends Component {
  static propTypes = {
    name: string,
    surname: string,
    url: string
  }

  createInitials = (name,surname) => {
    return name[0] + surname[0]
  }

  render() {
    const {
      name,
      surname
    } = this.props;

    return (
      <Container>
        <span>
          { this.createInitials(name, surname) }
        </span>
      </Container>
    );
  }
};
