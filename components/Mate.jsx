import React, { Component } from 'react';
import { object, func, number } from 'prop-types';
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

const handleClick = (id, callback) => {
  callback(id);
}

const handleDetermination = (id, determination, determineMate) => {
  determineMate(id, determination);
}

const Mate = ({ data, filtered, callback, determineMate }) => {
  const {
    id,
    name,
    surname,
    rating
  } = data;

  return (
    <Container>
      <Identity onClick={ () => handleClick(id, callback) } >
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
          <Control
            onClick={ () => handleDetermination(id, true, determineMate) }
            left
          >
            👍🏻
          </Control>

          ({ rating })

          <Control
            onClick={ () => handleDetermination(id, false,  determineMate) }
          >
            👎🏻
          </Control>
        </RatingPanel>
      }
    </Container>
  );
};

Mate.propTypes = {
  data: object,
  callback: func,
  determineMate: func,
  filtered: number
};

export default Mate;
