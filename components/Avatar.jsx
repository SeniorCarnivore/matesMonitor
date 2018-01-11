import React from 'react';
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

const Avatar = ({name, surname, url}) => 
  <Container url={ url }>
    <span>
      {
        name &&
        surname &&
        name[0] + surname[0]
      }
    </span>
  </Container>
;

Avatar.propTypes = {
  name: string,
  surname: string,
  url: string
};

export default Avatar;
