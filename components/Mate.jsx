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
`;

const Identity = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
`;

const RatingPanel = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  color: #fff;
`;

const Control = styled.button`
  margin-top: ${props => props.left ? '-5px' : '5px'};
  border: 0;
  padding: 5px;
  font-size: 20px;
  cursor: pointer;
  background-color: transparent;
  outline: none;
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

  handleDetermination(id, determination) {
    const {
      determineMate
    } = this.props;

    determineMate(id, determination);
  }

  render() {
    const {
      data,
      filtered
    } = this.props;

    const {
      id,
      name,
      surname,
      rating
    } = data;

    return (
      <Container>
        <Identity onClick={ () => this.handleClick(id) } >
          <Avatar
            name={ name }
            surname={ surname }
            url=''
          />

          <span>
            { `${ name } ${ surname }` }
          </span>
        </Identity>

        { 
          filtered > 0 &&
          <RatingPanel>
            <Control onClick={ () => this.handleDetermination(id, true) } left>👍🏻</Control>
            ({ rating })
            <Control onClick={ () => this.handleDetermination(id) } >👎🏻</Control>
          </RatingPanel>
        }
      </Container>
    );
  }
};
