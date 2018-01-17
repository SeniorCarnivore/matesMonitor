import React, { Component } from 'react';
import { object, func, number } from 'prop-types';
import styled from 'styled-components';

import {
  DropFilter,
  DropApp
} from './TestControls';

const Container = styled.div`
  display: flex;
  background-color: #000;
`;

const HeaderText = styled.h1`
  margin: 0 auto 0 20px;
  font-size: 25px;
  user-select: none;

  i {
    &:before {
      content: '🔍';
      display: inline-block;
      margin: 5px -5px 0 2px;
      font-style: normal;
      font-size: 27px;
      transform: translateY(8px);
    }
  }
`;

const Export = styled.button``;

const exportJson = () => {

  const data = JSON.stringify({
    skills: localStorage.getItem('skills'),
    mates: localStorage.getItem('mates')
  });

  const a = document.createElement("a");
  const file = new Blob([data], {type: 'text/plain'});
  a.href = URL.createObjectURL(file);
  a.download = 'test.txt';
  a.click();
}

const Header = ({ callback }) => (
  <Container>
    <HeaderText>matesMonit<i/>r</HeaderText>
    <DropFilter callback={ callback }/>
    <Export onClick={ exportJson }>ppp</Export>
    <DropApp/>
  </Container>
);


Header.propTypes = {
  callback: func
};

export default Header;
