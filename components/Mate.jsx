import React, { Component } from 'react';
import { object } from 'prop-types';
import styled from 'styled-components';

import Avatar from './Avatar';

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 5px;
  box-sizing: border-box;
  background-color: #666;
  cursor: pointer;
`;


export default class Mate extends Component {
  static propTypes = {
    data: object
  }

  handleClick = (id) => {
    const {
      callback
    } = this.props;

    callback(id);
  }

  render() {
    const {
      id,
      name,
      surname
    } = this.props.data;
 
    return (
      <Container
        onClick={ () => this.handleClick(id) }
      >
        <Avatar
          name={ name }
          surname={ surname }
          url=''
        />
        { `${ name } ${ surname }` }
      </Container>
    );
  }
};
