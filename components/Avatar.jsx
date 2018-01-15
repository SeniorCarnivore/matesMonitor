import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';

const Avatars  = ['🧞‍', '🧛‍', '👹', '🤴🏻', '👳🏻', '🧝‍', '💀', '🧙‍', '🐲'];

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 51%;
  font-size: 25px;
  line-height: 50px;
  background-color: #e6e6e6;
  background-image: ${ props => props.url };
  color: ${ props => props.url ? 'transparent' : '#000' };
`;

const Avatar = ({ name, surname, url }) => 
  <Container url={ url }>
    <span>
      { Avatars[Math.round(Math.random() * Avatars.length)] }
    </span>
  </Container>
;

Avatar.propTypes = {
  name: string,
  surname: string,
  url: string
};

export default Avatar;
